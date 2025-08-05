'use client';

import { useState } from 'react';
import Link from 'next/link';
import { destinations } from '../data/destinations';
// Removed unused useRouter import
import { Button } from '@/components/ui/button';

export default function ExplorePage() {
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  // Removed unused router variable

  const filtered = destinations.filter(dest => {
    const matchSearch = dest.name.toLowerCase().includes(search.toLowerCase());
    const matchTag = selectedTag ? dest.tags.includes(selectedTag) : true;
    return matchSearch && matchTag;
  });

  // Removed unused handlePlanTrip function

  const uniqueTags: string[] = Array.from(
    new Set(destinations.flatMap(d => d.tags))
  );

  return (
    <div className="px-4 sm:px-6 md:px-10 py-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">🌍 Explore Destinations</h1>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or continent..."
          className="w-full sm:w-1/2 px-4 py-2 border rounded-xl shadow-sm"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select
          className="w-full sm:w-1/3 px-4 py-2 border rounded-xl shadow-sm"
          value={selectedTag}
          onChange={e => setSelectedTag(e.target.value)}
        >
          <option value="">Filter by Tag</option>
          {uniqueTags.map(tag => (
            <option key={tag} value={tag}>
              {tag[0].toUpperCase() + tag.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">No destinations found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((dest, idx) => (
            <div
              key={idx}
              className="flex flex-col bg-white rounded-2xl shadow-md hover:shadow-lg transition-all overflow-hidden"
            >
              <img
                src={dest.image || 'https://via.placeholder.com/300x200?text=No+Image'}
                alt={dest.name}
                className="w-full h-44 sm:h-48 md:h-56 object-cover"
              />

              <div className="p-4 flex flex-col flex-1">
                <h2 className="text-xl font-semibold">{dest.name}</h2>
                <p className="text-sm text-gray-600 mb-2">{dest.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {dest.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-200 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Button
                  className="bg-rose-500 hover:bg-rose-600 text-white rounded-xl mt-auto w-full sm:w-auto"
                  asChild
                >
                  <Link
                    href={{
                      pathname: "/",
                      query: {
                        destination: dest.name,
                        interests: dest.tags.join(","),
                      },
                    }}
                  >
                    Plan a Trip
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
