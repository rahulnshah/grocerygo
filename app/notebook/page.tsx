// app/notebook/page.tsx
"use client"
import { Box, Typography } from '@mui/material';
import ListGrid from '../ui/other/ListGrid';
import AddNewListForm from '../ui/other/AddNewListForm';
import { useSession } from "next-auth/react"

const NotebookPage = () => {
  const { data: session, status } = useSession()
  return (<Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 4 }}>
      <Box sx={{ width: '60%' }}>
        <Typography variant="h1" align="center">Hello {session?.user?.name!}!</Typography>
        <ListGrid user_id={session?.user?.id!}/>
      </Box>
      <Box sx={{ width: '25%' }}>
        <AddNewListForm />
      </Box>
    </Box>
  );
};


export default NotebookPage;
