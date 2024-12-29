import { shareList } from '@/app/lib/actions';

export default function ShareButton({ listId, userId }: { listId: string, userId: string }) {
    const shareWithUser = shareList.bind(null, listId);
    return (
        <form action={shareWithUser}>
            <input type="hidden" name="user_id" value={userId} hidden readOnly/>
            <button
                type="submit"
            className="button-primary hover:bg-green-500"
            >
                Share
            </button>
        </form >
    );
}