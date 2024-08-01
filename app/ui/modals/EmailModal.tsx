import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


const EmailModal = ({ isOpen } : {isOpen : boolean }) => {
  const [email, setEmail] = useState('');

  const handleClose = () => {
    /*handleClode logic here */
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = () => {
    // Handle sending email logic here
    console.log('Email:', email);
    handleClose();
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
        visibility: isOpen ? 'visible' : 'hidden',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          borderRadius: 8,
          padding: 4,
          width: '300px',
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" component="h2">
          Email &quot;Grocery Shopping List&quot;
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Join thousands getting emails in their inbox.
        </Typography>
        <TextField
          fullWidth
          label="To"
          value={email}
          onChange={handleEmailChange}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
        >
          Send it!
        </Button>
        <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
          <CloseIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default EmailModal;