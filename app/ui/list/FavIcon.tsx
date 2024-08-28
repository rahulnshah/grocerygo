'use client'
import { IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { FavoriteBorderOutlined } from '@mui/icons-material';
import { favoriteList, unFavoriteList } from '@/app/lib/actions';
export default function FavIcon({ isFavorited, list_id }: { isFavorited: boolean, list_id: string }) {
  const [isFav, setIsFav] = useState(isFavorited);
  const favoriteListWithId = favoriteList.bind(null, list_id);
  const unFavoriteListWithId = unFavoriteList.bind(null, list_id);

  const handleFavSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await favoriteListWithId();
    setIsFav(!isFav); // Update local state
  };

  const handleUnFavSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await unFavoriteListWithId();
    setIsFav(!isFav); // Update local state
  };

  return (
    <>
      {isFav ? (
        <form onSubmit={handleUnFavSubmit}>
          <IconButton type="submit">
            <FavoriteIcon sx={{ color: '#ED9121' }} />
          </IconButton>
        </form>) :
        (<form onSubmit={handleFavSubmit}>
          <IconButton type="submit">
            <FavoriteBorderOutlined sx={{ color: '#ED9121' }} />
          </IconButton>
        </form>)
      }
    </>
  );
}