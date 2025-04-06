
import { OPENAI_API_KEY } from '@/configs/environment';

/**
 * Service for interacting with the OpenAI API directly from frontend
 */

interface GeminiResponse {
  success: boolean;
  data?: any;
  error?: string;
  text?: string;
}

/**
 * Makes a direct call to the OpenAI API
 */
const callOpenAIApi = async <T>(prompt: string): Promise<T> => {
  try {
    console.log(`Calling OpenAI API with prompt`);
    
    // Verify API key is available
    if (!OPENAI_API_KEY) {
      console.error('OpenAI API key is missing.');
      throw new Error('API key is required for OpenAI API calls.');
    }
    
    // Add a timeout to the fetch to prevent hanging requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout
    
    // API call to OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2048
      }),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`OpenAI API error: ${response.status} ${errorText}`);
      throw new Error(`OpenAI API error: ${response.status} ${errorText}`);
    }

    const responseData = await response.json();
    console.log(`Received response from OpenAI API`, responseData);
    
    // Extract text from OpenAI response
    let text = '';
    try {
      text = responseData.choices[0].message.content || '';
    } catch (error) {
      console.error("Error extracting text from OpenAI response:", error);
      text = "Error: Unable to extract text from OpenAI response";
    }
    
    return {
      success: true,
      text,
      data: responseData
    } as unknown as T;
  } catch (error: any) {
    console.error(`Error calling OpenAI API:`, error);
    return {
      success: false,
      error: error.message || 'Unknown error from OpenAI API',
      text: 'Failed to generate content'
    } as unknown as T;
  }
};

/**
 * Generate a complete course structure using the OpenAI API
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
  
  return callOpenAIApi<GeminiResponse>(prompt);
};

/**
 * Generate flashcards for a course using the OpenAI API
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
  
  return callOpenAIApi<GeminiResponse>(prompt);
};

/**
 * Generate multiple choice questions for a course using the OpenAI API
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
  
  return callOpenAIApi<GeminiResponse>(prompt);
};

/**
 * Generate Q&A pairs for a course using the OpenAI API
 */
export const generateQnAWithGemini = async (
  topic: string
): Promise<GeminiResponse> => {
  const prompt = `Generate a list of 10 potential questions and answers on the topic "${topic}".
                 The questions should reflect real-world use cases and interview-style questions.
                 Format:
                 - Question: [Question]
                 - Answer: [Answer]`;
  
  return callOpenAIApi<GeminiResponse>(prompt);
};

/**
 * Generate interview questions using the OpenAI API
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
  
  return callOpenAIApi<GeminiResponse>(prompt);
};

/**
 * Analyze an interview response using the OpenAI API
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
  
  return callOpenAIApi<GeminiResponse>(prompt);
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
