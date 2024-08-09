"use client"
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Item } from '../../../lib/definitions';
import { Box, CircularProgress } from '@mui/material';
import ToBuyItem from '../../../ui/other/ToBuyItem';

export default function ItemsPage() {
  const params = useParams();
  const list_id = params.listId;
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getItems = async () => {
      try {
        let response = await fetch(`/api/lists/${list_id}/items`);
        const fetchedItems = await response.json();
        setItems(fetchedItems);
      } catch (error) {
        console.error('Error fetching lists:', error);
      } finally {
        setLoading(false);
      }
    };
    getItems();
  }, []);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 2,
        width: '50%',
      }}
    >
    {loading ? (
        <CircularProgress />
      ) : (
        items.map((item) => (
          <ToBuyItem
            key={item.id}
            title={item.name}
          />
        ))
      )}
    </Box>
  );
}