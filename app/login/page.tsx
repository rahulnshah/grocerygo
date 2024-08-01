"use client"
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Navbar from '../ui/home/NavBar';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
}));

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    // Handle login logic here
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Keep me signed in:', keepSignedIn);
  };

  return (
    <>
      <Navbar />
      <StyledBox>
        <Typography variant="h4" component="h2" gutterBottom sx={{ color: 'black' }}>
          Log in to GroceryGo
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Social login buttons */}
          <Button
            variant="contained"
            fullWidth
            color="primary"
            sx={{ color: 'black' }}
            // startIcon={<FacebookIcon />}
          >
            Continue with Facebook
          </Button>
          <Button
            variant="contained"
            fullWidth
            color="primary"
            sx={{ color: 'black' }}
            // startIcon={<GoogleIcon />}
          >
            Continue with Google
          </Button>
          <Button
            variant="contained"
            fullWidth
            color="primary"
            sx={{ color: 'black' }}
            // startIcon={<AppleIcon />}
          >
            Continue with Apple
          </Button>
        </Box>
        <Typography variant="body2" align="center" sx={{ mt: 2, color: 'black' }}>
          OR
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ color: 'black' }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Your password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ color: 'black' }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
            <Checkbox
              checked={keepSignedIn}
              onChange={(e) => setKeepSignedIn(e.target.checked)}
              inputProps={{ 'aria-label': 'controlled' }}
              sx={{ color: 'black' }}
            />
            <Link href="/forgot-password" sx={{ color: 'black' }}>Forget your password?</Link>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, color: 'black' }}
          >
            Log in
          </Button>
          <Link href="/sign-up" sx={{ color: 'black' }}>Don't have an account? Sign up</Link>
        </Box>
      </StyledBox>
    </>
  );
}

export default LoginPage;
