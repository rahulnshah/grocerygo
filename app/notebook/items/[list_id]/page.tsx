import { notFound } from 'next/navigation';
import React from 'react';
import { fetchItems, fetchListById } from '@/app/lib/data';
import ToBuyItem from '../../../ui/other/ToBuyItem';
import AddNewItem from '@/app/ui/other/AddNewItem';

export default async function ItemsPage({ params }: { params: { list_id: string } }) {
  const list = await fetchListById(params.list_id);
  if (!list) {
    notFound();
  }

  const items = await fetchItems(params.list_id);

  return (
    <div className="flex justify-between p-6">
      <div className="w-3/5">
        <div className="grid grid-cols-4 gap-4 w-1/2">
          {items.map((item) => (
            <ToBuyItem key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div className="w-2/5">
        <AddNewItem list_id={params.list_id} />
      </div>
    </div>
  );
}
