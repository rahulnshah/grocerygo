import { fetchList, fetchTopKFrequentLists, fetchTotalNumberOfLists } from '@/app/lib/data';
import ListGrid from '@/app/ui/other/ListGrid';
import TopKListsSearch from '@/app/ui/notebook/TopKListsSearch';
import AddNewListForm from '@/app/ui/other/AddNewListForm';
import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';

export default async function NotebookPage({
  searchParams,
}: {
  searchParams?: {
    topk?: string;
  };
}) {
  const session = await auth();
  if (!session?.user?.id) return null;

  const totalLists = await fetchTotalNumberOfLists(session.user.id);
  const params = await searchParams;
  const lists = params?.topk 
    ? await fetchTopKFrequentLists(Number(params.topk), session.user.id)
    : await fetchList(session.user.id);

  return (
    <div className="flex justify-between p-6">
      <div className="w-3/5">
        <TopKListsSearch totalLists={totalLists} />
        <ListGrid lists={lists} />
      </div>
      <div className="w-1/4">
      <SessionProvider><AddNewListForm /></SessionProvider>
      </div>
    </div>
  );
}