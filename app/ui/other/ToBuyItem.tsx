'use client'
import React from 'react';
import { Box, Typography } from '@mui/material';
import { DeleteItem } from '../edititem/DeleteItem';
// import { CheckItem } from '../edititem/CheckItem';
import TextField from '@mui/material/TextField';
import EditItemForm from '../edititem/EditItemForm';
import { ItemForm } from '@/app/lib/definitions';

const ToBuyItem = ({ item }: { item: ItemForm }) => {

  return (
    <>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        padding: 2,
        borderRadius: 1,
        boxShadow: 1,
        backgroundColor: item.is_checked ? 'orange' : 'white',
        mt: 2
      }}>
        <Box sx={{ flex: 1 }}>
          <EditItemForm item={item} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ mr: 1 }}>You</Typography>
          <DeleteItem id={item.id} list_id={item.list_id} />
          {/* <CheckItem id={item_id} list_id={list_id}/> */}
        </Box>
      </Box>
    </>
  );
};

export default ToBuyItem;
