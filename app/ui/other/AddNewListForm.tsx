import React from 'react';
import { Box, TextField, Button, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// import { ListField } from '@/app/lib/definitions';
import { createList } from '@/app/lib/actions';

const AddNewListForm = () => {
  return (
    <form action={createList}>
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
      />
      <TextField
        label="Description"
        variant="outlined"
        name="description"
        multiline
        rows={4}
        fullWidth
        sx={{ mt: 2 }}
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
