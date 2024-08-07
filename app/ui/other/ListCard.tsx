import React from 'react';
import { Box, Typography, IconButton, Avatar, Badge } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MailIcon from '@mui/icons-material/Mail';
import ShareIcon from '@mui/icons-material/Share';
import { fetchCheckedItemsById, fetchItemsById, fetchTotalItemsById } from '@/app/lib/data';

const ListCard = async ({ title, list_id }: { title: string, list_id: number }) => {
  const numItemsChecked = await fetchCheckedItemsById(list_id);
  const numItems = await fetchTotalItemsById(list_id);
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
      <Typography variant="h6">{title}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
        <Avatar src="path/to/avatar1.jpg" sx={{ width: 24, height: 24 }} />
        <Avatar src="path/to/avatar2.jpg" sx={{ width: 24, height: 24, ml: -1 }} />
        <Badge badgeContent={2} color="primary" sx={{ ml: 1 }} />
      </Box>
      <Typography variant="body2" color="textSecondary">{numItemsChecked} out of {numItems} completed</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
        <IconButton>
          <FavoriteIcon sx={{ color: '#ED9121' }} />
        </IconButton>
        <IconButton>
          <MailIcon sx={{ color: '#ED9121' }} />
        </IconButton>
        <IconButton>
          <ShareIcon sx={{ color: '#ED9121' }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ListCard;
