'use client'
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ListForm } from "../../lib/definitions"
import { updateList } from '@/app/lib/actions';
import { State } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
export default function EditListForm({ list }: { list: ListForm; }) {
  const updateListWithId = updateList.bind(null, list.id);
  const [name, setName] = useState(list.name);
  const [description, setDescription] = useState(list.description);
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useFormState(updateListWithId, initialState);
  return (
    <form action={formAction}>
      <Box
        sx={{
          padding: 2,
          backgroundColor: '#fff',
          borderRadius: 8,
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h6" component="h2">
          Edit List
        </Typography>
        <TextField
          label="List name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
          name="name"
          error={!!state.errors?.name}
          helperText={state.errors?.name?.[0] || ''}
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={4}
          margin="normal"
          name="description"
          error={!!state.errors?.description}
          helperText={state.errors?.description?.[0] || ''}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
        >
          Update
        </Button>
      </Box>
    </form>
  );
}