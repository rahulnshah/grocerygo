import { checkItem } from "@/app/lib/actions";
import { useActionState } from 'react';
import { State } from '@/app/lib/actions';
export function CheckItem({ id, list_id }: { id: string; list_id: string }) {
    const checkItemWithId = checkItem.bind(null, id, list_id);
    const initialState: State = { message: null, errors: {} };
    const [state, formAction] = useActionState(checkItemWithId, initialState);
    return (
        <form action={formAction}>
            <button
                type="submit"
                className="text-gray-500 hover:text-green-500 focus:outline-none"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4m0 6a9 9 0 11-9-9 9 9 0 019 9z"
                    />
                </svg>
            </button>
        </form>
    );
}
