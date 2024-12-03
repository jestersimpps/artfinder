'use client';
import { useState } from 'react';
import ArtworkCard from '@/components/ArtworkCard';
import { searchArtworks } from '@/lib/artworkService';
import type { ArtworkResponse } from '@/lib/artworkService';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [artworks, setArtworks] = useState<ArtworkResponse[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const results = await searchArtworks(searchQuery);
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
        <h1 className="text-4xl font-bold text-center mb-8">Art Search</h1>
        
        <form onSubmit={handleSearch} className="mb-12">
          <div className="flex gap-4 max-w-2xl mx-auto">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Describe the artwork you're looking for..."
                className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>
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
            artworks.map((artwork, index) => (
              <ArtworkCard
                key={artwork.id || `artwork-${index}`}
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
