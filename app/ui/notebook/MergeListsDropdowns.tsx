'use client';
import { List } from '@/app/lib/definitions';
import { mergeLists, State } from '@/app/lib/actions';
import { useActionState } from 'react';

interface Props {
  lists: List[];
  userId: string;
}

export default function MergeListsDropdowns({ lists, userId }: Props) {
  const mergeListsWithId = mergeLists.bind(null, userId);
  const initialState: any = { message: null, errors: {} };
  const [state, formAction] = useActionState(mergeListsWithId, initialState);

  return (
    <form action={formAction} className="flex items-center gap-2">
      <select
        name="list1"
        required
        className="px-3 py-2 rounded-md border border-gray-300 
                 bg-white appearance-none cursor-pointer
                 focus:outline-none focus:ring-2 focus:ring-orange-500"
      >
        <option value="">Select first list</option>
        {lists.map((list) => (
          <option key={list.id} value={list.id}>
            {list.name}
          </option>
        ))}
      </select>

      <select
        name="list2"
        required
        className="px-3 py-2 rounded-md border border-gray-300 
                 bg-white appearance-none cursor-pointer
                 focus:outline-none focus:ring-2 focus:ring-orange-500"
      >
        <option value="">Select second list</option>
        {lists.map((list) => (
          <option key={list.id} value={list.id}>
            {list.name}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="px-4 py-2 bg-orange-500 text-white rounded-md 
                 hover:bg-orange-600 disabled:bg-gray-300 
                 disabled:cursor-not-allowed"
      >
        Merge Lists
      </button>

      {state?.message && (
        <p className="text-sm text-red-500">{state.message}</p>
      )}
    </form>
  );
} 