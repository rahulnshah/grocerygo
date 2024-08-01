import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface EditItemProps {
  item: {
    name: string;
    description: string;
  };
  onUpdate: (updatedItem: { name: string; description: string }) => void;
  onClose: () => void;
}

const EditItem: React.FC<EditItemProps> = ({ item, onUpdate, onClose }) => {
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);

  const handleUpdate = () => {
    onUpdate({ name, description });
    onClose();
  };

  return (
    <Box
      sx={{
        padding: 2,
        backgroundColor: '#fff',
        borderRadius: 8,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h6" component="h2">
        Edit Item
      </Typography>
      <TextField
        label="Item name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        multiline
        rows={4}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleUpdate}
      >
        Update
      </Button>
    </Box>
  );
};

export default EditItem;
