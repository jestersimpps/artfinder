import { NextResponse } from "next/server";

const placeholderImages = [
  'https://images.unsplash.com/photo-1541961017774-22349e4a1262',
  'https://images.unsplash.com/photo-1549887534-1541e9326642',
  'https://images.unsplash.com/photo-1541963463532-d68292c34b19',
  'https://images.unsplash.com/photo-1579783483458-83d02161294e',
  'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5'
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    // Return a random image from the placeholder images
    const randomImage = placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
    return NextResponse.json({ imageUrl: randomImage });
  } catch (error) {
    console.error("Error fetching image:", error);
    return NextResponse.json({ error: "Failed to fetch image" }, { status: 500 });
  }
}
