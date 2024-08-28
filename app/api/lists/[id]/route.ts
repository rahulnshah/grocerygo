import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

// Get a single list by id
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const { rows } = await sql`SELECT * FROM lists WHERE id = ${id}`;
    return NextResponse.json(rows);
  } catch (error) {
    console.error(`Error fetching list for id ${id}:`, error);
    return NextResponse.error();
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { name, description } = await request.json();
    const { rows } = await sql`
      UPDATE lists
      SET name = ${name}, description = ${description}
      WHERE id = ${id}
      RETURNING *
    `;
    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Error updating list:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    await sql`DELETE FROM lists WHERE id = ${id}`;
    return NextResponse.json({ message: 'List deleted successfully' });
  } catch (error) {
    console.error('Error deleting list:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}