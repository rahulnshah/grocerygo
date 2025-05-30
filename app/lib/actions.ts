'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { fetchItems, getUser, fetchNameOfList } from './data';
import bcrypt from "bcrypt";
import { Item, ItemForm, SharedWithIds, User } from './definitions';

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
  assigned_to: z.string(),
  assigned_to_name: z.string().optional(),
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
    assigned_to?: string[];
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
  const userId = formData.get('user_id');
  if (!userId || typeof userId !== 'string') {
    throw new Error('Invalid user ID');
  }

  try {
    await sql`
      INSERT INTO shared_lists (owner_id, shared_with_id, list_id, shared_at)
      VALUES (
        (SELECT user_id FROM lists WHERE id = ${listId}),
        ${userId},
        ${listId},
        NOW()
      )
      ON CONFLICT (list_id, shared_with_id) DO NOTHING
    `;
    revalidatePath(`/notebook/lists/share-modal/${listId}`);
    revalidatePath('/notebook/shared');
  } catch (error) {
    console.log("error", error);
    throw new Error('Failed to share list');
  }
}

export async function unshareList(listId: string, formData: FormData) {
  const userId = formData.get('user_id');
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
    is_checked: formData.get('is_checked') === 'on' ? true : false,
    assigned_to: formData.get('assigned_to')
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to create item.',
    };
  }

  // Prepare data for insertion into the database
  const { name, is_checked, assigned_to } = validatedFields.data;
  try {
    await sql`INSERT INTO items (name, list_id, is_checked, assigned_to)
      VALUES (${name}, ${list_id}, ${is_checked}, ${assigned_to})`;
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
const UpdateList = ListFormSchema.omit({ id: true, user_id: true, created_at: true, updated_at: true });
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
    SET name = ${name}, description = ${description} WHERE id = ${id}`;
    //return { message: "Form submitted" }; // or some relevant message
  }
  catch (error) {
    return { message: 'Database Error: Failed to Update List.', };
  }
  revalidatePath('/notebook');
  redirect('/notebook');
}

export async function updateItem(id: string, list_id: string, prevState: ItemState, formData: FormData) {
  const validatedFields = UpdateItem.safeParse({
    name: formData.get('name'),
    is_checked: formData.get('is_checked') === 'on' ? true : false,
    assigned_to: formData.get('assigned_to')
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to update item.',
    };
  }

  // Prepare data for insertion into the database
  const { name, is_checked, assigned_to } = validatedFields.data;

  try {
    await sql`UPDATE items
      SET name = ${name}, is_checked = ${is_checked}, assigned_to = ${assigned_to}
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
    console.log("Database Error: Failed to Delete List", error);
    console.log('Database Error: Failed to Delete List.');
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
    console.log('Database Error: Failed to Delete Item.');
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

export async function copyList(list_id: string, formData: FormData) {
  const user_id = formData.get('user_id');
  if (!user_id || typeof user_id !== 'string') {
    throw new Error('Invalid user ID');
  }

  try {
    // Get original list details
    const originalList = await sql`
      SELECT name, description FROM lists WHERE id = ${list_id}
    `;

    // Create new list with "(Copy)" suffix
    const newList = await sql`
      INSERT INTO lists (name, description, user_id)
      VALUES (
        ${originalList.rows[0].name + ' (Copy)'}, 
        ${originalList.rows[0].description},
        ${user_id}
      )
      RETURNING id
    `;

    // Copy all items from original list
    await sql`
      INSERT INTO items (name, list_id, is_checked, assigned_to)
      SELECT name, ${newList.rows[0].id}, false, ${user_id}
      FROM items 
      WHERE list_id = ${list_id}
    `;

    revalidatePath('/notebook');
  } catch (error) {
    console.log("copyList error", error);
    throw new Error('Failed to copy list');
  }
}
export async function updateItemListId(list_id: string, item_id: string) {
  try {
    await sql`UPDATE items SET list_id = ${list_id} WHERE id = ${item_id}`;
  }
  catch (error) {
    console.log("updateItemListId error", error);
    throw new Error('Failed to update item list id');
  }
}

export async function deleteListWithoutRevalidation(list_id: string) {
  try {
    await sql`DELETE FROM lists WHERE id = ${list_id}`;
  }
  catch (error) {
    console.log('Database Error: Failed to Delete List.');
    throw new Error('Failed to delete list');
  }

}

export async function deleteItemWithoutRevalidation(item_id: string) {
  try {
    await sql`DELETE FROM items WHERE id = ${item_id}`;
  }
  catch (error) {
    console.log('Database Error: Failed to Delete Item.');
    throw new Error('Failed to delete item');
  }
}

{

}
export async function mergeLists(user_id: string, prevState: State, formData: FormData) {
  try {
    const list_id_1 = formData.get('list1');
    const list_id_2 = formData.get('list2');

    if (!list_id_1 || !list_id_2 || typeof list_id_1 !== 'string' || typeof list_id_2 !== 'string') {
      return { message: 'Invalid list IDs' };
    }

    if (list_id_1 === list_id_2) {
      return { message: 'Cannot merge the same list.' };
    }

    const list1Name = await fetchNameOfList(list_id_1);
    const list2Name = await fetchNameOfList(list_id_2);
    const items_1: ItemForm[] = await fetchItems(list_id_1);
    const items_2: ItemForm[] = await fetchItems(list_id_2);

    const uniqueItemsFromList1 = new Set<string>();
    const intersectionOfItems = new Set<string>();

    items_1.forEach(item => uniqueItemsFromList1.add(item.name));
    items_2.forEach(item => {
      if (uniqueItemsFromList1.has(item.name)) {
        intersectionOfItems.add(item.name);
      }
    });

    const merged_list = await sql`
      INSERT INTO lists (name, description, user_id)
      VALUES (${list1Name.name + ' & ' + list2Name.name}, ${'Merged list of ' + list_id_1 + ' & ' + list_id_2}, ${user_id})
      RETURNING id
    `;

    // Handle items for merged list
    await Promise.all(
      items_1.map(async (item) => {
        if (!intersectionOfItems.has(item.name)) {
          await updateItemListId(merged_list.rows[0].id, item.id);
        } else {
          await deleteItemWithoutRevalidation(item.id);
        }
      })
    );

    await Promise.all(
      items_2.map(async (item) => {
        if (!intersectionOfItems.has(item.name)) {
          await updateItemListId(merged_list.rows[0].id, item.id);
        } else {
          await deleteItemWithoutRevalidation(item.id);
        }
      })
    );

    // Insert intersection items into merged list
    await Promise.all(
      Array.from(intersectionOfItems).map(async (itemName) => {
        await sql`
          INSERT INTO items (name, list_id, is_checked, assigned_to)
          VALUES (${itemName}, ${merged_list.rows[0].id}, ${false}, ${user_id})
        `;
      })
    );

    // Handle shared users for merged list
    const sharedUsers = await sql`
      SELECT DISTINCT shared_with_id
      FROM shared_lists
      WHERE list_id = ${list_id_1} OR list_id = ${list_id_2}
    `;

    // Delete original lists
    await deleteListWithoutRevalidation(list_id_1);
    await deleteListWithoutRevalidation(list_id_2);
    

    await Promise.all(
      sharedUsers.rows.map(async (user) => {
        await sql`
        INSERT INTO shared_lists (owner_id, shared_with_id, list_id)
        VALUES (${user_id}, ${user.shared_with_id}, ${merged_list.rows[0].id})
        ON CONFLICT (list_id, shared_with_id) DO NOTHING
        `;
      })
    );


    revalidatePath('/notebook');
    revalidatePath('/notebook/saved');

    return { message: 'Lists merged successfully.' };
  } catch (error) {
    console.error('Error merging lists:', error);
    return { message: 'Error merging lists.', error };
  }
}


  

