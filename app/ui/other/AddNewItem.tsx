import React from 'react';
import { Box, TextField, Button, Typography, IconButton, Checkbox } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { createItem } from '@/app/lib/actions';

const AddNewItem = ({list_id}:{list_id: string}) => {
  const createItemWithListId = createItem.bind(null, list_id);
  return (
    <form action={createItemWithListId}>
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
        />
        <Checkbox name='is_checked'/>
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
