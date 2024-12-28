'use client'
import React from 'react';
import { createItem } from '@/app/lib/actions';
import { ItemState } from '@/app/lib/actions';
import { useActionState } from 'react';
import { getListUsers } from '@/app/lib/data';
import { User } from 'next-auth';
const AddNewItem = ({ list_id, currentUserId, listUsers }: { list_id: string, currentUserId: string, listUsers: User[] }) => {
  const initialState: ItemState = { message: null, errors: {} };
  const createItemWithListId = createItem.bind(null, list_id);
  const [state, formAction] = useActionState(createItemWithListId, initialState);

  return (
    <form action={formAction}>
      <div className="flex flex-col w-72 p-4 rounded-lg shadow-lg bg-white relative">
        <button type="button" className="absolute top-2 right-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
        
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Item name</label>
          <input
            type="text"
            id="name"
            name="name"
            className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${state?.errors?.name ? 'border-red-500' : 'border-gray-300'}`}
          />
          {state?.errors?.name && <p className="mt-1 text-sm text-red-500">{state?.errors?.name[0]}</p>}
        </div>

        <div className="flex flex-col">
        <select
          name="assigned_to"
          defaultValue={currentUserId}
          className="w-full px-3 py-2 border rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {listUsers.map((user) => ((
              <option key={user.id} value={user.id}>
                {user.id === currentUserId ? 'You' : user.name}
              </option>
            )
          ))}
        </select>
      </div>

        <div className="flex items-center mb-4">
          <input type="checkbox" name="is_checked" id="is_checked" className="mr-2" />
          <label htmlFor="is_checked" className="text-sm text-gray-700">Checked</label>
        </div>
        {state?.errors?.is_checked && <p className="mt-1 text-sm text-red-500">{state?.errors?.is_checked[0]}</p>}

        <button
          type="submit"
          className="w-full py-2 px-4 mt-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default AddNewItem;
