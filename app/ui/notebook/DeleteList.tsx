import { TrashIcon } from '@heroicons/react/24/outline';
import { deleteList } from "@/app/lib/actions";

export function DeleteList({ id }: { id: string }) {
  const deleteListWithId = deleteList.bind(null, id);

  return (
    <form action={deleteListWithId}>
      <button
        type="submit"
        className="p-2 rounded-full text-gray-600 hover:text-red-500 hover:bg-gray-100 transition-colors"
      >
        <TrashIcon className="h-5 w-5" />
      </button>
    </form>
  );
}
