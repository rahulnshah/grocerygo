import Link from "next/link";

export function ShareList({ id }: { id: string }) {
    return (
        <Link href={`/notebook/lists/share-modal/${id}`} className="p-2 text-orange-500 hover:bg-orange-100 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
    );
}  