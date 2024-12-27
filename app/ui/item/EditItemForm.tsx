"use client";
//import React, { useState } from "react";
import { ItemState } from "@/app/lib/actions";
import { ItemForm } from "@/app/lib/definitions";
import { updateItem } from "@/app/lib/actions";
import { useActionState } from "react";

const EditItemForm = ({ item }: { item: ItemForm }) => {
  // const [name, setName] = useState(item.name);
  // const [isChecked, setIsChecked] = useState(item.is_checked);

  const initialState: ItemState = { errors: {}, message: null };
  const updateItemWithId = updateItem.bind(null, item.id, item.list_id);
  const [state, formAction] = useActionState(updateItemWithId, initialState);

  return (
    <form action={formAction} className="flex flex-col space-y-4 max-w-xs mx-4 mt-4">
      <div className="flex flex-col rounded-lg bg-white relative">
        <input
          type="text"
          name="name"
          id="name"
          defaultValue={item.name}
          placeholder="Enter name"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            state?.errors?.name ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
          }`}
        />
        {state?.errors?.name && (
          <span className="text-sm text-red-500">{state?.errors?.name[0]}</span>
        )}
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          name="is_checked"
          id="is_checked"
          defaultChecked={item.is_checked}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="is_checked" className="ml-2 text-sm text-gray-700">
          Checked
        </label>
      </div>
      {state?.errors?.is_checked?.[0] && (
        <span className="text-sm text-red-500">{state?.errors.is_checked[0]}</span>
      )}
      <button
        type="submit"
        className={`w-24 flex items-center justify-center p-2 border rounded hover:bg-orange-100 
          ${item.is_checked ? 'text-white border-white hover:text-orange-500' : 'text-orange-500 border-orange-500'}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 7L21 12M21 12L16 17M21 12H3"
          />
        </svg>
        Edit
      </button>
    </form>
  );
};

export default EditItemForm;
