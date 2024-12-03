import OpenAI from 'openai';

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
          content: "You are an art expert. Generate artwork information based on the user's description. Return exactly 3 artworks that match the description or theme."
        },
        {
          role: "user",
          content: query
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const response = JSON.parse(completion.choices[0].message.content);
    return response.artworks || [];
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    throw error;
  }
}
