'use client'
import React, { useState } from 'react';
import { ItemState } from '@/app/lib/actions';
import { IconButton, Checkbox, FormHelperText } from '@mui/material';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import { ItemForm } from '@/app/lib/definitions';
import { updateItem } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

const EditItemForm = ({ item }: { item: ItemForm }) => {
  const [name, setName] = useState(item.name);
  const [isChecked, setIsChecked] = useState(item.is_checked);

  // I don't need this handle becuase when revalidate path is called, local state is set anyways
  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.currentTarget);
  //   await updateItemWithId(formData);
  //   setIsChecked(formData.get("is_checked") === 'on'); // Update local state
  // };
  const initialState: ItemState = { message: null, errors: {} };
  const updateItemWithId = updateItem.bind(null, item.id, item.list_id);
  const [state, formAction] = useFormState(updateItemWithId, initialState);
  return (
    <form action={formAction}>
      <TextField 
        sx={{ mb: 2 }}
        name="name"
        label="Title"
        fullWidth value={name}
        onChange={(e) => setName(e.target.value)}
        error={!!state?.errors?.name}
        helperText={state?.errors?.name?.[0] || ''}
      />
      <Checkbox
        sx={{ mr: 1 }}
        name="is_checked"
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
      />
      {!!state?.errors?.is_checked?.[0] && <FormHelperText>{state?.errors?.is_checked?.[0]}</FormHelperText>}
      <IconButton type="submit">
        <EditIcon sx={{ color: '#ED9121' }} />
      </IconButton>
    </form>
  );
};

export default EditItemForm;
