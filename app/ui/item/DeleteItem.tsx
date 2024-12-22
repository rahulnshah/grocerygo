import { deleteItem } from "@/app/lib/actions";
import { TrashIcon } from "@heroicons/react/24/solid";

export function DeleteItem({ id, list_id }: { id: string; list_id: string }) {
  const deleteItemWithId = deleteItem.bind(null, id, list_id);

  return (
    <form action={deleteItemWithId} className="inline">
      <button
        type="submit"
        className="p-2 rounded-full hover:bg-gray-200 transition-colors"
      >
        <TrashIcon className="h-6 w-6 text-[#ED9121]" />
      </button>
    </form>
  );
}
