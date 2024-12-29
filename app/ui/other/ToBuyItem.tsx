import React from 'react';
import { DeleteItem } from '../item/DeleteItem';
import EditItemForm from '../item/EditItemForm';
import { ItemForm } from '@/app/lib/definitions';
import { getListUsers } from '@/app/lib/data';
import { useSession } from 'next-auth/react';
import { auth } from '@/auth';

const ToBuyItem = async ({ item }: { item: ItemForm }) => {
  const listUsers = await getListUsers(item.list_id);
  const session = await auth();
  
  return (
    <div className={`w-full rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ${item.is_checked ? 'bg-orange-500' : 'bg-white'}`}>
      <div className="flex-1">
        <EditItemForm 
          item={item} 
          listUsers={listUsers}
          currentUserId={session?.user?.id || ''}
        />
      </div>
      <div className="flex justify-between items-center mt-auto">
        <DeleteItem id={item.id} list_id={item.list_id} />
      </div>
    </div>
  );
};

export default ToBuyItem;
