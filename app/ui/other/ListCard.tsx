import React from 'react';
import FavIcon from '../list/FavIcon';
import { auth } from '@/auth';
import Link from 'next/link';
import { fetchListData, isFavorited } from '@/app/lib/data';
import { DeleteList } from '../notebook/DeleteList';
import { UpdateList } from '../notebook/UpdateList';

const ListCard = async ({ title, description, list_id }: { title: string, description: string, list_id: string }) => {
  const { numItems, numCheckedItems } = await fetchListData(list_id);
  const is_favorited = await isFavorited(list_id);
  const session = await auth();
 
  if (!session?.user) return null;
  //console.log("Session is " ,session);
 
  return (
    <div className="flex flex-col items-center p-4 rounded-lg shadow-lg bg-white mt-2">
      <Link href={`/notebook/items/${list_id}`} className="text-lg font-semibold">
        <h3>{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
        <div className="flex items-center mt-2">
          <img src="path/to/avatar1.jpg" alt="Avatar 1" className="w-6 h-6 rounded-full" />
          <img src="path/to/avatar2.jpg" alt="Avatar 2" className="w-6 h-6 rounded-full -ml-2" />
          <div className="ml-2 text-sm text-gray-500">2</div>
        </div>
      </Link>
      <p className="text-xs text-gray-500 mt-1">{numCheckedItems} out of {numItems} completed</p>
      <div className="flex items-center mt-2 space-x-2">
        <FavIcon isFavorited={is_favorited} list_id={list_id} user_id={session.user.id} />
        
        {/* Mail Icon */}
        <button className="p-2 text-orange-500 hover:bg-orange-100 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l9 6 9-6M4 18l8-5 8 5" />
          </svg>
        </button>

        {/* Share Icon */}
        <button className="p-2 text-orange-500 hover:bg-orange-100 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>

        {/* Update List Button */}
        <UpdateList id={list_id} />
        
        {/* Delete List Button */}
        <DeleteList id={list_id} />
      </div>
    </div>
  );
};

export default ListCard;
