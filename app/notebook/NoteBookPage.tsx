"use client";
import ListGrid from '../ui/other/ListGrid';
import AddNewListForm from '../ui/other/AddNewListForm';

const NotebookPage = ({ user_id, username }: { user_id: string; username: string }) => {
  return (
    <div className="flex justify-between p-6">
      <div className="w-3/5">
        <h1 className="text-3xl font-bold text-center mb-4">Hello {username}!</h1>
        <ListGrid user_id={user_id} />
      </div>
      <div className="w-1/4">
        <AddNewListForm />
      </div>
    </div>
  );
};

export default NotebookPage;
