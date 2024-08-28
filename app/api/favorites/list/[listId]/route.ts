import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

// Get favorite lists by list ID
export async function GET(req: Request, { params }: { params: { listId: string } }) {
  const { listId } = params;
  try {
    const { rows } = await sql`
      SELECT * FROM favorites WHERE list_id = ${listId}
    `;
    return NextResponse.json(rows);
  } catch (error) {
    console.error(`Error fetching favorite lists for list ID ${listId}:`, error);
    return NextResponse.error();
  }
}