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
import SignInWithGithub from '../ui/login/SignInWithGithub';
import { authenticate } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import {useFormStatus} from "react-dom";

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
}));

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const initialState: any = { message: null, errors: {} };
  const [state, action] = useFormState(authenticate, initialState);
  const data = useFormStatus();
  // const handleSubmit = (event: { preventDefault: () => void; }) => {
  //   event.preventDefault();
  //   // Handle login logic here
  //   console.log('Email:', email);
  //   console.log('Password:', password);
  //   console.log('Keep me signed in:', keepSignedIn);
  // };

  return (
    <>
      <Navbar />
      <StyledBox>
        <Typography variant="h4" component="h2" gutterBottom sx={{ color: 'black' }}>
          Log in to GroceryGo
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Social login buttons */}
          <SignInWithGithub />
        </Box>
        <Typography variant="body2" align="center" sx={{ mt: 2, color: 'black' }}>
          OR
        </Typography>
        <form action={action}>
          <Box sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email address"
              name="email"
              autoComplete="email"
              sx={{ color: 'black' }}
              error={!!state.errors?.name}
              helperText={state.errors?.email?.[0] || ''}
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Your password"
              type='password'
              id="password"
              autoComplete="current-password"
              sx={{ color: 'black' }}
              error={!!state.errors?.name}
              helperText={state.errors?.password?.[0] || ''}
            />
            {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
              <Checkbox
                checked={keepSignedIn}
                onChange={(e) => setKeepSignedIn(e.target.checked)}
                inputProps={{ 'aria-label': 'controlled' }}
                sx={{ color: 'black' }}
              />
              <Link href="/forgot-password" sx={{ color: 'black' }}>Forget your password?</Link>
            </Box> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, color: 'black' }}
              disabled={data.pending}
            >
              Log in
            </Button>
            <Link href="/sign-up" sx={{ color: 'black' }}>Don&apos;t have an account? Sign up</Link>
          </Box>
        </form>
      </StyledBox>
    </>
  );
}

export default LoginPage;
