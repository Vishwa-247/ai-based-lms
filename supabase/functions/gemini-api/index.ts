
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Edge function invoked");
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not set in environment variables');
    }

    const { action, data } = await req.json();
    console.log(`Processing ${action} request with data:`, data);

    let prompt = "";
    let endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
    let generationConfig = {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 8192,
    };

    switch (action) {
      case 'generate_course':
        prompt = `Create a complete course on ${data.topic} for ${data.purpose} at ${data.difficulty} level.
                 
                 Follow this exact structure:
                 
                 # SUMMARY
                 Provide a concise overview of what the course covers and its objectives.
                 
                 # CHAPTERS
                 Create 5-8 logically structured chapters. For each chapter:
                 ## [Chapter Title]
                 [Chapter Content with detailed and comprehensive content including examples, explanations, and relevant concepts]
                 
                 # FLASHCARDS
                 Create at least 15 flashcards in this format:
                 - Question: [question text]
                 - Answer: [answer text]
                 
                 # MCQs (Multiple Choice Questions)
                 Create at least 10 multiple choice questions in this format:
                 - Question: [question text]
                 - Options: 
                 a) [option text] 
                 b) [option text] 
                 c) [option text] 
                 d) [option text]
                 - Correct Answer: [correct letter]
                 
                 # Q&A PAIRS
                 Create at least 10 question and answer pairs for deeper understanding:
                 - Question: [detailed question]
                 - Answer: [comprehensive answer]
                 
                 Ensure the course is educational, accurate, and tailored to ${data.purpose} at ${data.difficulty} level.`;
        break;

      case 'generate_study_notes':
        prompt = `You are an AI tutor. Generate detailed study notes on the topic: "${data.topic}"
                with the following difficulty level: ${data.difficulty}. Keep it beginner-friendly if easy, or deep and advanced if hard.
                Return in clean markdown format with headings, bullet points, and examples.`;
        generationConfig.maxOutputTokens = 4096;
        break;

      case 'generate_flashcards':
        prompt = `Generate 10 flashcards for the topic "${data.topic}".
                Each flashcard should be in the format:
                Q: Question here?
                A: Answer here.
                Target difficulty: ${data.difficulty}.`;
        generationConfig.maxOutputTokens = 2048;
        break;

      case 'generate_mcqs':
        prompt = `Generate 10 multiple choice questions for "${data.topic}" with difficulty level "${data.difficulty}".
                Each question should have 4 options and clearly indicate the correct answer.
                Return in JSON format:
                [
                  {
                    "question": "...",
                    "options": ["A", "B", "C", "D"],
                    "answer": "A"
                  },
                  ...
                ]`;
        generationConfig.maxOutputTokens = 2048;
        break;

      case 'generate_qna':
        prompt = `Generate a list of 10 potential questions and answers on the topic "${data.topic}".
                The questions should reflect real-world use cases and interview-style questions.
                Output format:
                Q: ...
                A: ...`;
        generationConfig.maxOutputTokens = 2048;
        break;

      case 'analyze_interview':
        prompt = `You are a communication skill evaluator. Analyze the following response from a user during a mock interview:

                "${data.answer}"

                Question they were answering: "${data.question}"
                Job role: ${data.jobRole}

                Evaluate it based on:
                1. Clarity of thought
                2. Speaking structure
                3. Use of filler words
                4. Grammar
                5. Confidence

                Give feedback and suggestions for improvement. Return a communication score out of 10.`;
        generationConfig.temperature = 0.3;
        generationConfig.maxOutputTokens = 2048;
        break;

      case 'generate_course_suggestions':
        prompt = `Based on the communication analysis below, suggest 3 AI-generated micro-courses to improve the user's speaking or soft skills:

                Analysis:
                "${data.feedback}"

                Each course should have a name, short description, and difficulty level.`;
        generationConfig.temperature = 0.7;
        generationConfig.maxOutputTokens = 2048;
        break;

      case 'generate_interview_questions':
        prompt = `Generate ${data.questionCount || 5} interview questions for a ${data.experience} years experienced ${data.jobRole} 
                 with expertise in ${data.techStack}. The questions should be challenging and relevant to the role.
                 
                 For each question:
                 1. Focus on technical knowledge and practical application
                 2. Test problem-solving abilities
                 3. Include scenario-based questions
                 4. Assess teamwork and collaboration skills
                 Format as a numbered list.`;
        generationConfig.maxOutputTokens = 2048;
        break;

      default:
        throw new Error(`Unsupported action: ${action}`);
    }

    console.log(`Making request to Gemini API: ${endpoint} with action: ${action}`);
    
    // Set a timeout for the API call
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 60000); // 60 second timeout
    
    try {
      const response = await fetch(`${endpoint}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig
        }),
        signal: controller.signal
      });
      
      clearTimeout(timeout);

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Error from Gemini API:', errorData);
        throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
      }

      const responseData = await response.json();
      console.log(`Gemini API response received successfully for ${action}`);
      
      // Extract the text from the response
      let text = '';
      try {
        if (responseData.candidates && 
            responseData.candidates[0] && 
            responseData.candidates[0].content && 
            responseData.candidates[0].content.parts && 
            responseData.candidates[0].content.parts[0]) {
          text = responseData.candidates[0].content.parts[0].text || '';
        }
      } catch (extractError) {
        console.error('Error extracting text from response:', extractError);
      }
      
      return new Response(JSON.stringify({
        success: true,
        data: responseData,
        text: text
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (fetchError) {
      clearTimeout(timeout);
      if (fetchError.name === 'AbortError') {
        console.error('Gemini API request timed out');
        throw new Error('API request timed out. Please try again later.');
      }
      throw fetchError;
    }
    
  } catch (error) {
    console.error('Error in gemini-api function:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
