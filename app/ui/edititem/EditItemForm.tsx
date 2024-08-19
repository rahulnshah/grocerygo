'use client'
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { IconButton, Checkbox } from '@mui/material';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import { ItemForm } from '@/app/lib/definitions';
import { updateItem } from '@/app/lib/actions';

const EditItemForm = ({ item }: { item: ItemForm }) => {
  const updateItemWithId = updateItem.bind(null, item.id, item.list_id);
  const [name, setName] = useState(item.name);
  return (
    <form action={updateItemWithId}>
      <TextField  sx={{ mb: 2 }} name="name" label="Title" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
      {item.is_checked ? (<Checkbox sx={{ mr: 1 }} name='is_checked' defaultChecked />) : (<Checkbox name='is_checked' />)}
      <IconButton type="submit">
        <EditIcon sx={{ color: '#ED9121' }} />
      </IconButton>
    </form>
  );
};

export default EditItemForm;
