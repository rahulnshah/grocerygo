import { unshareList } from '@/app/lib/actions';
export default function UnshareButton({ listId, userId }: { listId: string, userId: string }) {
    const unshareWithUser = unshareList.bind(null, listId);
    return (
        <form action={unshareWithUser}>
            <input type="hidden" name="user_id" value={userId} hidden readOnly/>
            <button
                type="submit"
                className="button-primary hover:bg-red-500"
            >
                Remove
            </button>
        </form>
    );
}
