import React from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';

function RestaurantSearch() {
  return (
    <div class="relative mt-5 mx-5">
      <label for="inputSearch" class="sr-only">
        Search
      </label>
      <input
        id="inputSearch"
        type="text"
        placeholder="Wyszukaj..."
        class="block w-64 rounded-lg border dark:border-none dark:bg-neutral-600 py-2 pl-8 pr-4 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
      />
      <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transform">
        <FaMagnifyingGlass className="h-3 w-3 text-neutral-500 dark:text-neutral-200"></FaMagnifyingGlass>
      </span>
    </div>
  );
}

export default RestaurantSearch;
