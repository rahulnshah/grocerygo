'use client'
import React, { useState } from 'react';
import { useActionState } from 'react';
import { createList } from '@/app/lib/actions';
import { State } from '@/app/lib/actions';
import { useSession } from "next-auth/react";
const AddNewListForm = () => {
  const { data: session, status } = useSession();
  const initialState: State = { message: null, errors: {} };
  const createListWithListIdAndUserId = createList.bind(null, session?.user?.id!);
  const [state, formAction] = useActionState(createListWithListIdAndUserId, initialState);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  async function handleClick() {
    try {
      const result = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!result.ok) {
        throw new Error("Failed to fetch data");
      }

      const newDescription = await result.json();
      setDescription(newDescription.message);
    } catch (err) {
      console.error("error occured generating description", err);
    } finally {
      console.log("done");
    }
  }

  return (
    <>
      <form action={formAction}>
        <div className="flex flex-col w-72 p-4 rounded-lg shadow-lg bg-white relative">
          <button type="button" className="absolute top-2 right-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h2 className="text-xl font-semibold mb-4">Add New List</h2>

          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">List name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              name="name"
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${state?.errors?.name ? 'border-red-500' : 'border-gray-300'}`}
            />
            {state?.errors?.name && <p className="mt-1 text-sm text-red-500">{state?.errors?.name[0]}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <div className="relative">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id="description"
                name="description"
                rows={4}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${state?.errors?.description ? 'border-red-500' : 'border-gray-300'}`}
              />
            </div>
            {state?.errors?.description && <p className="mt-1 text-sm text-red-500">{state?.errors?.description[0]}</p>}
          </div>
          <button
            type="button"
            className="button-primary"
            onClick={handleClick}
          >
            Generate
          </button>
          <button
            type="submit"
            className="w-full py-2 px-4 mt-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            Add
          </button>
        </div>
      </form>
    </>
  );
};

export default AddNewListForm;
