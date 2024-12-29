import { PencilSquareIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function UpdateList({ id }: { id: string }) {
  return (
    <Link
      href={`/notebook/lists/${id}/edit`}
      className="p-2 rounded-full text-gray-600 hover:text-orange-500 hover:bg-gray-100 transition-colors"
    >
      <PencilSquareIcon className="h-5 w-5" />
    </Link>
  );
}
