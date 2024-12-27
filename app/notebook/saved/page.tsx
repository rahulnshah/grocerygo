// app/notebook/page.tsx
import { fetchFavoriteLists } from '@/app/lib/data';
import ListCard from '@/app/ui/other/ListCard';

const SavedPage = async () => {
  const lists = await fetchFavoriteLists();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
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
