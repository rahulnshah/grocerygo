'use client'
import { favoriteList, FavoriteState, unFavoriteList } from '@/app/lib/actions';
import { useActionState } from 'react';
export default function FavIcon({ isFavorited, user_id, list_id }: { isFavorited: boolean, user_id: string, list_id: string }) {
  //const [isFav, setIsFav] = useState(isFavorited)
  const unFavoriteListWithId = unFavoriteList.bind(null, user_id, list_id);
  const initialState: FavoriteState = { message: null, errors: {} };
  const [state, formAction] = useActionState(favoriteList, initialState);
  // const handleFavSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   await favoriteListWithId();
  //   setIsFav(true); // Update local state
  // };

  // const handleUnFavSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   await unFavoriteListWithId();
  //   setIsFav(false); // Update local state
  // };

  return (
    <>
      {isFavorited ? (
        <form action={unFavoriteListWithId} className="inline-block">
        <button type="submit" className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 text-orange-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        </button>
      </form>
      ) : (
        <form action={formAction} className="inline-block">
          <input type="text" name="list_id" value={list_id} hidden readOnly></input>
          <input type="text" name="user_id" value={user_id} hidden readOnly></input>
          <button type="submit" className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-6 h-6 text-orange-500"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
        </form>
      )}
    </>
  );
}
