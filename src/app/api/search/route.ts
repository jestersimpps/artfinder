import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { getRandomArtImage } from '@/lib/imageService';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { query } = await request.json();

    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

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
      return NextResponse.json(
        { error: 'Empty response from OpenAI' },
        { status: 500 }
      );
    }

    const response = JSON.parse(content);
    if (!response.artworks || !Array.isArray(response.artworks)) {
      return NextResponse.json(
        { error: 'Invalid response format from OpenAI' },
        { status: 500 }
      );
    }

    // Add random art images to each artwork
    const artworksWithImages = response.artworks.map(artwork => ({
      ...artwork,
      imageUrl: getRandomArtImage()
    }));

    return NextResponse.json({ artworks: artworksWithImages });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
