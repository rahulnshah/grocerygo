import Link from "next/link";
import { InboxIcon } from '@heroicons/react/24/outline';

export function MailList({ id }: { id: string }) {
    return (
        <Link href={`/notebook/lists/items/${id}`} className="p-2 rounded-full text-gray-600 hover:text-orange-500 hover:bg-gray-100 transition-colors">
          <InboxIcon className="h-5 w-5" />
        </Link>
    );
}
