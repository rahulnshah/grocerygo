'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from "bcrypt";
import { drizzle } from 'drizzle-orm/neon-http';
import { and, eq, sql, or } from 'drizzle-orm';
import { lists, items, users, sharedLists, favorites } from './schema';
import { fetchItems, getUser, fetchNameOfList } from './data';
import { ItemForm } from './definitions';

const database = drizzle(process.env.DATABASE_URL!);

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
    const list = await database
      .select({ userId: lists.userId })
      .from(lists)
      .where(eq(lists.id, parseInt(listId)))
      .then(rows => rows[0]);

    await database.insert(sharedLists).values({
      ownerId: list.userId,
      sharedWithId: parseInt(userId),
      listId: parseInt(listId)
    });

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
    await database
      .delete(sharedLists)
      .where(
        and(
          eq(sharedLists.listId, parseInt(listId)),
          eq(sharedLists.sharedWithId, parseInt(userId))
        )
      );

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
    await database.insert(lists).values({
      userId: parseInt(user_id),
      name,
      description
    });

    revalidatePath('/notebook');
    return { message: "Form submitted" };
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
  // If form validation fails, return errors early. Otherwise, continue.
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
    await database.insert(items).values({
      name,
      listId: parseInt(list_id),
      isChecked: is_checked,
      assignedTo: assigned_to ? parseInt(assigned_to) : null
    });

    revalidatePath(`/notebook/items/${list_id}`);
    return { message: "Form submitted" };
  }
  catch (error) {
    return { message: 'Database Error: Failed to Create Item.' };
  }
}

export async function createUser(prevState: UserState, formData: FormData) {
  const validatedFields = CreateUser.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password') || null
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to create user.',
    };
  }

  // Prepare data for insertion into the database
  const { name, email, password } = validatedFields.data;
  const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

  try {
    await database.insert(users).values({
      name,
      email,
      password: hashedPassword
    });
  } catch (error) {
    return { message: 'Database Error: Failed to Create User.' };
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
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    const existingUser = await database
      .select()
      .from(users)
      .where(eq(users.email, email))
      .then(rows => rows[0]);

    if (existingUser) {
      return { message: `User with email ${email} already registered! Pick another email!` };
    }

    await database.insert(users).values({
      name,
      email,
      password: hashedPassword
    });
  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Database Error: Failed to Create User.' };
  }
  // Redirect to the login page upon successful registration  
  redirect('/login'); // Redirects to the login page after user creation
}

export async function favoriteList(prevState: FavoriteState, formData: FormData) {
  const validatedFields = CreateFavorite.safeParse({
    list_id: formData.get('list_id'),
    user_id: formData.get('user_id')
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or Invalid Fields. Failed to create favorite list.',
    };
  }

  const { list_id, user_id } = validatedFields.data;
  try {
    await database.insert(favorites).values({
      userId: parseInt(user_id),
      listId: parseInt(list_id)
    });

    revalidatePath('/notebook');
    revalidatePath('/notebook/saved');
    return { message: "Form submitted" };
  } catch (error) {
    return { message: 'Database Error: Failed to favorite list.' };
  }
}

export async function unFavoriteList(user_id: string, list_id: string) {
  try {
    await database
      .delete(favorites)
      .where(
        and(
          eq(favorites.listId, parseInt(list_id)),
          eq(favorites.userId, parseInt(user_id))
        )
      );
  } catch (error) {
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
    await database
      .update(lists)
      .set({ name, description })
      .where(eq(lists.id, parseInt(id)));
  }
  catch (error) {
    return { message: 'Database Error: Failed to Update List.' };
  }
  revalidatePath('/notebook');
  redirect('/notebook');
}

export async function updateItem(id: string, list_id: string, prevState: ItemState, formData: FormData) {
  const validatedFields = UpdateItem.safeParse({
    name: formData.get('name'),
    is_checked: formData.get('is_checked') === 'on',
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
    await database
      .update(items)
      .set({
        name,
        isChecked: is_checked,
        assignedTo: assigned_to ? parseInt(assigned_to) : null
      })
      .where(eq(items.id, parseInt(id)));
    revalidatePath(`/notebook`);
    revalidatePath(`/notebook/items/${list_id}`);
    return { message: "Form submitted" };
  }
  catch (error) {
    return { message: 'Database Error: Failed to Update Item.', };
  }

}

export async function checkItem(id: string, list_id: string) {
  try {
    await database
      .update(items)
      .set({
        isChecked: sql`NOT ${items.isChecked}`
      })
      .where(eq(items.id, parseInt(id)));
  }
  catch (error) {
    return { message: 'Database Error: Failed to check item.' };
  }
  revalidatePath(`/notebook/items/${list_id}`);
}

export async function deleteList(id: string) {
  // throw new Error('Failed to Delete Invoice');
  try {
    await database
      .delete(lists)
      .where(eq(lists.id, parseInt(id)));

    revalidatePath('/notebook');
    revalidatePath('/notebook/saved');
  }
  catch (error) {
    console.log("Database Error: Failed to Delete List", error);
    console.log('Database Error: Failed to Delete List.');
  }
}

export async function deleteItem(id: string, list_id: string) {
  try {
    await database
      .delete(items)
      .where(eq(items.id, parseInt(id)));
  } catch (error) {
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
    const originalList = await database
      .select({ name: lists.name, description: lists.description })
      .from(lists)
      .where(eq(lists.id, parseInt(list_id)))
      .limit(1);

    if (!originalList.length) {
      throw new Error("List not found");
    }

    // get all the items from the original list
    const originalItems = await fetchItems(list_id);

    const { name, description } = originalList[0];

    // Create new list with "(Copy)" suffix
    const [newList] = await database
      .insert(lists)
      .values({ name: `${name} (Copy)`, description, userId: parseInt(user_id) })
      .returning({ id: lists.id });

    if (!newList) {
      throw new Error("Failed to create new list");
    }

    // Copy all items from original list
    await database
      .insert(items)
      .values(
        originalItems.map(item => ({
          name: item.name,
          listId: newList.id,
          isChecked: item.isChecked,
          assignedTo: parseInt(user_id)
        }))
      );
    revalidatePath('/notebook');
  } catch (error) {
    console.log("copyList error", error);
    throw new Error('Failed to copy list');
  }
}

export async function updateItemListId(list_id: string, item_id: string) {
  try {
    await database
      .update(items)
      .set({ listId: parseInt(list_id) })
      .where(eq(items.id, parseInt(item_id)));
  } catch (error) {
    console.log("updateItemListId error", error);
    throw new Error('Failed to update item list id');
  }
}

export async function deleteListWithoutRevalidation(list_id: string) {
  try {
    await database
      .delete(lists)
      .where(eq(lists.id, parseInt(list_id)));
  } catch (error) {
    console.log('Database Error: Failed to Delete List.');
    throw new Error('Failed to delete list');
  }
}

export async function deleteItemWithoutRevalidation(item_id: string) {
  try {
    await database
      .delete(items)
      .where(eq(items.id, parseInt(item_id)));
  } catch (error) {
    console.log('Database Error: Failed to Delete Item.');
    throw new Error('Failed to delete item');
  }
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

    // Get list names and items
    const list1Name = await fetchNameOfList(list_id_1);
    const list2Name = await fetchNameOfList(list_id_2);
    const items_1: ItemForm[] = await fetchItems(list_id_1);
    const items_2: ItemForm[] = await fetchItems(list_id_2);

    // Track unique and duplicate items
    const uniqueItemsFromList1 = new Set<string>();
    const intersectionOfItems = new Set<string>();

    items_1.forEach(item => uniqueItemsFromList1.add(item.name));
    items_2.forEach(item => {
      if (uniqueItemsFromList1.has(item.name)) {
        intersectionOfItems.add(item.name);
      }
    });

    // Create new merged list
    const [mergedList] = await database
      .insert(lists)
      .values({
        name: `${list1Name.name} & ${list2Name.name}`,
        description: `Merged list of ${list_id_1} & ${list_id_2}`,
        userId: parseInt(user_id)
      })
      .returning();

    // Update items from list 1
    await Promise.all(
      items_1.map(async (item) => {
        if (!intersectionOfItems.has(item.name)) {
          await database
            .update(items)
            .set({ listId: mergedList.id })
            .where(eq(items.id, item.id));
        } else {
          await database
            .delete(items)
            .where(eq(items.id, item.id));
        }
      })
    );

    // Update items from list 2
    await Promise.all(
      items_2.map(async (item) => {
        if (!intersectionOfItems.has(item.name)) {
          await database
            .update(items)
            .set({ listId: mergedList.id })
            .where(eq(items.id, item.id));
        } else {
          await database
            .delete(items)
            .where(eq(items.id, item.id));
        }
      })
    );

    // Insert intersection items into merged list
    await database
      .insert(items)
      .values(
        Array.from(intersectionOfItems).map(itemName => ({
          name: itemName,
          listId: mergedList.id,
          isChecked: false,
          assignedTo: parseInt(user_id)
        }))
      );

    // Get shared users from both lists
    const sharedUsers = await database
      .select({ sharedWithId: sharedLists.sharedWithId })
      .from(sharedLists)
      .where(
        or(
          eq(sharedLists.listId, parseInt(list_id_1)),
          eq(sharedLists.listId, parseInt(list_id_2))
        )
      )
      .groupBy(sharedLists.sharedWithId);

    // Share merged list with users
    await database
      .insert(sharedLists)
      .values(
        sharedUsers.map(user => ({
          ownerId: parseInt(user_id),
          sharedWithId: user.sharedWithId,
          listId: mergedList.id
        }))
      )
      .onConflictDoNothing();

    // Delete original lists
    await Promise.all([
      deleteListWithoutRevalidation(list_id_1),
      deleteListWithoutRevalidation(list_id_2)
    ]);

    revalidatePath('/notebook');
    revalidatePath('/notebook/saved');
    return { message: 'Lists merged successfully.' };
  } catch (error) {
    console.error('Error merging lists:', error);
    return { message: 'Error merging lists.', error };
  }
}




