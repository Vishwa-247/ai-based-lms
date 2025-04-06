
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

### Backend Setup (Flask API)

The Flask API provides an additional interface to Gemini and handles complex operations:

1. Navigate to the API directory:
   ```bash
   cd api
   ```

2. Install Python dependencies:
   ```bash
   pip install flask flask-cors google-generativeai
   ```

3. Set your Gemini API key as an environment variable:
   ```bash
   # For Linux/Mac
   export GEMINI_API_KEY=your_gemini_api_key_here
   
   # For Windows
   set GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. Start the Flask API:
   ```bash
   python flask_api.py
   ```

## How Gemini API Calls Work

StudyMate uses the Gemini API in three ways:

### 1. Frontend Direct Calls (src/services/geminiService.ts)
- Direct API calls from the frontend for simple operations
- Used for immediate responses like answering questions in the chatbot
- Uses the VITE_GEMINI_API_KEY environment variable

### 2. Flask API Integration (src/services/flaskApi.ts)
- More complex processing with additional contextual information
- Handles markdown formatting and parsing
- Provides fallback mechanisms for API failures

### 3. Supabase Edge Function (supabase/functions/gemini-api/index.ts)
- Secure server-side processing for sensitive operations
- Uses Supabase secrets for API key storage
- Handles streaming responses and longer-running tasks

## Gemini API Prompts

The application uses various prompts for different features:

### Notes Generation Prompt
```javascript
prompt = `
You are an AI tutor. Generate detailed study notes on the topic: "${topic}"
with the following difficulty level: ${difficulty}. Keep it beginner-friendly if easy, or deep and advanced if hard.
Return in clean markdown format with headings, bullet points, and examples.
`;
```

### Flashcards Prompt
```javascript
prompt = `
Generate 10 flashcards for the topic "${topic}".
Each flashcard should be in the format:
Q: Question here?
A: Answer here.
Target difficulty: ${difficulty}.
`;
```

### MCQs Prompt
```javascript
prompt = `
Generate 10 multiple choice questions for "${topic}" with difficulty level "${difficulty}".
Each question should have 4 options and clearly indicate the correct answer.
Return in JSON format:
[
  {
    "question": "...",
    "options": ["A", "B", "C", "D"],
    "answer": "A"
  },
  ...
]
`;
```

### Q&A Prompt
```javascript
prompt = `
Generate a list of 10 potential questions and answers on the topic "${topic}".
The questions should reflect real-world use cases and interview-style questions.
Output format:
Q: ...
A: ...
`;
```

### Communication Feedback Prompt (Interview)
```javascript
prompt = `
You are a communication skill evaluator. Analyze the following response from a user during a mock interview:

"${userResponse}"

Evaluate it based on:
1. Clarity of thought
2. Speaking structure
3. Use of filler words
4. Grammar
5. Confidence

Give feedback and suggestions for improvement. Return a communication score out of 10.
`;
```

### Course Suggestion Based on Communication
```javascript
prompt = `
Based on the communication analysis below, suggest 3 AI-generated micro-courses to improve the user's speaking or soft skills:

Analysis:
"${feedback}"

Each course should have a name, short description, and difficulty level.
`;
```

## Troubleshooting

### API Authentication Issues
If you see a 403 error related to the Gemini API:
1. Check that your `VITE_GEMINI_API_KEY` is correctly set in the `.env` file
2. Make sure your API key is valid and has not expired
3. Verify that you have enabled the Generative Language API in your Google Cloud Console

### Supabase Connection Issues
If you experience issues with Supabase:
1. Check that your Supabase URL and API key are correctly configured
2. Ensure your database schema matches the expected structure
3. Verify that Row Level Security (RLS) policies are correctly set up

### Edge Function Issues
If edge functions aren't working:
1. Make sure `GEMINI_API_KEY` is set in your Supabase secrets
2. Check the edge function logs for any errors
3. Verify that the edge function has the correct permissions
