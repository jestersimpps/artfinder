export interface Artwork {
  id: string;
  title: string;
  artist: string;
  year: string;
  imageUrl: string;
  description: string;
}

export const mockArtworks: Artwork[] = [
  {
    id: '1',
    title: 'The Starry Night',
    artist: 'Vincent van Gogh',
    year: '1889',
    imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262',
    description: 'A night scene showing a swirling sky over a village with a prominent church spire.'
  },
  {
    id: '2',
    title: 'The Persistence of Memory',
    artist: 'Salvador Dalí',
    year: '1931',
    imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642',
    description: 'Surrealist landscape featuring melting clocks draped over various objects.'
  },
  {
    id: '3',
    title: 'The Scream',
    artist: 'Edvard Munch',
    year: '1893',
    imageUrl: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19',
    description: 'Expressionist painting showing a figure with an agonized expression against a landscape.'
  }
];

export const mockApiCall = async (query: string): Promise<Artwork[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  return mockArtworks;
};
