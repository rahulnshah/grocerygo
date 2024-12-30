'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChartBarIcon } from '@heroicons/react/24/outline';

interface Props {
  totalLists: number;
}

export default function TopKListsSearch({ totalLists }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSelect = (k: string) => {
    const params = new URLSearchParams(searchParams);
    if (k) {
      params.set('topk', k);
    } else {
      params.delete('topk');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative flex items-center">
      <ChartBarIcon className="absolute left-3 h-5 w-5 text-gray-500 z-10" />
      <select
        defaultValue={searchParams.get('topk')?.toString() || ''}
        onChange={(e) => handleSelect(e.target.value)}
        className="pl-10 pr-3 py-2 w-64 rounded-md border border-gray-300 
                 bg-white appearance-none cursor-pointer
                 focus:outline-none focus:ring-2 focus:ring-orange-500"
      >
        <option value="">Show all lists</option>
        {[...Array(totalLists + 1)].map((_, i) => (
          <option key={i} value={i}>
            Show top {i} lists by item count
          </option>
        ))}
      </select>
    </div>
  );
} 