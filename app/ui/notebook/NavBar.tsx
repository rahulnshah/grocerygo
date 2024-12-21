'use client';
import Link from 'next/link'; // Import Link from next/link
import { usePathname } from 'next/navigation'; // Import usePathname
import LogOutButton from '../logout/LogOutButton';
const Navbar = () => {
  const pathname = usePathname(); // Get the current pathname

  // Helper function to determine if a link is active
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-[#5B3A29]">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <Link
            href="/notebook"
            className={`${
              isActive('/notebook') ? 'text-secondary' : 'text-white'
            } hover:text-gray-200`}
          >
            Home
          </Link>
          <Link
            href="/notebook/saved"
            className={`${
              isActive('/notebook/saved') ? 'text-secondary' : 'text-white'
            } hover:text-gray-200`}
          >
            Saved
          </Link>
          <Link
            href="/notebook/shared"
            className={`${
              isActive('/notebook/shared') ? 'text-secondary' : 'text-white'
            } hover:text-gray-200`}
          >
            Shared
          </Link>
        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;
