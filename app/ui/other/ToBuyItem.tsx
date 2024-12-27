import React from 'react';
import { DeleteItem } from '../item/DeleteItem';
import EditItemForm from '../item/EditItemForm';
import { ItemForm } from '@/app/lib/definitions';

const ToBuyItem = ({ item }: { item: ItemForm }) => {
  return (
    <div className={`w-full rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ${item.is_checked ? 'bg-orange-500' : 'bg-white'}`}>
      <div className="flex-1">
        <EditItemForm item={item} />
      </div>
      <div className="flex justify-between items-center mt-auto">
        <DeleteItem id={item.id} list_id={item.list_id} />
      </div>
    </div>
  );
};

export default ToBuyItem;
