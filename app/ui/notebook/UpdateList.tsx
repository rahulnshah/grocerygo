import Link from 'next/link';

export function UpdateList({ id }: { id: string }) {
  return (
    <Link
      href={`/notebook/lists/${id}/edit`}
      className="p-2 rounded-full text-[#ED9121] hover:text-orange-500 hover:bg-gray-200 transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M20.71 4.71c-.39-.39-1.02-.39-1.41 0L17 7.83l-3.17-3.17c-.39-.39-1.02-.39-1.41 0l-2.83 2.83c-.39.39-.39 1.02 0 1.41l3.17 3.17-4.24 4.24c-.39.39-.39 1.02 0 1.41l2.83 2.83c.39.39 1.02.39 1.41 0l4.24-4.24c.39-.39.39-1.02 0-1.41l-3.17-3.17 3.17-3.17c.39-.39.39-1.02 0-1.41zM12 14.12l3.17-3.17 2.83 2.83-3.17 3.17L12 14.12zm0 0L8.83 10.95l-2.83 2.83L8.83 16 12 14.12z"/>
      </svg>
    </Link>
  );
}
