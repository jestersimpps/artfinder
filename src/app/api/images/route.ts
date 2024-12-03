import { NextResponse } from "next/server";
import * as cheerio from 'cheerio';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}&tbm=isch`;
    
    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const html = await response.text();
    const $ = cheerio.load(html);
    
    // Find image URLs in the page
    const imageUrls: string[] = [];
    $('img').each((_, element) => {
      const src = $(element).attr('src');
      if (src && src.startsWith('http')) {
        imageUrls.push(src);
      }
    });

    // Get the first valid image URL or return a placeholder
    const imageUrl = imageUrls[0] || 'https://via.placeholder.com/400x300?text=Image+Not+Found';
    
    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error("Error fetching image:", error);
    return NextResponse.json({ error: "Failed to fetch image" }, { status: 500 });
  }
}
