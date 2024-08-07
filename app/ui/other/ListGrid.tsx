// components/ListGrid.tsx
// "use client"
// import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import ListCard from './ListCard';
import { fetchList, fetchCheckedItemsById } from '../../lib/data'; // Adjust the import path as needed
import { List, CheckedItemsCount } from '../../lib/definitions';

const ListGrid = async () => {
  // const [lists, setLists] = useState<List[]>([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const getLists = async () => {
  //     try {
  //       const fetchedLists = await fetchList();
  //       setLists(fetchedLists);
  //     } catch (error) {
  //       console.error('Error fetching lists:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   getLists();
  // }, []);
  const lists = await fetchList();

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 2,
        width: '50%',
      }}
    >
      {
      /* {loading ? (
        <CircularProgress />
      ) : */
        lists?.map((list) => (
          <ListCard
            key={list.id}
            title={list.name}
            list_id={list.id}
          />
        ) || <CircularProgress />)
      }
    </Box>
  );
};

export default ListGrid;
