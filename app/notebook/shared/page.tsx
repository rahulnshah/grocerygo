import { auth } from '@/auth';
import ListCard from '@/app/ui/other/ListCard';
import { fetchSharedLists } from '@/app/lib/data';

export default async function SharedPage() {
  const session = await auth();
  if (!session?.user) return null;

  const sharedLists = await fetchSharedLists(session.user.id);

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {sharedLists.map((list) => (
          <ListCard
            key={list.id}
            title={list.name}
            description={list.description}
            list_id={list.id}
            owner_name={list.user_id}
          />
        ))}
      </div>
    </div>
  );
}