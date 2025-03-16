import { notFound } from 'next/navigation';
import React from 'react';
import { fetchItems, fetchListById } from '@/app/lib/data';
import ToBuyItem from '../../../ui/other/ToBuyItem';
import AddNewItem from '@/app/ui/other/AddNewItem';
import { getListUsers } from '@/app/lib/data';
import { auth } from '@/auth';
import { Suspense } from 'react';
import ToBuyItemSkeleton from '@/app/ui/other/ToBuyItemSkeleton';
import { User } from '@/app/lib/definitions';
export default async function ItemsPage({ params }: { params: Promise<{ list_id: string }>}) {
  const session = await auth();
  if (!session) {
    notFound();
  }
  console.log(session)
  const a = await params;
  const listUsers: User[] = await getListUsers(a.list_id);
  const list = await fetchListById(a.list_id);
  if (!list) {
    notFound();
  }
  console.log(listUsers);
  const listName = list.name;
  const currentUserId = session.user.id;
  const items = await fetchItems(a.list_id);
  console.log(items);
  // 
  return (
    <div className="flex justify-between p-6">
      <div className="w-3/5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
          {items.map((item) => (
            <Suspense key={item.id} fallback={<ToBuyItemSkeleton />}>
              <ToBuyItem item={item} />
            </Suspense>
          ))}
        </div>
      </div>
      <div className="w-2/5">
        <AddNewItem currentUserId={currentUserId} listUsers={listUsers} list_name={listName} list_id={a.list_id} />
      </div>
    </div>
  );
}
