import Link from "next/link";
import { ShareIcon } from '@heroicons/react/24/outline';

export function ShareList({ id }: { id: string }) {
    return (
        <Link href={`/notebook/lists/share-modal/${id}`} className="p-2 rounded-full text-gray-600 hover:text-orange-500 hover:bg-gray-100 transition-colors">
          <ShareIcon className="h-5 w-5" />
        </Link>
    );
}  