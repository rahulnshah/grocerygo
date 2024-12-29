import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';

import { copyList } from '@/app/lib/actions';

export default function CopyList({ listId, userId }: { listId: string, userId: string }) {
    const copyForUser = copyList.bind(null, listId);
    return (
        <form action={copyForUser}>
            <input type="hidden" name="user_id" value={userId} hidden readOnly />
            <button
                type="submit"
                className="p-2 rounded-full text-gray-600 hover:text-orange-500 hover:bg-gray-100 transition-colors"
            >
                <DocumentDuplicateIcon className="h-5 w-5" />
            </button>
        </form >
    );
}