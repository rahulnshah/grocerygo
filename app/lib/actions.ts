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
   
const CreateList = ListFormSchema.omit({ id: true, created_at: true, updated_at: true });
   
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
      redirect('/notebook');
}