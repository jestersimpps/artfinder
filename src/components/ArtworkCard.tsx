import Image from 'next/image';
import { useState, useCallback } from 'react';
import ImageModal from './ImageModal';

interface ArtworkCardProps {
  title: string;
  artist: string;
  year: string;
  imageUrl: string;
  description: string;
}

export default function ArtworkCard({ title, artist, year, imageUrl, description }: ArtworkCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleImageLoad = useCallback(() => {
    setIsImageLoading(false);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div 
        className="relative w-full h-64 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        {isImageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <Image
          src={imageUrl}
          alt={title}
          fill
          className={`object-cover hover:opacity-90 transition-opacity ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={handleImageLoad}
        />
      </div>
      <ImageModal
        imageUrl={imageUrl}
        alt={title}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-1">Artist: {artist}</p>
        <p className="text-gray-600 dark:text-gray-300 mb-2">Year: {year}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
    </div>
  );
}
