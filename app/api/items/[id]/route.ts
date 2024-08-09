// /app/api/items/[id].ts
import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const {rows} = await sql`SELECT * FROM items WHERE id = ${params.id};`;
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { name, list_id, checked } = await req.json();
    const data = await sql`
      UPDATE items 
      SET name = ${name}, list_id = ${list_id}, checked = ${checked}
      WHERE id = ${params.id}
      RETURNING *;
    `;
    return NextResponse.json(data.rows[0]);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await sql`DELETE FROM items WHERE id = ${params.id} RETURNING *;`;
    return NextResponse.json(data.rows[0]);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
