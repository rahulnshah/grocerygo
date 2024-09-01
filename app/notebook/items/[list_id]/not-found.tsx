import Link from 'next/link';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
 
export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <SentimentDissatisfiedIcon/>
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