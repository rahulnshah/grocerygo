// import Image from "next/image";
import { Box, Container, Typography, Button } from '@mui/material';
import Navbar from './ui/home/NavBar';
export default function Home() {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
      <Box sx={{ display: 'flex',  marginLeft: '6rem', flexDirection: 'column', alignItems: 'left', justifyContent: 'center', height: '100vh' }}>
        <Typography variant="h3" color="black" component="h1" gutterBottom>
          GroceryGo
        </Typography>
        <Typography variant="h5" color="black">
          Say goodbye to forgotten items and disorganized lists. <br></br>Our app ensures you have everything you need,<br></br>right when you need it!
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
        <Button variant="contained" color="primary">
          Sign up for free
        </Button>
          {/* App Store button */}
          {/* Google Play button */}
        </Box>
      </Box>
      </Container>
    </>
  );
}
