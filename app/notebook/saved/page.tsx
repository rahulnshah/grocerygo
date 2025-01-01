// app/notebook/page.tsx
import { fetchFavoriteLists } from '@/app/lib/data';
import ListCard from '@/app/ui/other/ListCard';
import { auth } from '@/auth';
const SavedPage = async () => {
  const session = await auth();
  const owner_id = session?.user?.id;
  if (!owner_id) {
    return <div>Please log in to view your saved lists.</div>;
  }
  const lists = await fetchFavoriteLists(owner_id);
  console.log("Lists are ", lists);
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
