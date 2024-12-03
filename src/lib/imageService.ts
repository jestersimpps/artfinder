export async function getArtworkImage(query: string): Promise<string> {
  try {
    const response = await fetch(`/api/images?query=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch image');
    }

    const data = await response.json();
    return data.imageUrl;
  } catch (error) {
    console.error('Error fetching image:', error);
    throw error;
  }
}
