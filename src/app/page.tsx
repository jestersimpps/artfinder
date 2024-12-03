'use client';
import { useState } from 'react';
import ArtworkCard from '@/components/ArtworkCard';
import { mockApiCall } from '@/lib/mockData';
import type { Artwork } from '@/lib/mockData';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [artworks, setArtworks] = useState<Artwork[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const results = await mockApiCall(searchQuery);
      setArtworks(results);
    } catch (error) {
      console.error('Error fetching artworks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Art Explorer</h1>
        
        <form onSubmit={handleSearch} className="mb-12">
          <div className="flex gap-4 max-w-2xl mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Describe the artwork you're looking for..."
              className="flex-1 p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-full text-center">Loading...</div>
          ) : artworks.length > 0 ? (
            artworks.map((artwork) => (
              <ArtworkCard
                key={artwork.id}
                title={artwork.title}
                artist={artwork.artist}
                year={artwork.year}
                imageUrl={artwork.imageUrl}
                description={artwork.description}
              />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              Enter a description to search for artworks
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
