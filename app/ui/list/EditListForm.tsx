'use client'
import React, { useState } from 'react';
import { ListForm } from "../../lib/definitions"
import { updateList } from '@/app/lib/actions';
import { State } from '@/app/lib/actions';
import { useActionState } from 'react';

export default function EditListForm({ list }: { list: ListForm; }) {
  const updateListWithId = updateList.bind(null, list.id);
  const [name, setName] = useState(list.name);
  const [description, setDescription] = useState(list.description);
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(updateListWithId, initialState);

  return (
    <form action={formAction}>
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Edit List</h2>
        
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">List name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${state.errors?.name ? 'border-red-500' : 'border-gray-300'}`}
          />
          {state.errors?.name && <p className="mt-1 text-sm text-red-500">{state.errors?.name[0]}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${state.errors?.description ? 'border-red-500' : 'border-gray-300'}`}
          />
          {state.errors?.description && <p className="mt-1 text-sm text-red-500">{state.errors?.description[0]}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Update
        </button>
      </div>
    </form>
  );
}
