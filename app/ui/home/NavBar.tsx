'use client';
import Link from 'next/link'; // Import Link from next/link
import { usePathname } from 'next/navigation'; // Import usePathname
const Navbar = () => {
  const pathname = usePathname(); // Get the current pathname

  // Helper function to determine if a link is active
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-[#5B3A29] text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md ${
                isActive('/') ? 'text-primary' : 'hover:text-primary'
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`px-3 py-2 rounded-md ${
                isActive('/about') ? 'text-primary' : 'hover:text-primary'
              }`}
            >
              About
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login" 
            className={`px-3 py-2 rounded-md ${
                isActive('/login') ? 'text-primary' : 'hover:text-primary'
              }`}>
              Log in
            </Link>
            <Link href="/signup"  className={`px-3 py-2 rounded-md ${
                isActive('/signup') ? 'text-primary' : 'hover:text-primary'
              }`}>
              Sign up
            </Link>
          </div>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
