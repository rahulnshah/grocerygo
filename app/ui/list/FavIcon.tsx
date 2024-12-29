'use client'
import { favoriteList, FavoriteState, unFavoriteList } from '@/app/lib/actions';
import { useActionState } from 'react';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

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
          <button type="submit" className="p-2 rounded-full text-orange-500 hover:text-orange-600 hover:bg-gray-100 transition-colors">
            <HeartSolid className="h-5 w-5" />
          </button>
        </form>
      ) : (
        <form action={formAction} className="inline-block">
          <input type="text" name="list_id" value={list_id} hidden readOnly />
          <input type="text" name="user_id" value={user_id} hidden readOnly />
          <button type="submit" className="p-2 rounded-full text-gray-600 hover:text-orange-500 hover:bg-gray-100 transition-colors">
            <HeartOutline className="h-5 w-5" />
          </button>
        </form>
      )}
    </>
  );
}
