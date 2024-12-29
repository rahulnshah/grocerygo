import { deleteItem } from "@/app/lib/actions";
import { TrashIcon } from "@heroicons/react/24/solid";

export function DeleteItem({ id, list_id }: { id: string; list_id: string }) {
  const deleteItemWithId = deleteItem.bind(null, id, list_id);

  return (
    <form action={deleteItemWithId} className="inline">
      <button
        type="submit"
        className="p-2 rounded-full text-gray-600 hover:text-red-500 hover:bg-gray-100 transition-colors"
      >
        <TrashIcon className="h-5 w-5" />
      </button>
    </form>
  );
}
