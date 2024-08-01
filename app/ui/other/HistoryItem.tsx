import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const HistoryItem = ({ headline }: { headline: string }) => {
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
        <Typography variant="body2" color="textSecondary">30 mins ago</Typography>
        <Typography variant="h6">{headline}</Typography>
      </Box>
      <Button variant="contained" sx={{ backgroundColor: '#ED9121', color: 'white' }}>Add</Button>
    </Box>
  );
};

export default HistoryItem;
