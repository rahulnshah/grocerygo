// components/ListGrid.tsx
import React from 'react';
import ListCard from './ListCard';
import { fetchList } from '../../lib/data';

const ListGrid = async ({ user_id }: { user_id: string }) => {
  const lists = await fetchList(user_id);

  return (
    <div className="grid grid-cols-3 gap-4 w-1/2 mx-auto mt-4">
      {lists.length === 0 ? (
        <div className="col-span-3 text-center text-gray-500">
          No lists available.
        </div>
      ) : (
        lists.map((list) => (
          <ListCard
            key={list.id}
            title={list.name}
            description={list.description}
            list_id={list.id}
          />
        ))
      )}
    </div>
  );
};

export default ListGrid;
