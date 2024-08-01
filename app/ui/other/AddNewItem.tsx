import React from 'react';
import { Box, TextField, Button, Typography, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

const AddNewItem = () => {
  return (
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
        fullWidth
        sx={{ mt: 2 }}
      />
      <TextField
        label="Description"
        variant="outlined"
        multiline
        rows={4}
        fullWidth
        sx={{ mt: 2 }}
      />
      <Button
        variant="contained"
        sx={{ mt: 2, backgroundColor: '#ED9121', color: 'white' }}
        fullWidth
      >
        Add
      </Button>
    </Box>
  );
};

export default AddNewItem;
