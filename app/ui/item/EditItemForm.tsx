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
  const [isChecked, setIsChecked] = useState(item.is_checked);

  // I don't need this handle becuase when revalidate path is called, local state is set anyways
  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.currentTarget);
  //   await updateItemWithId(formData);
  //   setIsChecked(formData.get("is_checked") === 'on'); // Update local state
  // };

  return (
    <form action={updateItemWithId}>
      <TextField  sx={{ mb: 2 }} name="name" label="Title" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
      <Checkbox
        sx={{ mr: 1 }}
        name="is_checked"
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
      />
      <IconButton type="submit">
        <EditIcon sx={{ color: '#ED9121' }} />
      </IconButton>
    </form>
  );
};

export default EditItemForm;
