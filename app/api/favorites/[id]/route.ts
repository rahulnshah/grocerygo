import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

// Delete a favorite list by ID
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    await sql`
      DELETE FROM favorites WHERE id = ${id}
    `;
    return NextResponse.json({ message: 'Favorite list removed successfully' });
  } catch (error) {
    console.error(`Error removing favorite list with ID ${id}:`, error);
    return NextResponse.error();
  }
}
