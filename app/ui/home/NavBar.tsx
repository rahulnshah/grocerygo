'use client';
import { AppBar, Toolbar, Box, Button } from '@mui/material';
import Link from 'next/link'; // Import Link from next/link
import { usePathname } from 'next/navigation'; // Import usePathname

const Navbar = () => {

  const pathname = usePathname(); // Get the current pathname

  // Helper function to determine if a link is active
  const isActive = (path: string) => pathname === path;

  return (
    <AppBar position="static" style={{ backgroundColor: '#5B3A29' }}>
      <Toolbar>
        <Box display="flex" alignItems="center" flexGrow={1}>
          <Link href="/">
            <Button color={isActive('/') ? 'secondary' : 'inherit'}>Home</Button>
          </Link>
          <Link href="/about">
            <Button color={isActive('/about') ? 'secondary' : 'inherit'}>About</Button>
          </Link>
        </Box>
        <Link href="/login">
            <Button color="inherit">Log in</Button>
        </Link>
        <Link href="/signup">
            <Button color="inherit">Sign up</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
