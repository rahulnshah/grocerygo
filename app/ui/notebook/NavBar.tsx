import { AppBar, Toolbar, Box, Button } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: '#5B3A29' }}>
      <Toolbar>
        <Box display="flex" alignItems="center" flexGrow={1}>
          <Button color="inherit">Home</Button>
          <Button color="inherit">Saved</Button>
          <Button color="inherit">Shared</Button>
        </Box>
        <Button color="inherit">Log out</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;