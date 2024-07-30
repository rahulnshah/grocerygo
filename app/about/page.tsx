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
                    <Typography variant="h5" align="center" color="black">
                        At GroceryGo, our mission is to revolutionize the way you shop for groceries. We believe that your time is precious, and you shouldn't have to spend hours navigating crowded aisles. That's why we've created a convenient and efficient platform that brings your favorite products right to your doorstep.
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
                                    Easily find your favorite products and add them to your cart.
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{ maxWidth: 300, margin: 2 }}>
                            <CardContent>
                                <Typography variant="h5" component="h2" gutterBottom>
                                    Schedule delivery
                                </Typography>
                                <Typography variant="body2">
                                    Choose a convenient delivery time that fits your schedule.
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{ maxWidth: 300, margin: 2 }}>
                            <CardContent>
                                <Typography variant="h5" component="h2" gutterBottom>
                                    Enjoy your groceries
                                </Typography>
                                <Typography variant="body2">
                                    Relax and enjoy your groceries delivered to your doorstep.
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