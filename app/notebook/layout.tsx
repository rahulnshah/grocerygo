import { ReactNode } from 'react';
import Navbar from '../ui/notebook/NavBar';
import { auth } from '@/auth';

const NotebookLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (!session?.user) return null;
  const owner_name = session?.user?.name || '';
  return (
    <div className="min-h-screen">
      <Navbar username={owner_name} />
      <div className="container mx-auto px-4">
        <div className="pt-8">{children}</div>
      </div>
    </div>
  );
};

export default NotebookLayout;
