'use client'
import React from 'react';
import { Box, TextField, Button, Typography, IconButton, Checkbox, FormHelperText } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { createItem } from '@/app/lib/actions';
import { ItemState } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
const AddNewItem = ({list_id}:{list_id: string}) => {
  const initialState: ItemState = { message: null, errors: {} };
  const createItemWithListId = createItem.bind(null, list_id);
  const [state, formAction] = useFormState(createItemWithListId, initialState);
  return (
    <form action={formAction}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        width: 300,
        padding: 2,
        borderRadius: 1,
        boxShadow: 1,
        backgroundColor: 'white',
        position: 'relative'
      }}>
        <IconButton sx={{ position: 'absolute', top: 8, right: 8 }}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h6">Add New Item</Typography>
        <TextField
          variant="outlined"
          placeholder="Search"
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1 }} />
          }}
          sx={{ mt: 2 }}
        />
        <TextField
          label="Item name"
          variant="outlined"
          name="name"
          fullWidth
          sx={{ mt: 2 }}
          error={!!state.errors?.name}
          helperText={state.errors?.name?.[0] || ''}
        />
        <Checkbox name='is_checked'/>
        {!!state?.errors?.is_checked?.[0] &&  <FormHelperText>{state?.errors?.is_checked?.[0]}</FormHelperText>}
        <Button
          variant="contained"
          sx={{ mt: 2, backgroundColor: '#ED9121', color: 'white' }}
          fullWidth
          type="submit"
        >
          Add
        </Button>
      </Box>
    </form>
  );
};

export default AddNewItem;
