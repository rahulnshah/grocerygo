import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

// Get all favorite lists
export async function GET() {
  try {
    const { rows } = await sql`
      SELECT 
        favorites.id,
        lists.id,
        lists.name,
        lists.description
      FROM 
        favorites
      JOIN 
        lists ON favorites.list_id = lists.id
      LIMIT 6
    `;
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching favorite lists:', error);
    return NextResponse.error();
  }
}

// Add a favorite list
export async function POST(req: Request) {
  try {
    const { list_id } = await req.json();
    const { rows } = await sql`
      INSERT INTO favorites (list_id)
      VALUES (${list_id})
      RETURNING *
    `;
    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Error adding favorite list:', error);
    return NextResponse.error();
  }
}