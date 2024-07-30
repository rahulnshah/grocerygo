import { Box, Container, CssBaseline, ThemeProvider } from '@mui/material';
import { ReactNode } from 'react';
import theme from '../../theme';
import Navbar from '../ui/notebook/NavBar';
import bg from '../../public/notebook_paper.png';


const NotebookLayout = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Box
        sx={{
          position: 'relative',
          minHeight: '100vh',
          backgroundImage: `url(${bg.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Container>
          <Box pt={2}>
            {children}
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default NotebookLayout;