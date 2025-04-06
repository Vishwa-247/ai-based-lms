
import { GEMINI_API_KEY } from '@/configs/environment';

/**
 * Service for interacting with the Gemini API directly from frontend
 */

interface GeminiResponse {
  success: boolean;
  data?: any;
  error?: string;
  text?: string;
}

/**
 * Makes a direct call to the Gemini API
 */
const callGeminiApi = async <T>(prompt: string): Promise<T> => {
  try {
    console.log(`Calling Gemini API with prompt`);
    
    // Verify API key is available
    if (!GEMINI_API_KEY) {
      console.error('Gemini API key is missing. Please add VITE_GEMINI_API_KEY to your environment variables.');
      throw new Error('API key is required for Gemini API calls. Please check your environment configuration.');
    }
    
    // Add a timeout to the fetch to prevent hanging requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout
    
    // API call to Gemini
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": GEMINI_API_KEY
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
        }
      }),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Gemini API error: ${response.status} ${errorText}`);
      throw new Error(`Gemini API error: ${response.status} ${errorText}`);
    }

    const responseData = await response.json();
    console.log(`Received response from Gemini API`, responseData);
    
    // Extract text from Gemini response
    let text = '';
    try {
      text = responseData.candidates[0].content.parts[0].text || '';
    } catch (error) {
      console.error("Error extracting text from Gemini response:", error);
      text = "Error: Unable to extract text from Gemini response";
    }
    
    return {
      success: true,
      text,
      data: responseData
    } as unknown as T;
  } catch (error: any) {
    console.error(`Error calling Gemini API:`, error);
    return {
      success: false,
      error: error.message || 'Unknown error from Gemini API',
      text: 'Failed to generate content'
    } as unknown as T;
  }
};

/**
 * Generate a complete course structure using the Gemini API
 */
export const generateCourseWithGemini = async (
  courseId: string,
  topic: string,
  purpose: string,
  difficulty: string
): Promise<GeminiResponse> => {
  const prompt = `Create a comprehensive learning course about "${topic}" for ${purpose} purpose at ${difficulty} level.
                  Structure your response as follows:
                  # SUMMARY
                  [Provide a concise summary of the course]

                  # CHAPTERS
                  ## [Chapter 1 Title]
                  [Chapter 1 content]

                  ## [Chapter 2 Title]
                  [Chapter 2 content]
                  
                  [... more chapters]`;
  
  return callGeminiApi<GeminiResponse>(prompt);
};

/**
 * Generate flashcards for a course using the Gemini API
 */
export const generateFlashcardsWithGemini = async (
  topic: string,
  difficulty: string
): Promise<GeminiResponse> => {
  const prompt = `Generate 10 flashcards for the topic "${topic}".
                 Each flashcard should be in the format:
                 - Question: [Question]
                 - Answer: [Answer]
                 Target difficulty: ${difficulty}.`;
  
  return callGeminiApi<GeminiResponse>(prompt);
};

/**
 * Generate multiple choice questions for a course using the Gemini API
 */
export const generateMCQsWithGemini = async (
  topic: string,
  difficulty: string
): Promise<GeminiResponse> => {
  const prompt = `Generate 10 multiple choice questions for "${topic}" with difficulty level "${difficulty}".
                 Each question should have 4 options and clearly indicate the correct answer.
                 Format:
                 - Question: [Question]
                 - Options: 
                 a) [Option A]
                 b) [Option B]
                 c) [Option C]
                 d) [Option D]
                 - Correct Answer: [a/b/c/d]`;
  
  return callGeminiApi<GeminiResponse>(prompt);
};

/**
 * Generate Q&A pairs for a course using the Gemini API
 */
export const generateQnAWithGemini = async (
  topic: string
): Promise<GeminiResponse> => {
  const prompt = `Generate a list of 10 potential questions and answers on the topic "${topic}".
                 The questions should reflect real-world use cases and interview-style questions.
                 Format:
                 - Question: [Question]
                 - Answer: [Answer]`;
  
  return callGeminiApi<GeminiResponse>(prompt);
};

/**
 * Generate interview questions using the Gemini API
 */
export const generateInterviewQuestionsWithGemini = async (
  jobRole: string,
  techStack: string,
  experience: string,
  questionCount: number = 5
): Promise<GeminiResponse> => {
  const prompt = `Generate ${questionCount} technical interview questions for a ${experience} level ${jobRole} position with expertise in ${techStack}.
                 Questions should be challenging but appropriate for the experience level.
                 Format each question on a new line.`;
  
  return callGeminiApi<GeminiResponse>(prompt);
};

/**
 * Analyze an interview response using the Gemini API
 */
export const analyzeInterviewResponseWithGemini = async (
  jobRole: string,
  question: string,
  answer: string
): Promise<GeminiResponse> => {
  const prompt = `You are an expert technical interviewer for a ${jobRole} position.
                 Analyze this candidate's answer and provide feedback:
                 
                 Question: ${question}
                 
                 Candidate's Answer: ${answer}
                 
                 Provide feedback on technical accuracy, completeness, clarity, and areas for improvement.
                 Rate the answer on a scale of 1-10 and explain why.`;
  
  return callGeminiApi<GeminiResponse>(prompt);
};

/**
 * Fallback function for course generation when API fails
 */
export const generateCourseFallback = async (
  topic: string,
  purpose: string,
  difficulty: string
): Promise<GeminiResponse> => {
  try {
    console.log("Using fallback for course generation", { topic, purpose, difficulty });
    
    return {
      success: true,
      text: `# SUMMARY
This is a fallback-generated course on ${topic} for ${purpose} at ${difficulty} level.

# CHAPTERS
## Introduction to ${topic}
This chapter introduces the fundamental concepts of ${topic}.

## Core Principles
This chapter covers the core principles and methodologies.

## Advanced Techniques
This chapter explores more advanced techniques and applications.`
    };
  } catch (error: any) {
    console.error("Error in fallback course generation:", error);
    return {
      success: false,
      error: error.message || "Fallback generation failed",
      text: "Failed to generate course content"
    };
  }
};
