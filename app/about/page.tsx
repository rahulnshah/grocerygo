import { Box, Typography, Container, Card, CardContent } from '@mui/material';
import Navbar from '../ui/home/NavBar';

export default function About() {
    return (
        <>
            <Navbar />
            <Container maxWidth="lg">
                <Box>
                    <Typography variant="h3" color="black" component="h1" align="center" gutterBottom>
                        About GroceryGo
                    </Typography>
                    <Typography variant="h5" align="left" color="black">
                        Welcome to GroceryGo, your new favorite companion for seamless shopping! Our app transforms the mundane task of grocery shopping into an effortless and delightful experience. With smart lists, instant sharing, and personalized recommendations, GroceryGo ensures you never miss an item or a deal. Whether you&apos;re planning a cozy family dinner or stocking up for a big party, GroceryGo has got you covered with style and ease. Happy shopping!
                    </Typography>
                    {/* Add sections for how it works, team, values, etc. */}
                    <br />
                    <Typography variant="h4" component="h2" align="center" color="black" gutterBottom>
                        What GroceryGo Offers
                    </Typography>
                    <br />
                    <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Card sx={{ maxWidth: 300, margin: 2 }}>
                            <CardContent>
                                <Typography variant="h5" component="h2" gutterBottom>
                                    Browse and select
                                </Typography>
                                <Typography variant="body2">
                                    Easily find your favorite lists and add them to your cart.
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{ maxWidth: 300, margin: 2 }}>
                            <CardContent>
                                <Typography variant="h5" component="h2" gutterBottom>
                                    Collaborate with ease
                                </Typography>
                                <Typography variant="body2">
                                Shared lists that multiple users can edit in real-time.  Assign items to specific users.
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{ maxWidth: 300, margin: 2 }}>
                            <CardContent>
                                <Typography variant="h5" component="h2" gutterBottom>
                                    Scheduled delievery
                                </Typography>
                                <Typography variant="body2">
                                    Get notified of commonly forgotten items based on your past shopping history.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                    {/* Add more sections as needed */}
                </Box>
            </Container>
        </>
    );
}