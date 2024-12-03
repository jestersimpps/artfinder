import { NextResponse } from "next/server";
import { google } from '@googleapis/customsearch';

const customSearch = google.customsearch('v1');

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const response = await customSearch.cse.list({
      auth: process.env.GOOGLE_API_KEY,
      cx: process.env.GOOGLE_CSE_ID,
      q: query + " artwork",
      searchType: 'image',
      num: 1,
      imgSize: 'LARGE',
      safe: 'active'
    });

    if (!response.data.items || response.data.items.length === 0) {
      return NextResponse.json({ error: "No images found" }, { status: 404 });
    }

    return NextResponse.json({ imageUrl: response.data.items[0].link });
  } catch (error) {
    console.error("Error fetching image:", error);
    return NextResponse.json({ error: "Failed to fetch image" }, { status: 500 });
  }
}
