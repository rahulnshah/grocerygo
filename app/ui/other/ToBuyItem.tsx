'use client'
import React from 'react';
import { DeleteItem } from '../item/DeleteItem';
import EditItemForm from '../item/EditItemForm';
import { ItemForm } from '@/app/lib/definitions';

const ToBuyItem = ({ item }: { item: ItemForm }) => {
  return (
    <div className={`flex items-center p-2 rounded-lg shadow-md mt-2 ${item.is_checked ? 'bg-orange-500' : 'bg-white'}`}>
      <div className="flex-1">
        <EditItemForm item={item} />
      </div>
      <div className="flex items-center">
        <p className="text-sm mr-1">You</p>
        <DeleteItem id={item.id} list_id={item.list_id} />
      </div>
    </div>
  );
};

export default ToBuyItem;
