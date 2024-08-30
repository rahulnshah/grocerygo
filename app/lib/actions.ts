'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const ListFormSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  created_at: z.string(),
  updated_at: z.string()
});

const ItemFormSchema = z.object({
  id: z.string(),
  name: z.string(),
  list_id: z.string(),
  is_checked: z.boolean(),
  created_at: z.string(),
  updated_at: z.string()
});

const CreateList = ListFormSchema.omit({ id: true, created_at: true, updated_at: true });
const CreateItem = ItemFormSchema.omit({ id: true, list_id: true, created_at: true, updated_at: true });

export async function createList(formData: FormData) {
  const { name, description } = CreateList.parse({
    name: formData.get('name'),
    description: formData.get('description')
  });
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

export async function createItem(list_id: string, formData: FormData) {
  const { name, is_checked } = CreateItem.parse({
    name: formData.get('name'),
    is_checked: formData.get('is_checked') === 'on' ? true : false
  });
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

export async function updateList(id: string, formData: FormData) {
  const { name, description } = UpdateList.parse({
    name: formData.get('name'),
    description: formData.get('description')
  });

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

export async function updateItem(id: string, list_id: string, formData: FormData) {
  const { name, is_checked } = UpdateItem.parse({
    name: formData.get('name'),
    is_checked: formData.get('is_checked') === 'on' ? true : false
  });
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

