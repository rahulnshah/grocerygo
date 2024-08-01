import { Box, Container, CssBaseline, ThemeProvider } from '@mui/material';
import { ReactNode } from 'react';
import theme from '../../theme';
import Navbar from '../ui/notebook/NavBar';

const NotebookLayout = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
        <Container>
          <Box pt={2}>
            {children}
          </Box>
        </Container>
    </ThemeProvider>
  );
};

export default NotebookLayout;