'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const ListFormSchema = z.object({
  id: z.string(),
  name: z.string({
    invalid_type_error: 'Please enter valid list name.',
  }).trim().min(1, { message: "Required" }),
  description: z.string({
    invalid_type_error: 'Please enter valid description.',
  }).trim().min(1, { message: "Required" }),
  created_at: z.string(),
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

const CreateList = ListFormSchema.omit({ id: true, created_at: true, updated_at: true });
const CreateItem = ItemFormSchema.omit({ id: true, list_id: true, created_at: true, updated_at: true });

export async function createList(prevState: State, formData: FormData) {
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
        INSERT INTO lists (name, description)
        VALUES (${name}, ${description})
      `;
  }
  catch (error) {
    return { message: 'Database Error: Failed to Create List.', };
  }

  revalidatePath('/notebook');
  // redirect('/notebook');
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
  }
  catch (error) {
    return { message: 'Database Error: Failed to Create Item.', };
  }
  revalidatePath(`/notebook/items/${list_id}`);
  // redirect(`/notebook/items/${list_id}`);
}

export async function favoriteList(list_id: string) {
  try {
    await sql`INSERT INTO favorites (list_id)
      VALUES (${list_id})`;
  }
  catch (error) {
    return { message: 'Database Error: Failed to favorite list.', };
  }
  revalidatePath('/notebook');
  revalidatePath('/notebook/saved');
}

export async function unFavoriteList(list_id: string) {
  try {
    await sql`DELETE FROM favorites WHERE list_id = ${list_id}`;
  }
  catch (error) {
    return { message: 'Database Error: Failed to unfavorite list.', };
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
  }
  catch (error) {
    return { message: 'Database Error: Failed to Update Item.', };
  }
  revalidatePath(`/notebook/items/${list_id}`);
  // redirect(`/notebook/items/${list_id}`);
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
  // redirect(`/notebook/items/${list_id}`);
}

export async function deleteList(id: string) {
  // throw new Error('Failed to Delete Invoice');
  try {
    await sql`DELETE FROM lists WHERE id = ${id}`;
    revalidatePath('/notebook');
    revalidatePath('/notebook/saved');
    return { message: 'Deleted List.' };
  }
  catch (error) {
    return { message: 'Database Error: Failed to Delete List.', };
  }
}

export async function deleteItem(id: string, list_id: string) {
  try {
    await sql`DELETE FROM items WHERE id = ${id}`;
    revalidatePath(`/notebook/items/${list_id}`);
    return { message: 'Deleted Item.' };
  }
  catch (error) {
    return { message: 'Database Error: Failed to Delete Item.' };
  }
}

