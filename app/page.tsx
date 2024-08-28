// import Image from "next/image";
// able to close PR #4
import { Box, Container, Typography, Button, Link } from '@mui/material';
import Navbar from './ui/home/NavBar';
export default function Home() {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', marginLeft: '6rem', flexDirection: 'column', alignItems: 'left', justifyContent: 'center', height: '100vh' }}>
          <Typography variant="h3" color="black" component="h1" gutterBottom>
            GroceryGo
          </Typography>
          <Typography variant="h5" color="black">
            Say goodbye to forgotten items and disorganized lists. <br></br>Our app ensures you have everything you need,<br></br>right when you need it!
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <Link href="/signup">
              <Button variant="contained" color="primary">
                Sign up for free
              </Button>
            </Link>
            {/* App Store button */}
            {/* Google Play button */}
          </Box>
        </Box>
      </Container>
    </>
  );
}
