import { fetchListById } from '@/app/lib/data';
import EditListForm from '@/app/ui/list/EditListForm';
import { notFound } from 'next/navigation';

const EditList = async ({ params }: { params: { id: string } }) => {
  const a = await params;
  const list = await fetchListById(a.id);

  if (!list) {
    notFound();
  }

  return <EditListForm list={list} />;
};

export default EditList;
