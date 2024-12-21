import { deleteList } from "@/app/lib/actions";

export function DeleteList({ id }: { id: string }) {
  const deleteListWithId = deleteList.bind(null, id);

  return (
    <form action={deleteListWithId}>
      <button
        type="submit"
        className="p-2 rounded-full text-[#ED9121] hover:text-red-500 hover:bg-gray-200 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-12c0-1.1-.9-2-2-2h-8c-1.1 0-2 .9-2 2v12zm4-2v-10h4v10h-4zm1-12h2v-2h-2v2zm6 0h-8v-2h8v2z"/>
        </svg>
      </button>
    </form>
  );
}
