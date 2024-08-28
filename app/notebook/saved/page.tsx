// app/notebook/page.tsx
import { Box, Typography } from '@mui/material';
import { fetchFavoriteLists } from '@/app/lib/data';
import ListCard from '@/app/ui/other/ListCard';

const SavedPage = async () => {
  const lists = await fetchFavoriteLists();
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
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

export default SavedPage;
