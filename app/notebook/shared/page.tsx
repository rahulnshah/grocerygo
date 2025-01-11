import { auth } from '@/auth';
import ListCard from '@/app/ui/other/ListCard';
import { fetchSharedLists, getAssignedItemsCount } from '@/app/lib/data';
import AssignedItemsNotification from '@/app/ui/notifications/AssignedItemsNotification';
import { Suspense } from 'react';
import ListCardSkeleton from '@/app/ui/other/ListCardSkeleton';
export default async function SharedPage() {
  const session = await auth();
  if (!session?.user) return null;

  const sharedLists = await fetchSharedLists(session.user.id);
  const assignedCount = await getAssignedItemsCount(session?.user?.id || '');

  return (
    <>
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
          {sharedLists.map((list) => (
            <Suspense key={list.id} fallback={<ListCardSkeleton />}>
              <ListCard
                key={list.id}
                title={list.name}
                description={list.description}
                list_id={list.id}
                user_id={list.user_id}
              />
            </Suspense>
          ))}
        </div>
      </div>
      <AssignedItemsNotification count={assignedCount} />
    </>
  );
}