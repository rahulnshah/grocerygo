import Link from 'next/link';
import { FaceFrownIcon } from '@heroicons/react/24/solid';

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <FaceFrownIcon className="h-16 w-16 text-gray-500" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the requested list.</p>
      <Link
        href="/notebook"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        Go Back
      </Link>
    </main>
  );
}
