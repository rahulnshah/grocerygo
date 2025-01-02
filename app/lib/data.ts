'use server';
import { sql } from '@vercel/postgres';
import {
  Item,
  FavoriteList,
  List,
  ListForm,
  ItemForm,
  User,
  SharedList,
  ListWithCounts
} from './definitions';

import { PriorityQueue } from '@datastructures-js/priority-queue';

import { unstable_noStore as noStore } from 'next/cache';

export async function fetchNameOfList(list_id: string) {
  noStore();
  try {
    const data = await sql<ListForm>`SELECT * FROM lists WHERE id = ${list_id}`;
    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch list description.');
  }
}
export async function searchUsers(query: string, ownerId: string, listId: string) {
  noStore();
  if (!query || query.length < 2) {
    return { users: [] };
  }

  try {
    const result = await sql<User>`
      SELECT *
      FROM users
      WHERE (name ILIKE ${`%${query}%`} OR email ILIKE ${`%${query}%`}) AND id != ${ownerId}
      AND id NOT IN (
      SELECT shared_with_id 
      FROM shared_lists 
      WHERE list_id = ${listId}
    )
      AND id NOT IN (
      SELECT owner_id
      FROM shared_lists
      WHERE list_id = ${listId}
    )
    `;
    console.log('Result:', result.rows);
    // const fuse = new Fuse(result.rows, {
    //   keys: ['name', 'email']
    // });

    // const searchResults = fuse.search(query).map(result => result.item);
    return { users: result.rows };
  } catch (error) {
    console.log(error);
    return { users: [], error: 'Failed to search users' };
  }
}

export async function fetchSharedLists(owner_id: string) {
  noStore();
  try {
    const data = await sql<List>`SELECT lists.id, lists.user_id, lists.name, lists.description FROM shared_lists
      JOIN lists ON shared_lists.list_id = lists.id
      WHERE shared_with_id = ${owner_id} LIMIT 20`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch lists.');
  }
}

export async function getListSharedUsers(list_id: string, owner_id: string) {
  try {
    const result = await sql`
      SELECT u.id, u.name, u.email, sl.shared_at
      FROM shared_lists sl
      JOIN users u ON sl.shared_with_id = u.id
      WHERE sl.list_id = ${list_id} AND sl.owner_id = ${owner_id}
      ORDER BY sl.shared_at DESC;
    `;
    return { users: result.rows };
  } catch (error) {
    return { users: [], error: 'Failed to fetch shared users' };
  }
}
export async function fetchList(user_id: string) {
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();

  try {
    const data = await sql<List>`SELECT * FROM lists WHERE lists.user_id = ${user_id} LIMIT 20`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch lists.');
  }
}

export async function fetchItems(list_id: string) {
  noStore();
  try {
    const data = await sql<ItemForm>`
      SELECT 
        items.id, 
        items.list_id, 
        items.name, 
        items.is_checked,
        items.assigned_to,
        users.name as assigned_to_name
      FROM items 
      LEFT JOIN users ON items.assigned_to = users.id
      WHERE list_id = ${list_id} 
      LIMIT 20
    `;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch items for list with list_id ${list_id}.`);
  }
}

export async function fetchFavoriteLists(owner_id: string) {
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
      JOIN
        users on favorites.user_id = users.id
      WHERE
        favorites.user_id = ${owner_id}
      LIMIT 6`;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchListData(id: string) {
  noStore();
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
  noStore();
  try {
    const data = await sql<ListForm>`SELECT lists.id, lists.name, lists.description FROM lists WHERE id = ${id}`;
    return data.rows[0];
  }
  catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch list.');
  }
}

export async function isFavorited(list_id: string): Promise<boolean> {
  noStore();
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


export async function getUser(email: string) {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    let row = user.rows[0];
    // console.log('User:', row);
    return row;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function getListUsers(list_id: string) {
  noStore();
  try {
    const result = await sql<User>`
      SELECT 
        u.id,
        u.name,
        u.email,
        u.created_at,
        CASE 
          WHEN l.user_id = u.id THEN true
          ELSE false
        END as is_owner
      FROM lists l
      LEFT JOIN shared_lists sl ON l.id = sl.list_id
      LEFT JOIN users u ON sl.shared_with_id = u.id OR l.user_id = u.id
      WHERE l.id = ${list_id}
      GROUP BY u.id, u.name, u.email, l.user_id;
    `;
    return result.rows;
  } catch (error) {
    console.error('Database Error:', error);
    return [];
  }
}

export async function getAssignedItemsCount(userId: string) {
  noStore();
  try {
    const result = await sql`
      SELECT COUNT(*) 
      FROM items i
      JOIN lists l ON i.list_id = l.id
      JOIN shared_lists sl ON l.id = sl.list_id
      WHERE i.assigned_to = ${userId}
        AND sl.shared_with_id = ${userId}
    `;
    return Number(result.rows[0].count);
  } catch (error) {
    console.error('Database Error:', error);
    return 0;
  }
}

export async function fetchListsWithCounts(user_id: string) {
  noStore();
  try {
    const data = await sql<ListWithCounts>`
      SELECT 
        l.*,
        COUNT(i.id) as item_count
      FROM lists l
      LEFT JOIN items i ON l.id = i.list_id
      WHERE l.user_id = ${user_id}
      GROUP BY l.id
      ORDER BY l.created_at DESC
    `;

    return data.rows.map(list => ({
      ...list,
      item_count: Number(list.item_count)
    }));
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch lists with counts.');
  }
}

export async function fetchTopKFrequentLists(k: number, user_id: string) {
  noStore();
  try {
    const lists: ListWithCounts[] = await fetchListsWithCounts(user_id);
    lists.sort((a, b) => b.item_count - a.item_count);
    return lists.slice(0, k);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch top k frequent lists.');
  }
}

export async function fetchTotalNumberOfLists(user_id: string) {
  noStore();
  try {
    const lists = await sql`SELECT COUNT(*) FROM lists WHERE user_id = ${user_id}`;
    return Number(lists.rows[0].count);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of lists.');
  }
}
