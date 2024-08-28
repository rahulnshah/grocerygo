import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
// Get al items for given list_id
export async function GET(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
      const { rows } = await sql`SELECT * FROM items WHERE list_id = ${id} LIMIT 6`;
      return NextResponse.json(rows);
    } catch (error) {
      console.error(`Error fetching items for list_id ${id}:`, error);
      return NextResponse.error();
    }
  }
  