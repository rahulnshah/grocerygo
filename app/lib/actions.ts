'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { getUser } from './data';
import bcrypt from "bcrypt";
import { User } from './definitions';

const FavoriteFormSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  list_id: z.string(),
  created_at: z.string()
});

const ListFormSchema = z.object({
  id: z.string(),
  name: z.string({
    invalid_type_error: 'Please enter valid list name.',
  }).trim().min(1, { message: "Required" }),
  description: z.string({
    invalid_type_error: 'Please enter valid description.',
  }).trim().min(1, { message: "Required" }),
  created_at: z.string(),
  user_id: z.string(),
  updated_at: z.string()
});

const ItemFormSchema = z.object({
  id: z.string(),
  name: z.string({
    invalid_type_error: 'Please enter valid item name.',
  }).trim().min(1, { message: "Required" }),
  list_id: z.string(),
  is_checked: z.boolean({
    invalid_type_error: 'Please specify if item is checked or not.',
  }),
  created_at: z.string(),
  updated_at: z.string()
});

const UserFormSchema = z.object({
  id: z.string(),
  name: z.string({
    invalid_type_error: 'Please enter valid item name.',
  }).trim().min(1, { message: "Required" }),
  email: z.string().email({
    message: 'Please enter valid email.',
  }).trim().min(1, { message: "Required" }),
  password: z.string({
    invalid_type_error: 'Please enter valid password',
  }).min(6, { message: "password length must be >= 6 characters" }).max(20, { message: "password length must be <= 20 characters" }).optional(),
  created_at: z.string()
});

export type State = {
  errors?: {
    name?: string[];
    description?: string[];
  };
  message?: string | null;
};


export type ItemState = {
  errors?: {
    name?: string[];
    is_checked?: string[];
  };
  message?: string | null;
};

export type UserState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string | null;
}

export type FavoriteState = {
  errors?: {
    list_id?: string[];
    user_id?: string[];
  };
  message?: string | null;
}

const CreateList = ListFormSchema.omit({ id: true, user_id: true, created_at: true, updated_at: true });
const CreateItem = ItemFormSchema.omit({ id: true, list_id: true, created_at: true, updated_at: true });
const CreateUser = UserFormSchema.omit({ id: true, created_at: true })
const CreateFavorite = FavoriteFormSchema.omit({ id: true, created_at: true });


export async function shareList(listId: string, formData: FormData) {
  const userId = formData.get('userId');
  if (!userId || typeof userId !== 'string') {
    throw new Error('Invalid user ID');
  }

  try {
    await sql`
      INSERT INTO shared_lists (owner_id, shared_with_id, list_id, shared_at)
      VALUES (
        (SELECT owner_id FROM lists WHERE id = ${listId}),
        ${userId},
        ${listId},
        NOW()
      )
      ON CONFLICT (list_id, shared_with_id) DO NOTHING
    `;
    revalidatePath(`/notebook/lists/share-modal/${listId}`);
    revalidatePath('/notebook/shared');
  } catch (error) {
    throw new Error('Failed to share list');
  }
}

export async function unshareList(listId: string, formData: FormData) {
  const userId = formData.get('userId');
  if (!userId || typeof userId !== 'string') {
    throw new Error('Invalid user ID');
  }

  try {
    await sql`
      DELETE FROM shared_lists
      WHERE list_id = ${listId}
      AND shared_with_id = ${userId}
    `;
    revalidatePath(`/notebook/lists/share-modal/${listId}`);
    revalidatePath('/notebook/shared');
  } catch (error) {
    throw new Error('Failed to unshare list');
  }
}

export async function createList(user_id: string, prevState: State, formData: FormData) {
  const validatedFields = CreateList.safeParse({
    name: formData.get('name'),
    description: formData.get('description')
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to create list.',
    };
  }

  // Prepare data for insertion into the database
  const { name, description } = validatedFields.data;

  try {
    await sql`
        INSERT INTO lists (user_id, name, description)
        VALUES (${user_id}, ${name}, ${description})
      `;
    revalidatePath('/notebook');
    return { message: "Form submitted" }; // or some relevant message
  }
  catch (error) {
    return { message: 'Database Error: Failed to Create List.', };
  }
}

export async function createItem(list_id: string, prevState: ItemState, formData: FormData) {
  const validatedFields = CreateItem.safeParse({
    name: formData.get('name'),
    is_checked: formData.get('is_checked') === 'on' ? true : false
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to create item.',
    };
  }

  // Prepare data for insertion into the database
  const { name, is_checked } = validatedFields.data;
  try {
    await sql`INSERT INTO items (name, list_id, is_checked)
      VALUES (${name}, ${list_id}, ${is_checked})`;
    revalidatePath(`/notebook/items/${list_id}`);
    return { message: "Form submitted" }; // or some relevant message
  }
  catch (error) {
    return { message: 'Database Error: Failed to Create Item.', };
  }
}

export async function createUser(prevState: UserState, formData: FormData) {
  const validatedFields = CreateUser.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password') || null
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to create item.',
    };
  }

  // Prepare data for insertion into the database
  const { name, email, password } = validatedFields.data;
  // Hash the password before storing it in the database
  let hashedPassword = null;
  if (password !== null) {
    hashedPassword = await bcrypt.hash(password!, 10);
  }

  try {
    // Insert the user into the database
    await sql`INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${hashedPassword})`;
    //return { message: "Form submitted" }; // or some relevant message
  }
  catch (error) {
    return { message: 'Database Error: Failed to Create User.', };
  }
}

export async function createUserAndRedirectToLogin(prevState: UserState, formData: FormData) {
  // Validate the form data using zod (assuming CreateUser is a Zod schema)
  const validatedFields = CreateUser.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password') || null
  });

  // If validation fails, return early with errors
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or Invalid Fields. Failed to create user.',
    };
  }

  const { name, email, password } = validatedFields.data;

  try {
    // Hash the password before storing it in the database
    let hashedPassword = null;
    if (password !== null) {
      hashedPassword = await bcrypt.hash(password!, 10);
    }

    let user: any = await getUser(email);
    if (user) {
      return { message: `User with email ${email} already registered! Pick another email!` };
    }
    // Insert the user into the database
    await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${hashedPassword})
    `;
  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Database Error: Failed to Create User.' };
  }
  // Redirect to the login page upon successful registration
  redirect('/login'); // Redirects to the login page after user creation
}

export async function favoriteList(prevState: FavoriteState, formData: FormData) {
  console.log('formData', formData);
  // Validate the form data using zod (assuming CreateUser is a Zod schema)
  const validatedFields = CreateFavorite.safeParse({
    list_id: formData.get('list_id'),
    user_id: formData.get('user_id')
  });

  // If validation fails, return early with errors
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or Invalid Fields. Failed to create favorite list.',
    };
  }

  const { list_id, user_id } = validatedFields.data;
  try {
    await sql`INSERT INTO favorites (user_id, list_id)
      VALUES (${user_id}, ${list_id})`;
    revalidatePath('/notebook');
    revalidatePath('/notebook/saved');
    return { message: "Form submitted" }; // or some relevant message
  }
  catch (error) {
    return { message: 'Database Error: Failed to favorite list.', };
  }
}

export async function unFavoriteList(user_id: string, list_id: string) {
  try {
    await sql`DELETE FROM favorites WHERE list_id = ${list_id} AND user_id = ${user_id}`;
    //return { message: 'diddy', };
  }
  catch (error) {
    console.log('Database Error: Failed to unfavorite list.');
  }
  revalidatePath('/notebook');
  revalidatePath('/notebook/saved');
}

// Use Zod to update the expected types
const UpdateList = ListFormSchema.omit({ id: true, created_at: true, updated_at: true });
const UpdateItem = ItemFormSchema.omit({ id: true, list_id: true, created_at: true, updated_at: true });

export async function updateList(id: string, prevState: State, formData: FormData) {
  const validatedFields = UpdateList.safeParse({
    name: formData.get('name'),
    description: formData.get('description')
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to update list.',
    };
  }

  // Prepare data for insertion into the database
  const { name, description } = validatedFields.data;

  try {
    await sql`
    UPDATE lists
      SET name = ${name}, description = ${description}
      WHERE id = ${id}
  `;
    //return { message: "Form submitted" }; // or some relevant message
  }
  catch (error) {
    return { message: 'Database Error: Failed to Update List.', };
  }
  redirect('/notebook');
}

export async function updateItem(id: string, list_id: string, prevState: ItemState, formData: FormData) {
  const validatedFields = UpdateItem.safeParse({
    name: formData.get('name'),
    is_checked: formData.get('is_checked') === 'on' ? true : false
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to update item.',
    };
  }

  // Prepare data for insertion into the database
  const { name, is_checked } = validatedFields.data;

  try {
    await sql`UPDATE items
      SET name = ${name}, is_checked = ${is_checked}
      WHERE id = ${id}`;
    revalidatePath(`/notebook/items/${list_id}`);
    return { message: "Form submitted" }; // or some relevant message
  }
  catch (error) {
    return { message: 'Database Error: Failed to Update Item.', };
  }

}

export async function checkItem(id: string, list_id: string) {
  try {
    await sql`UPDATE items
  SET is_checked = NOT is_checked
  WHERE id = ${id}`;
  }
  catch (error) {
    return { message: 'Database Error: Failed to check item.', };
  }
  revalidatePath(`/notebook/items/${list_id}`);
  //redirect(`/notebook/items/${list_id}`);
}

export async function deleteList(id: string) {
  // throw new Error('Failed to Delete Invoice');
  try {
    await sql`DELETE FROM lists WHERE id = ${id}`;
    //return { message: 'Deleted List.' };
  }
  catch (error) {
    return { message: 'Database Error: Failed to Delete List.', };
  }
  revalidatePath('/notebook');
  revalidatePath('/notebook/saved');
}

export async function deleteItem(id: string, list_id: string) {
  try {
    await sql`DELETE FROM items WHERE id = ${id}`;
    //return { message: 'Deleted Item.' };
  }
  catch (error) {
    return { message: 'Database Error: Failed to Delete Item.' };
  }
  revalidatePath(`/notebook/items/${list_id}`);
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function githubSignIn() {
  await signIn("github");
}

