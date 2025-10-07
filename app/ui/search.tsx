'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // 1. Declare the logic that updates the URL
  const updateUrl = (term: string) => {
    console.log(`Searching... ${term}`);
    const params = new URLSearchParams(searchParams);
     params.set('page', '1');

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    // Navigate to the new URL
    replace(`${pathname}?${params.toString()}`);
  };

  // 2. Wrap the URL update logic with useDebouncedCallback
  const handleSearch = useDebouncedCallback(updateUrl, 300); // 300ms debounce

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        // Call the debounced function on change
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        // Set the default value from the URL's 'query' search parameter
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}