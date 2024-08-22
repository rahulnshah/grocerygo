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
      
      await sql`
        INSERT INTO lists (name, description)
        VALUES (${name}, ${description})
      `;

      revalidatePath('/notebook');
      // redirect('/notebook');
}

export async function createItem(list_id: string, formData: FormData)
{
  const { name, is_checked } = CreateItem.parse({
    name: formData.get('name'),
    is_checked: formData.get('is_checked') === 'on' ? true : false
  });
  await sql`INSERT INTO items (name, list_id, is_checked)
      VALUES (${name}, ${list_id}, ${is_checked})`
  revalidatePath(`/notebook/items/${list_id}`);
  // redirect(`/notebook/items/${list_id}`);
}

// Use Zod to update the expected types
const UpdateList = ListFormSchema.omit({ id: true, created_at: true, updated_at: true });
const UpdateItem = ItemFormSchema.omit({ id: true, list_id: true, created_at: true, updated_at: true });

export async function updateList(id: string, formData: FormData) {
  const { name, description } = UpdateList.parse({
    name: formData.get('name'),
    description: formData.get('description')
  });
 
  await sql`
    UPDATE lists
      SET name = ${name}, description = ${description}
      WHERE id = ${id}
  `;
 
  revalidatePath('/notebook');
  // redirect('/notebook');
}

export async function updateItem(id: string, list_id: string, formData: FormData) {
  const { name, is_checked } = UpdateItem.parse({
    name: formData.get('name'),
    is_checked: formData.get('is_checked') === 'on' ? true : false
  });
  await sql`UPDATE items
      SET name = ${name}, is_checked = ${is_checked}
      WHERE id = ${id}`
  revalidatePath(`/notebook/items/${list_id}`);
  // redirect(`/notebook/items/${list_id}`);
}

export async function checkItem(id: string, list_id: string)
{
  await sql`UPDATE items
  SET is_checked = NOT is_checked
  WHERE id = ${id}`
revalidatePath(`/notebook/items/${list_id}`);
// redirect(`/notebook/items/${list_id}`);
}

export async function deleteList(id: string) {
  await sql`DELETE FROM lists WHERE id = ${id}`;
  revalidatePath('/notebook');
}

export async function deleteItem(id: string, list_id: string) {
  await sql`DELETE FROM items WHERE id = ${id}`;
  revalidatePath(`/notebook/items/${list_id}`);
}

