import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Item } from '../../../lib/definitions';
import { Box, CircularProgress } from '@mui/material';
import ToBuyItem from '../../../ui/other/ToBuyItem';
import { fetchItems } from '@/app/lib/data';
import AddNewItem from '@/app/ui/other/AddNewItem';

export default async function ItemsPage({ params }: { params: { list_id: string } }) {

  // const params = useParams();
  // const list_id = params.listId;
  // const [items, setItems] = useState<Item[]>([]);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   const getItems = async () => {
  //     try {
  //       let response = await fetch(`/api/lists/${list_id}/items`);
  //       const fetchedItems = await response.json();
  //       setItems(fetchedItems);
  //     } catch (error) {
  //       console.error('Error fetching lists:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   getItems();
  // }, []);
  const items = await fetchItems(params.list_id);
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 4 }}>
      <Box sx={{ width: '60%' }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 2,
            width: '50%',
          }}
        >
          {(
            items.map((item) => (
              <ToBuyItem
                key={item.id}
                item={item}
              />
            ))
          )}
        </Box>
      </Box>
      <Box sx={{ width: '35%' }}>
        <AddNewItem list_id={params.list_id}/>
      </Box>
    </Box>
  );
}