import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import   
 TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';   

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';   

import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',   

  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundImage: `url('path/to/your/notebook-background.jpg')`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  padding: theme.spacing(4),
  borderRadius: 16,
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
}));

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');   

  const [keepSignedIn, setKeepSignedIn] = useState(false);

  const   
 handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    // Handle login logic here
    console.log('Email:', email);
    console.log('Password:', password);   

    console.log('Keep me signed in:', keepSignedIn);
  };

  return (
    <StyledBox>
      <Typography variant="h4" component="h2" gutterBottom>
        Log in to GroceryGo
      </Typography>
      {/* <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}> */}
        {/* Social login buttons */}
        <Button
          variant="contained"
          fullWidth
          color="primary"
          startIcon={<FacebookIcon />}
        >
          Continue with Facebook
        </Button>
        <Button
          variant="contained"
          fullWidth
          color="primary"
          startIcon={<GoogleIcon />}
        >
          Continue with Google
        </Button>
        <Button
          variant="contained"
          fullWidth
          color="primary"
          startIcon={<AppleIcon />}
        >
          Continue with Apple
        </Button>
      </Box>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
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

          InputProps={{
            endAdornment: (
              <IconButton   

                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={(event) => event.preventDefault()}
              >
                {showPassword ? <VisibilityOff   
 /> : <Visibility />}
              </IconButton>   

            ),
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Checkbox
            checked={keepSignedIn}
            onChange={(e) => setKeepSignedIn(e.target.checked)}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          <Link href="/forgot-password">Forget your password?</Link>
        </Box>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Log in
        </Button>
        <Link href="/sign-up">Don't have an account? Sign up</Link>
      </Box>
    </StyledBox>
  );
}

export default LoginPage;
