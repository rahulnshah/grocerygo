import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from
    '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Navbar from '../ui/home/NavBar';

// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';   


function SignUpPage() {
    return (
        <>
            <Navbar />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '50%', // Adjust width as needed
                    alignItems: 'center',
                    color: "black",
                    backgroundColor: "white",
                    position: 'relative',
                    p: 4, // Add 
                    height: '100vh', // Full viewport height
                }}
            >
                <Typography component="h1" variant="h5">
                    Welcome to GroceryGo
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Typography
                        variant="body2" sx={{ mt: 1 }}>
                        - At least 8 characters <br />
                        - One uppercase character <br />
                        - One lowercase character <br />
                        - One special character <br />
                        - One number
                    </Typography>
                    <Checkbox
                        sx={{ mt: 3 }}
                        color="primary"
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        I want to receive emails about the product, feature updates, events, and
                        marketing promotions.
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        By creating an account, you agree to the Terms of use and Privacy Policy.
                    </Typography>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Create an account
                    </Button>
                    <Typography variant="body2" align="center">
                        Already have an account? <Button variant="text">Login</Button>
                    </Typography>
                </Box>
            </Box>
        </>
    );
}

export default SignUpPage;
