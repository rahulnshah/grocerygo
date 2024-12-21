// app/notebook/page.tsx
import { fetchFavoriteLists } from '@/app/lib/data';
import ListCard from '@/app/ui/other/ListCard';

const SavedPage = async () => {
  const lists = await fetchFavoriteLists();
  return (
    <div className="grid grid-cols-4 gap-4 w-1/2">
      {lists.map((list) => (
        <ListCard
          key={list.id}
          title={list.name}
          description={list.description}
          list_id={list.id}
        />
      ))}
    </div>
  );
};

export default SavedPage;
