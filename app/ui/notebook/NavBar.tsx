'use client';
import { signOut } from '@/auth';
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
          <Link href="/notebook">
            <Button color={isActive('/notebook') ? 'secondary' : 'inherit'}>Home</Button>
          </Link>
          <Link href="/notebook/saved">
            <Button color={isActive('/notebook/saved') ? 'secondary' : 'inherit'}>Saved</Button>
          </Link>
          <Link href="/notebook/shared">
            <Button color={isActive('/notebook/shared') ? 'secondary' : 'inherit'}>Shared</Button>
          </Link>
        </Box>
        <form action={async () => {
          'use server';
          await signOut();
        }}>
          <Button color="inherit">Log out</Button>
        </form>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
