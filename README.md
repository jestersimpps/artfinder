# Art Explorer

Art Explorer is an AI-powered art discovery platform that helps you find artworks based on natural language descriptions. Simply describe the kind of artwork you're looking for,
and let our AI find matching pieces from art history.

[Live Demo](https://artfinder.vercel.app/)

## Features

- 🎨 Natural language artwork search powered by GPT-4
- 🤖 AI-powered artwork matching and descriptions
- 🖼️ High-quality artwork images from across the web
- 📱 Responsive design for all devices
- 🌓 Dark mode support for comfortable viewing
- ⬇️ Easy image download capability
- 🔄 Real-time loading states and feedback

## Technology Stack

- Next.js 14 (App Router)
- TypeScript for type safety
- Tailwind CSS for styling
- OpenAI GPT-4 API for artwork matching
- Vercel for hosting and deployment
- Next.js Image component for optimized images

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/art-explorer.git
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your OpenAI API key:
```
OPENAI_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How It Works

1. Enter a description of the artwork you're looking for
2. GPT-4 analyzes your request and finds matching artworks
3. Images are fetched and displayed with loading states
4. Click any artwork to view it in full size
5. Download images directly from the modal view

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.