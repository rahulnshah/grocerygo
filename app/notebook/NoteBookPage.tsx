import ListGrid from '../ui/other/ListGrid';
import AddNewListForm from '../ui/other/AddNewListForm';
import { SessionProvider } from 'next-auth/react';

const NotebookPage = ({ user_id, username }: { user_id: string; username: string }) => {
  return (
    <div className="flex justify-between p-6">
      <div className="w-3/5">
        <ListGrid user_id={user_id} />
      </div>
      <div className="w-1/4">
      <SessionProvider><AddNewListForm /></SessionProvider>
      </div>
    </div>
  );
};

export default NotebookPage;
