
# AI Text Assistant

A modern web application built with Next.js that provides AI-powered text summarization and grammar correction capabilities. The application features a beautiful animated background, intuitive UI, and real-time text processing.

![AI Text Assistant](asset/screenshot.jpg)

## Features

### Text Summarization
- Multiple summarization levels (low, medium, high)
- Real-time text processing
- Customizable summary length
- Intelligent text analysis using Hugging Face API

### Grammar Correction
- Advanced grammar checking
- Instant correction suggestions
- One-click application of corrections
- Detailed grammar improvement recommendations

### User Interface
- Modern, responsive design
- Beautiful animated Three.js background
- Glassmorphism effects
- Dark mode optimized
- Toast notifications for user feedback

## Tech Stack

- **Frontend:**
  - Next.js 14
  - React
  - TypeScript
  - Tailwind CSS
  - shadcn/ui components
  - Three.js for animations
  - Zustand for state management

- **Backend:**
  - Next.js API routes
  - Hugging Face API integration
  - Error handling middleware
  - Response structure validation

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-text-assistant.git
cd ai-text-assistant
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file with your API keys:
```env
HUGGING_FACE_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── components/          # React components
│   ├── Background/     # Animated background
│   ├── Header/         # Navigation and settings
│   ├── Summarizer/     # Text processing components
│   └── ui/             # shadcn/ui components
├── hooks/              # Custom React hooks
├── lib/               # Utility functions
├── pages/             # Next.js pages and API routes
├── store/             # Zustand state management
├── styles/            # Global styles
└── types/             # TypeScript declarations
```

## Core Functions

### Text Summarization
```typescript
const handleSummarize = async () => {
  // Processes text input and returns a concise summary
  // Supports different summary levels (low, medium, high)
}
```

### Grammar Correction
```typescript
const handleGrammarCheck = async () => {
  // Analyzes text for grammar issues
  // Returns corrected text with suggestions
}
```

## API Endpoints

### `/api/summarize`
- **Method:** POST
- **Body:** `{ text: string, level: "low" | "medium" | "high" }`
- **Response:** `{ summary: string }`

### `/api/grammar`
- **Method:** POST
- **Body:** `{ text: string }`
- **Response:** `{ correctedText: string }`

## State Management

The application uses Zustand for state management, handling:
- Input text state
- Summary results
- Grammar corrections
- Loading states
- UI preferences

## Roadmap

### Planned Features
- [ ] Support for multiple languages
- [ ] Export summaries in different formats
- [ ] Advanced text analysis metrics
- [ ] User accounts and saved summaries
- [ ] API rate limiting and usage tracking
- [ ] Batch processing for multiple texts
- [ ] Custom summarization templates

### Future Improvements
- [ ] Add more AI models for comparison
- [ ] Implement real-time collaboration
- [ ] Add document upload support (PDF, DOCX)
- [ ] Create browser extension
- [ ] Add offline processing capabilities
- [ ] Implement advanced formatting options

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Hugging Face](https://huggingface.co/) for providing the AI models
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Three.js](https://threejs.org/) for the 3D animations

