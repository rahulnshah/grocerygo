"use client"
import Link from 'next/link'; // Import Link from next/link
import { usePathname } from 'next/navigation'; // Import usePathname
export default function AllLinks() {
    const pathname = usePathname(); // Get the current pathname

    // Helper function to determine if a link is active
    const isActive = (path: string) => pathname === path;
    return (
        <>
            <Link
                href="/notebook"
                className={`${isActive('/notebook') ? 'text-primary' : 'text-white'
                    } hover:text-primary`}
            >
                Home
            </Link>
            <Link
                href="/notebook/saved"
                className={`${isActive('/notebook/saved') ? 'text-primary' : 'text-white'
                    } hover:text-primary`}
            >
                Saved
            </Link>
            <Link
                href="/notebook/shared"
                className={`${isActive('/notebook/shared') ? 'text-primary' : 'text-white'
                    } hover:text-primary`}
            >
                Shared
            </Link>
        </>
    );
}