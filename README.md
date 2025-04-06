
# StudyMate AI Learning Platform

An AI-powered learning platform with course generation, flashcards, quizzes, and mock interview preparation.

## Environment Setup

This application requires the following environment variable:

```
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### Getting a Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create an API key
3. Copy the API key and paste it into your `.env` file as `VITE_GEMINI_API_KEY`

## Running the Application

### Frontend Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your Gemini API key:
   ```
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```
4. Start the application:
   ```bash
   npm run dev
   ```

## How Gemini API Calls Work

StudyMate uses direct calls to the Gemini API from the frontend:

- All API calls are handled in `src/services/geminiService.ts`
- Calls are made directly to Google's Generative AI endpoints
- The application uses the VITE_GEMINI_API_KEY environment variable for authentication
- A fallback mechanism exists for generating content when API calls fail

## Course Generation Process

The course generation happens in the background:

1. When a user submits a request, it creates an entry in the database with "generating" status
2. The application shows a progress indicator with an estimated time remaining
3. Initially, only course notes are generated
4. Additional content like flashcards, MCQs, and Q&A sections can be generated separately after the course is created
5. All generation runs in the background, allowing users to navigate away from the page

## Troubleshooting

### API Authentication Issues
If you see a 403 error related to the Gemini API:
1. Check that your `VITE_GEMINI_API_KEY` is correctly set in the `.env` file
2. Make sure your API key is valid and has not expired
3. Verify that you have enabled the Generative Language API in your Google Cloud Console

### Browser Extension Conflicts
If you experience message channel errors:
1. Try disabling browser extensions, especially ad blockers or privacy tools
2. Refresh the page and try again
3. If the issue persists in one browser, try another browser

### Supabase Connection Issues
If you experience issues with Supabase:
1. Check that your Supabase URL and API key are correctly configured
2. Ensure your database schema matches the expected structure
3. Verify that Row Level Security (RLS) policies are correctly set up
