import OpenAI from 'openai';
import { getRandomArtImage } from './imageService';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

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
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an art expert. Generate artwork information based on the user's description. Return exactly 3 artworks that match the description or theme.
Return the response in this exact JSON format:
{
  "artworks": [
    {
      "id": "unique-string",
      "title": "artwork title",
      "artist": "artist name",
      "year": "year created",
      "imageUrl": "not-needed",
      "description": "brief description"
    }
  ]
}`
        },
        {
          role: "user",
          content: query
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error('Empty response from OpenAI');
    }
    const response = JSON.parse(content);
    if (!response.artworks || !Array.isArray(response.artworks)) {
      throw new Error('Invalid response format from OpenAI');
    }
    // Add random art images to each artwork
    return response.artworks.map(artwork => ({
      ...artwork,
      imageUrl: getRandomArtImage()
    }));
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    if (error instanceof SyntaxError) {
      throw new Error('Invalid JSON response from OpenAI');
    }
    throw error;
  }
}
