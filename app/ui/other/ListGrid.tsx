import React from 'react';
import ListCard from './ListCard';
import { fetchList } from '../../lib/data';
import { FavoriteList, List, ListWithCounts, SharedList } from '@/app/lib/definitions';
import { Suspense } from 'react';
import ListCardSkeleton from './ListCardSkeleton';
const ListGrid = async ({ lists }: { lists: ListWithCounts[] | List[]  }) => {
  try {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {lists.length === 0 ? (
          <div className="flex justify-center items-center col-span-full text-gray-500">
            No lists available.
          </div>
        ) : (
          lists.map((list) => (
            <Suspense key={list.id} fallback={<ListCardSkeleton />}>
              <ListCard
                title={list.name}
                description={list.description!}
                list_id={list.id.toString()}
                user_id={list.userId.toString()}
              />
            </Suspense>
          ))
        )}
      </div>
    );
  } catch (error) {
    console.error('Error fetching lists:', error);
    return (
      <div className="flex justify-center items-center text-gray-500">
        Failed to load lists. Please try again later.
      </div>
    );
  }
};

export default ListGrid;
