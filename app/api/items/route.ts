// /app/api/items/index.ts
import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { NextRequest } from 'next/server';

export async function GET() {
  try {
    const data = await sql`SELECT * FROM items;`;
    return NextResponse.json(data.rows);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, list_id, checked } = await req.json();
    const data = await sql`
      INSERT INTO items (name, list_id, checked)
      VALUES (${name}, ${list_id}, ${checked})
      RETURNING *;
    `;
    return NextResponse.json(data.rows[0]);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
