// app/notebook/page.tsx
import { Box, Typography } from '@mui/material';
import ListGrid from '../ui/other/ListGrid';
import AddNewList from '../ui/other/AddNewList';

const NotebookPage = () => {
  return (<Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 4 }}>
      <Box sx={{ width: '60%' }}>
        <Typography variant="h1" align="center">Hello Rahul!</Typography>
        <ListGrid />
      </Box>
      <Box sx={{ width: '35%' }}>
        <AddNewList />
      </Box>
    </Box>
  );
};


export default NotebookPage;
