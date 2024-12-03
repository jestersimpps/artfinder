import { NextResponse } from "next/server";
import * as cheerio from 'cheerio';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const searchUrl = `https://www.bing.com/images/search?q=${encodeURIComponent(query)}`;
    
    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9'
      }
    });

    const html = await response.text();
    const $ = cheerio.load(html);

    // Find the first image result
    const imageUrl = $('.iusc').first().attr('m');
    
    if (!imageUrl) {
      return NextResponse.json({ error: "No images found" }, { status: 404 });
    }

    try {
      const imageData = JSON.parse(imageUrl);
      return NextResponse.json({ imageUrl: imageData.murl });
    } catch (parseError) {
      console.error("Error parsing image data:", parseError);
      return NextResponse.json({ error: "Failed to parse image data" }, { status: 500 });
    }

  } catch (error) {
    console.error("Error fetching image:", error);
    return NextResponse.json({ error: "Failed to fetch image" }, { status: 500 });
  }
}
