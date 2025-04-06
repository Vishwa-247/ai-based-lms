import { supabase } from '@/integrations/supabase/client';

/**
 * Service for interacting with the OpenAI API through a Supabase Edge Function
 */

interface OpenAIResponse {
  success: boolean;
  data?: any;
  error?: string;
  text?: string;
}

/**
 * Makes a call to OpenAI API through Supabase Edge Function
 */
const callOpenAIApi = async <T>(prompt: string): Promise<T> => {
  try {
    console.log(`Calling OpenAI API with prompt`);
    
    // Call the Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('openai-api', {
      body: { 
        action: 'generate',
        prompt: prompt
      }
    });
    
    if (error) {
      console.error('Error calling OpenAI Edge Function:', error);
      throw new Error(error.message || 'Error calling OpenAI Edge Function');
    }
    
    if (!data) {
      throw new Error('Empty response from OpenAI Edge Function');
    }
    
    if (!data.success) {
      throw new Error(data.error || 'API returned unsuccessful response');
    }
    
    console.log(`Received response from OpenAI Edge Function`, data);
    
    return data as unknown as T;
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
export const generateCourseWithOpenAI = async (
  courseId: string,
  topic: string,
  purpose: string,
  difficulty: string
): Promise<OpenAIResponse> => {
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
  
  return callOpenAIApi<OpenAIResponse>(prompt);
};

/**
 * Generate flashcards for a course using the OpenAI API
 */
export const generateFlashcardsWithOpenAI = async (
  topic: string,
  difficulty: string
): Promise<OpenAIResponse> => {
  const prompt = `Generate 10 flashcards for the topic "${topic}".
                 Each flashcard should be in the format:
                 - Question: [Question]
                 - Answer: [Answer]
                 Target difficulty: ${difficulty}.`;
  
  return callOpenAIApi<OpenAIResponse>(prompt);
};

/**
 * Generate multiple choice questions for a course using the OpenAI API
 */
export const generateMCQsWithOpenAI = async (
  topic: string,
  difficulty: string
): Promise<OpenAIResponse> => {
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
  
  return callOpenAIApi<OpenAIResponse>(prompt);
};

/**
 * Generate Q&A pairs for a course using the OpenAI API
 */
export const generateQnAWithOpenAI = async (
  topic: string
): Promise<OpenAIResponse> => {
  const prompt = `Generate a list of 10 potential questions and answers on the topic "${topic}".
                 The questions should reflect real-world use cases and interview-style questions.
                 Format:
                 - Question: [Question]
                 - Answer: [Answer]`;
  
  return callOpenAIApi<OpenAIResponse>(prompt);
};

/**
 * Generate interview questions using the OpenAI API
 */
export const generateInterviewQuestionsWithOpenAI = async (
  jobRole: string,
  techStack: string,
  experience: string,
  questionCount: number = 5
): Promise<OpenAIResponse> => {
  const prompt = `Generate ${questionCount} technical interview questions for a ${experience} level ${jobRole} position with expertise in ${techStack}.
                 Questions should be challenging but appropriate for the experience level.
                 Format each question on a new line.`;
  
  return callOpenAIApi<OpenAIResponse>(prompt);
};

/**
 * Analyze an interview response using the OpenAI API
 */
export const analyzeInterviewResponseWithOpenAI = async (
  jobRole: string,
  question: string,
  answer: string
): Promise<OpenAIResponse> => {
  const prompt = `You are an expert technical interviewer for a ${jobRole} position.
                 Analyze this candidate's answer and provide feedback:
                 
                 Question: ${question}
                 
                 Candidate's Answer: ${answer}
                 
                 Provide feedback on technical accuracy, completeness, clarity, and areas for improvement.
                 Rate the answer on a scale of 1-10 and explain why.`;
  
  return callOpenAIApi<OpenAIResponse>(prompt);
};

/**
 * Fallback function for course generation when API fails
 */
export const generateCourseFallback = async (
  topic: string,
  purpose: string,
  difficulty: string
): Promise<OpenAIResponse> => {
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
