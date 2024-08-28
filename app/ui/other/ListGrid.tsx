// components/ListGrid.tsx
// "use client"
import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import ListCard from './ListCard';
import { fetchList } from '../../lib/data'

const ListGrid = async () => {
//   const [lists, setLists] = useState<List[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getLists = () => {
//       fetch('/api/lists')
//       .then(res => res.json())
//       .then(fetchedLists => setLists(fetchedLists))
//       .catch(error => console.error('Error fetching items:', error))
//       .finally(() => setLoading(false));
//     };
//     getLists();
//   }, []);

  const lists = await fetchList();
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 2,
        width: '50%',
      }}
    >
    {(
        lists.map((list) => (
          <ListCard
            key={list.id}
            title={list.name}
            description={list.description}
            list_id={list.id}
          />
        ))
      )}
    </Box>
  );
};

export default ListGrid;
