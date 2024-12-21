import { ReactNode } from 'react';
import Navbar from '../ui/notebook/NavBar';

const NotebookLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4">
        <div className="pt-8">{children}</div>
      </div>
    </div>
  );
};

export default NotebookLayout;
