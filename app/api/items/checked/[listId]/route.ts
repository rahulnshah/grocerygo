import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

// Get favorite lists by list ID
export async function GET(req: Request, { params }: { params: { listId: string } }) {
  const { listId } = params;
  try {
    const {rows} = await sql`
      SELECT 
        COUNT(*) AS checked_items_count
      FROM 
        items
      WHERE 
        list_id = ${listId} AND is_checked = true
      GROUP BY 
        list_id
    `;
    const num = rows[0]?.checked_items_count || "0";
    return NextResponse.json(num);
  } catch (error) {
    console.error(`Error fetching favorite lists for list ID ${listId}:`, error);
    return NextResponse.error();
  }
}