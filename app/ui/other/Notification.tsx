import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

interface ItemCountNotificationProps {
  itemCount: number;
  onDismiss: () => void;
}

const ItemCountNotification: React.FC<ItemCountNotificationProps> = ({
  itemCount,
  onDismiss,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ED9121',
        borderRadius: 8,
        padding: 2,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="body1" component="p">
        {itemCount} items assigned to You
      </Typography>
      <Button variant="contained" color="primary" onClick={onDismiss}>
        Dismiss
      </Button>
    </Box>
  );
};

export default ItemCountNotification;
