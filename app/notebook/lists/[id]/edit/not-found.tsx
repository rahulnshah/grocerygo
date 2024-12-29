import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-2">
      <span className="text-4xl">😞</span>
      <h2 className="text-xl font-semibold text-gray-800">404 Not Found</h2>
      <p className="text-gray-600">Could not find the requested list.</p>
      <Link
        href="/notebook"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        Go Back
      </Link>
    </main>
  );
}
