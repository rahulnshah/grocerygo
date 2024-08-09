// /app/api/lists/route.ts
import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    const { rows } = await sql`SELECT * FROM lists LIMIT 10`;
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching lists:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, description } = await request.json();
    const { rows } = await sql`
      INSERT INTO lists (name, description)
      VALUES (${name}, ${description})
      RETURNING *
    `;
    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Error creating list:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
