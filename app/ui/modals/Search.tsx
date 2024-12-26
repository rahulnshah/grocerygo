'use client';

import { useSearchParams } from 'next/navigation';

export default function Search({ placeholder }: { placeholder: string }) {
    const searchParams = useSearchParams();

    function handleSearch(term: string) {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
    }
    return (
        <div className="mb-4">
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <input
                type="text"
                placeholder={placeholder}
                className="w-full p-2 border rounded-lg"
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
                defaultValue={searchParams.get('query')?.toString()}
            />
        </div>
    );
}