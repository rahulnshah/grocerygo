import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ToBuyItem = ({ title }: { title: string}) => {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      padding: 2,
      borderRadius: 1,
      boxShadow: 1,
      backgroundColor: 'white',
      mt: 2
    }}>
      <Box sx={{ flex: 1 }}>
        <Typography variant="body1" sx={{ color: '#ED9121' }}>{title}</Typography>
        {/* <Typography variant="body2">{subtitle}</Typography> */}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="body2" sx={{ mr: 1 }}>You</Typography>
        <IconButton>
          <EditIcon />
        </IconButton>
        <IconButton>
          <DeleteIcon />
        </IconButton>
        <IconButton>
          <CheckCircleIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ToBuyItem;
