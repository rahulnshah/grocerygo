'use client'
import React from 'react';
import { Box, TextField, Button, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// import { useActionState } from 'react';
import { useFormState } from 'react-dom';
import { createList } from '@/app/lib/actions';
import { State } from '@/app/lib/actions';
import { useSession } from "next-auth/react"


const AddNewListForm = () => {
  const { data: session, status } = useSession()
  const initialState: State = { message: null, errors: {} };
  const createListWithListIdAndUserId = createList.bind(null, session?.user?.id!);
  const [state, action] = useFormState(createListWithListIdAndUserId, initialState);
  return (
    <form action={action}>
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
        <Typography variant="h6">Add New List</Typography>
        <TextField
          label="List name"
          name="name"
          variant="outlined"
          fullWidth
          sx={{ mt: 2 }}
          error={!!state.errors?.name}
          helperText={state.errors?.name?.[0] || ''}
        />
        <TextField
          label="Description"
          variant="outlined"
          name="description"
          multiline
          rows={4}
          fullWidth
          sx={{ mt: 2 }}
          error={!!state.errors?.description}
          helperText={state.errors?.description?.[0] || ''}
        />
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

export default AddNewListForm;
