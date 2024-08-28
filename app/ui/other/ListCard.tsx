import React from 'react';
import { Box, Typography, IconButton, Avatar, Badge } from '@mui/material';
import FavIcon from '../list/FavIcon';
import Link from 'next/link';
import MailIcon from '@mui/icons-material/Mail';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import { fetchListData, isFavorited } from '@/app/lib/data';
import { DeleteList } from '../notebook/DeleteList';
import { UpdateList } from '../notebook/UpdateList';
import { redirect } from 'next/navigation';
const ListCard = async ({ title, description, list_id }: { title: string, description: string, list_id: string }) => {
  const { numItems, numCheckedItems } = await fetchListData(list_id);
  const is_favorited = await isFavorited(list_id);
  // const [numItems, setNumItems] = useState("0");
  // const [numCheckedItems, setNumCheckedItems] = useState("0");
  // const router = useRouter();

  // const handleClick = () => {
  //   router.push(`/notebook/items/${list_id}`);
  // };

  // useEffect(() => {
  //   const getListInfo = () => {
  //     Promise.all([
  //       fetch(`/api/items/checked/${list_id}`).then(res => {
  //         if (!res.ok) throw new Error('Failed to fetch checked items');
  //         return res.json();
  //       }),
  //       fetch(`/api/items/count/${list_id}`).then(res => {
  //         if (!res.ok) throw new Error('Failed to fetch item count');
  //         return res.json();
  //       })
  //     ])
  //     .then(([numCheckedItemsData, numItemsData]) => {
  //       setNumCheckedItems(numCheckedItemsData);
  //       setNumItems(numItemsData);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching items:', error)        
  //     });
  //   };
  //   getListInfo();
  // }, []);

  return (

    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: 2,
      borderRadius: 1,
      boxShadow: 1,
      backgroundColor: 'white',
      mt: 2
    }}>
      <Link href={`/notebook/items/${list_id}`}>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h6">{description}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <Avatar src="path/to/avatar1.jpg" sx={{ width: 24, height: 24 }} />
          <Avatar src="path/to/avatar2.jpg" sx={{ width: 24, height: 24, ml: -1 }} />
          <Badge badgeContent={2} color="primary" sx={{ ml: 1 }} />
        </Box>
      </Link>
      <Typography variant="body2" color="textSecondary">{numCheckedItems} out of {numItems} completed</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
        <FavIcon isFavorited={is_favorited} list_id={list_id}/>
        <IconButton>
          <MailIcon sx={{ color: '#ED9121' }} />
        </IconButton>
        <IconButton>
          <ShareIcon sx={{ color: '#ED9121' }} />
        </IconButton>
        <UpdateList id={list_id} />
        <DeleteList id={list_id} />
      </Box>
    </Box>
  );
};

export default ListCard;
