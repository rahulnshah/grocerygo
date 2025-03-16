'use server';
import { drizzle } from 'drizzle-orm/neon-http';
import { and, eq, ilike, ne, notInArray, count, desc, or, isNull } from 'drizzle-orm';
import { lists, items, users, sharedLists, favorites } from './schema';
import {
  Item,
  FavoriteList,
  List,
  ListForm,
  ItemForm,
  User,
  SharedList,
  ItemWithAssignee,
  ListWithCounts
} from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

const database = drizzle(process.env.DATABASE_URL!);

export async function fetchNameOfList(list_id: string) {
  noStore();
  try {
    const data: List[] = await database
      .select()
      .from(lists)
      .where(eq(lists.id, parseInt(list_id)));
    return data[0];
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
    const sharedUserIds = await database
      .select({ id: sharedLists.sharedWithId })
      .from(sharedLists)
      .where(eq(sharedLists.listId, parseInt(listId)));

    const ownerIds = await database
      .select({ id: sharedLists.ownerId })
      .from(sharedLists)
      .where(eq(sharedLists.listId, parseInt(listId)));

    const excludeIds = [...sharedUserIds, ...ownerIds].map(u => u.id);

    const result: User[] = await database
      .select()
      .from(users)
      .where(
        and(
          ne(users.id, parseInt(ownerId)),
          notInArray(users.id, excludeIds),
          or(
            ilike(users.name, `%${query}%`),
            ilike(users.email, `%${query}%`)
          )
        )
      );

    return { users: result };
  } catch (error) {
    console.log(error);
    return { users: [], error: 'Failed to search users' };
  }
}

export async function fetchSharedLists(owner_id: string) {
  noStore();
  try {
    const data: List[] = await database
      .select({
        id: lists.id,
        userId: lists.userId,
        name: lists.name,
        description: lists.description,
        createdAt: lists.createdAt,
        updatedAt: lists.updatedAt
      })
      .from(sharedLists)
      .innerJoin(lists, eq(sharedLists.listId, lists.id))
      .where(eq(sharedLists.sharedWithId, parseInt(owner_id)))
      .limit(20);
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch lists.');
  }
}

export async function getListSharedUsers(list_id: string, owner_id: string) {
  try {
    const result = await database
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        sharedAt: sharedLists.sharedAt
      })
      .from(sharedLists)
      .innerJoin(
        users,
        eq(sharedLists.sharedWithId, users.id)
      )
      .where(
        and(
          eq(sharedLists.listId, parseInt(list_id)),
          eq(sharedLists.ownerId, parseInt(owner_id))
        )
      )
      .orderBy(desc(sharedLists.sharedAt));

    return { users: result };
  } catch (error) {
    return { users: [], error: 'Failed to fetch shared users' };
  }
}

export async function fetchList(user_id: string) {
  noStore();

  try {
    const data: List[] = await database
      .select()
      .from(lists)
      .where(eq(lists.userId, parseInt(user_id)))
      .limit(20);

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch lists.');
  }
}

export async function fetchItems(list_id: string) {
  noStore();
  try {
    const data: ItemForm[] = await database
      .select({
        id: items.id,
        listId: items.listId,
        name: items.name,
        isChecked: items.isChecked,
        assignedTo: items.assignedTo,
        assignedToName: users.name,
      })
      .from(items)
      .leftJoin(users, eq(items.assignedTo, users.id))
      .where(eq(items.listId, parseInt(list_id)))
      .limit(20);
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch items for list with list_id ${list_id}.`);
  }
}

export async function fetchFavoriteLists(owner_id: string) {
  noStore();
  try {
    const data: FavoriteList[] = await database
      .select({
        id: favorites.id,
        listId: lists.id,
        name: lists.name,
        description: lists.description
      })
      .from(favorites)
      .innerJoin(lists, eq(favorites.listId, lists.id))
      .innerJoin(users, eq(favorites.userId, users.id))
      .where(eq(favorites.userId, parseInt(owner_id)))
      .limit(6);

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch favorite lists.');
  }
}

export async function fetchListData(id: string) {
  noStore();
  try {
    const checkedItems = await database
      .select({ value: count() })
      .from(items)
      .where(and(
        eq(items.listId, parseInt(id)),
        eq(items.isChecked, true)
      ));

    const totalItems = await database
      .select({ value: count() })
      .from(items)
      .where(eq(items.listId, parseInt(id)));

    return {
      numItems: Number(totalItems[0].value),
      numCheckedItems: Number(checkedItems[0].value)
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch list card data.');
  }
}

export async function fetchListById(id: string) {
  noStore();
  try {
    const data: ListForm[] = await database
      .select({
        id: lists.id,
        name: lists.name,
        description: lists.description
      })
      .from(lists)
      .where(eq(lists.id, parseInt(id)));
    return data[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch list.');
  }
}

export async function isFavorited(list_id: string): Promise<boolean> {
  noStore();
  try {
    const result = await database
      .select({ value: count() })
      .from(favorites)
      .where(eq(favorites.listId, parseInt(list_id)));
    
    return Number(result[0].value) > 0;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to check if list is favorited.');
  }
}

export async function getUser(email: string) {
  try {
    const user: User[] = await database
      .select()
      .from(users)
      .where(eq(users.email, email));
    return user[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function getListUsers(list_id: string) {
  noStore();
  try {
    // get all users who have access to the list and the owner of the list as well
    const result: User[] = await database
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        password: users.password,
        createdAt: users.createdAt
      })
      .from(sharedLists)
      .innerJoin(users, eq(sharedLists.sharedWithId, users.id))
      .where(eq(sharedLists.listId, parseInt(list_id)))
      .union(
          database
            .select({
              id: users.id,
              name: users.name,
              email: users.email,
              password: users.password,
              createdAt: users.createdAt
            })
            .from(lists)
            .innerJoin(users, eq(lists.userId, users.id))
            .where(eq(lists.id, parseInt(list_id)))
        );
    return result;
  } catch (error) {
    console.error('Database Error:', error);
    return [];
  }
}

export async function getAssignedItemsCount(userId: string) {
  noStore();
  try {
    const result = await database
      .select({ value: count() })
      .from(items)
      .innerJoin(lists, eq(items.listId, lists.id))
      .innerJoin(sharedLists, eq(lists.id, sharedLists.listId))
      .where(
        and(
          eq(items.assignedTo, parseInt(userId)),
          eq(sharedLists.sharedWithId, parseInt(userId))
        )
      );
    
    return Number(result[0].value);
  } catch (error) {
    console.error('Database Error:', error);
    return 0;
  }
}

export async function fetchListsWithCounts(user_id: string) {
  noStore();
  try {
    const data: ListWithCounts[] = await database
      .select({
        id: lists.id,
        userId: lists.userId,
        name: lists.name,
        description: lists.description,
        createdAt: lists.createdAt,
        updatedAt: lists.updatedAt,
        itemCount: count(items.id)
      })
      .from(lists)
      .leftJoin(items, eq(lists.id, items.listId))
      .where(eq(lists.userId, parseInt(user_id)))
      .groupBy(lists.id)
      .orderBy(desc(lists.createdAt));

    return data.map(list => ({
      ...list,
      item_count: Number(list.itemCount)
    }));
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch lists with counts.');
  }
}

export async function fetchTopKFrequentLists(k: number, user_id: string) {
  noStore();
  try {
    const myLists: ListWithCounts[] = await fetchListsWithCounts(user_id);
    myLists.sort((a, b) => b.itemCount - a.itemCount);
    return myLists.slice(0, k);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch top k frequent lists.');
  }
}

export async function fetchTotalNumberOfLists(user_id: string) {
  noStore();
  try {
    const result = await database
      .select({ value: count() })
      .from(lists)
      .where(eq(lists.userId, parseInt(user_id)));
    
    return Number(result[0].value);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of lists.');
  }
}
