export interface ArtworkResponse {
  id: string;
  title: string;
  artist: string;
  year: string;
  imageUrl: string;
  description: string;
}

export async function searchArtworks(query: string): Promise<ArtworkResponse[]> {
  try {
    const response = await fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch artworks');
    }

    const data = await response.json();
    return data.artworks;
  } catch (error) {
    console.error('Error searching artworks:', error);
    throw error;
  }
}
