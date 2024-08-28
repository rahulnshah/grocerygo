import { fetchListById } from '@/app/lib/data';
import EditListForm from '@/app/ui/list/EditListForm';

// interface EditItemProps {
//   item: {
//     name: string;
//     description: string;
//   };
//   onUpdate: (updatedItem: { name: string; description: string }) => void;
//   onClose: () => void;
// }

const EditList = async ({ params }: { params: { id: string } }) => {
  const list = await fetchListById(params.id);
  return (
    <EditListForm list={list}/>
  );

};

export default EditList;
