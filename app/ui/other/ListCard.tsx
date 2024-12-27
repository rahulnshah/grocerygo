import React from 'react';
import FavIcon from '../list/FavIcon';
import { auth } from '@/auth';
import Link from 'next/link';
import { fetchListData, isFavorited } from '@/app/lib/data';
import { DeleteList } from '../notebook/DeleteList';
import { UpdateList } from '../notebook/UpdateList';
import { ShareList } from '../notebook/ShareList';
import { MailList } from '../notebook/MailList';
interface ListCardProps {
  title: string;
  description: string;
  list_id: string;
  owner_name?: string;
}

const ListCard = async ({ title, description, list_id }: ListCardProps) => {
  const { numItems, numCheckedItems } = await fetchListData(list_id);
  const is_favorited: boolean = await isFavorited(list_id);
  const session = await auth();

  if (!session?.user) return null;
  //console.log("Session is " ,session);

  return (
    <div className="w-full bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="p-4">
        <Link href={`/notebook/items/${list_id}`} className="text-lg font-semibold block">
          <h3 className="truncate">{title}</h3>
          <p className="text-sm text-gray-600 truncate">{description}</p>
          <div className="flex items-center mt-2">
            <img src="path/to/avatar1.jpg" alt="Avatar 1" className="w-6 h-6 rounded-full" />
            <img src="path/to/avatar2.jpg" alt="Avatar 2" className="w-6 h-6 rounded-full -ml-2" />
            <div className="ml-2 text-sm text-gray-500">2</div>
          </div>
        </Link>
        <p className="text-xs text-gray-500 mt-1">{numCheckedItems} out of {numItems} completed</p>
        <div className="flex justify-between items-center mt-auto space-x-1">
          <FavIcon isFavorited={is_favorited} list_id={list_id} user_id={session.user.id} />
          <MailList id={list_id} />
          <ShareList id={list_id} />
          <UpdateList id={list_id} />
          <DeleteList id={list_id} />
        </div>
      </div>
    </div>

  );
};

export default ListCard;
