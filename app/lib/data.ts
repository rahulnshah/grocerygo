import { sql } from '@vercel/postgres';
import {
  Item,
  FavoriteList,
  List,
  ListForm,
  ItemForm
} from './definitions';

import { unstable_noStore as noStore } from 'next/cache';

export async function fetchList() {
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();

  try {
    const data = await sql<List>`SELECT * FROM lists LIMIT 20`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch lists.');
  }
}

export async function fetchItems(list_id: string) {
  noStore();

  try {
    const data = await sql<ItemForm>`SELECT items.id, items.list_id, items.name, items.is_checked FROM items WHERE list_id = ${list_id} LIMIT 20`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch items for list with list_id ${list_id}.`);
  }
}

export async function fetchFavoriteLists() {
  noStore();
  try {
    const data = await sql<FavoriteList>`
       SELECT
        favorites.id,
        lists.id,
        lists.name,
        lists.description
      FROM 
        favorites
      JOIN 
        lists ON favorites.list_id = lists.id
      LIMIT 6`;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchListData(id: string) {
  try {
    const checkedItemsCountPromise = await sql`
      SELECT 
        COUNT(*)
      FROM 
        items
      WHERE 
        list_id = ${id} AND is_checked = true
    `;
    const itemsCountPromise = await sql`
    SELECT 
      COUNT(*)
    FROM 
      items
    WHERE 
      list_id = ${id}
  `;
    const data = await Promise.all([itemsCountPromise, checkedItemsCountPromise]);
    const numItems = Number(data[0].rows[0].count ?? '0');
    const numCheckedItems = Number(data[1].rows[0].count ?? '0');

    return { numItems, numCheckedItems };
  }
  catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch list card data.');
  }

}

export async function fetchListById(id: string) {
  try {
    const data = await sql<ListForm>`SELECT lists.id, lists.name, lists.description FROM lists WHERE id = ${id}`;
    return data.rows[0];
  }
  catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch list.');
  }
}

export async function isFavorited(list_id: string) {
  try {
    const result = await sql`
    SELECT COUNT(*) > 0 AS is_favorited
    FROM favorites
    WHERE list_id = ${list_id};
  `;

    const isFavorited = result.rows[0]?.is_favorited || false;

    return isFavorited;
  }
  catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to check if list is favorited.');
  }
}