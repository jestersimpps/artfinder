import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
 apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
 try {
  const { query } = await request.json();

  if (!query) {
   return NextResponse.json({ error: "Query is required" }, { status: 400 });
  }

  const completion = await openai.chat.completions.create({
   model: "gpt-4o-mini",
   messages: [
    {
     role: "system",
     content: `You are an art expert. Generate artwork information based on the user's description. Return the artworks that match the description or theme.
Return the response in this exact JSON format:
{
  "artworks": [
    {
      "title": "artwork title",
      "artist": "artist name",
      "year": "year created",
      "description": "brief description"
    }
  ]
}`,
    },
    {
     role: "user",
     content: query,
    },
   ],
   response_format: { type: "json_object" },
   temperature: 0.7,
  });

  const content = completion.choices[0].message.content;
  if (!content) {
   return NextResponse.json(
    { error: "Empty response from OpenAI" },
    { status: 500 }
   );
  }

  const response = JSON.parse(content);
  if (!response.artworks || !Array.isArray(response.artworks)) {
   return NextResponse.json(
    { error: "Invalid response format from OpenAI" },
    { status: 500 }
   );
  }

  // Add images to each artwork
  interface ArtworkBase {
    title: string;
    artist: string;
    year: string;
    description: string;
  }

  const artworksWithImages = await Promise.all(
    response.artworks.map(async (artwork: ArtworkBase) => {
      try {
        const searchQuery = `${artwork.title} ${artwork.artist} artwork`;
        const host = request.headers.get('host');
        const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
        const imageResponse = await fetch(
          `${protocol}://${host}/api/images?query=${encodeURIComponent(searchQuery)}`
        );
        const imageData = await imageResponse.json();
        return {
          ...artwork,
          imageUrl: imageData.imageUrl,
        };
      } catch (error) {
        console.error("Error fetching image for artwork:", error);
        return {
          ...artwork,
          imageUrl: "https://via.placeholder.com/400x300?text=Image+Not+Found",
        };
      }
    })
  );

  return NextResponse.json({ artworks: artworksWithImages });
 } catch (error) {
  console.error("Error processing request:", error);
  return NextResponse.json({ error: "Internal server error" }, { status: 500 });
 }
}
