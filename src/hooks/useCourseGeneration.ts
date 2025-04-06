
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast as sonnerToast } from "sonner";
import { CourseType } from "@/types";
import { getStaticCourse } from "@/data/staticCourses";
import { 
  generateCourseWithOpenAI, 
  generateCourseFallback 
} from "@/services/openaiService";

// Define an interface for the content structure
interface CourseContent {
  status?: string;
  message?: string;
  lastUpdated?: string;
  parsedContent?: {
    summary?: string;
    chapters?: any[];
  };
  [key: string]: any;
}

export const useCourseGeneration = () => {
  const [generationInBackground, setGenerationInBackground] = useState(false);
  const [courseGenerationId, setCourseGenerationId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [retryCount, setRetryCount] = useState(0);
  const [useFallback, setUseFallback] = useState(false);
  const [generationStartTime, setGenerationStartTime] = useState<Date | null>(null);
  const [useStaticData, setUseStaticData] = useState(true); // Always use static data

  useEffect(() => {
    let intervalId: number | null = null;
    
    if (generationInBackground && courseGenerationId) {
      console.log("Setting up interval to check course generation status for ID:", courseGenerationId);
      
      intervalId = window.setInterval(async () => {
        try {
          console.log("Checking course generation status for ID:", courseGenerationId);
          const { data: course, error } = await supabase
            .from('courses')
            .select('*')
            .eq('id', courseGenerationId)
            .single();
          
          if (error) {
            console.error("Error checking course status:", error);
            throw error;
          }
          
          console.log("Course status check result:", course?.content);
          
          // Type guard to ensure content is an object
          if (course && course.content && typeof course.content === 'object') {
            const content = course.content as CourseContent;
            
            // Check if course is fully complete
            if (content.status === 'complete') {
              console.log("Course generation completed!");
              if (intervalId) clearInterval(intervalId);
              setGenerationInBackground(false);
              setCourseGenerationId(null);
              setProgress(100);
              
              sonnerToast.success('Course Generation Complete', {
                description: `Your course "${course.title}" has been generated successfully.`,
                action: {
                  label: 'View Course',
                  onClick: () => window.location.href = `/course/${course.id}`,
                },
              });
            } 
            // Check if we're generating content
            else if (content.status === 'generating') {
              // Simulate progress while in the generating state
              setProgress(prev => Math.min(prev + 5, 70)); // Increment progress up to 70%
            }
            // Check if there was an error in generation
            else if (content.status === 'error') {
              console.error("Course generation failed:", content.message);
              if (intervalId) clearInterval(intervalId);
              setGenerationInBackground(false);
              setCourseGenerationId(null);
              setProgress(0);
              
              sonnerToast.error('Course Generation Failed', {
                description: content.message || "An unknown error occurred",
              });
            }
          }
        } catch (error) {
          console.error("Error checking course generation status:", error);
          if (intervalId) clearInterval(intervalId);
          setGenerationInBackground(false);
          setCourseGenerationId(null);
          setProgress(0);
          setError("Failed to check course generation status. Please try again.");
        }
      }, 3000);
    }
    
    return () => {
      if (intervalId) {
        console.log("Clearing interval for course generation check");
        clearInterval(intervalId);
      }
    };
  }, [generationInBackground, courseGenerationId]);

  // Create a function to start course generation
  const startCourseGeneration = async (
    courseName: string, 
    purpose: CourseType['purpose'], 
    difficulty: CourseType['difficulty'],
    userId: string
  ) => {
    try {
      console.log("Starting course generation for:", courseName);
      
      // Reset progress and set start time
      setProgress(10);
      setRetryCount(0);
      setUseFallback(false);
      setGenerationStartTime(new Date());
      
      // Step 1: Create an empty course entry
      const { data: emptyCourse, error: courseError } = await supabase
        .from('courses')
        .insert({
          title: courseName,
          purpose,
          difficulty,
          user_id: userId,
          summary: "Course generation in progress...",
          content: { 
            status: 'generating', 
            lastUpdated: new Date().toISOString(),
            startTime: new Date().toISOString()
          }
        })
        .select()
        .single();
      
      if (courseError) {
        console.error("Error creating empty course:", courseError);
        throw new Error(courseError.message || "Failed to create course");
      }
      
      console.log("Created empty course:", emptyCourse);
      
      // Set generation as started so the UI shows progress
      setCourseGenerationId(emptyCourse.id);
      setGenerationInBackground(true);
      setError(null);
      setProgress(20);

      // Start the background process
      if (useStaticData) {
        // Simulate time for course generation
        setTimeout(() => {
          processStaticCourseGeneration(
            courseName,
            purpose,
            difficulty as "beginner" | "intermediate" | "advanced",
            emptyCourse.id
          );
        }, 120000); // 2 minutes of "generation time"
      } else {
        processBackgroundCourseGeneration(
          courseName,
          purpose,
          difficulty,
          emptyCourse.id
        );
      }
      
      return emptyCourse.id;
    } catch (error: any) {
      console.error("Error in startCourseGeneration:", error);
      setProgress(0);
      throw error;
    }
  };

  // Process generation with static data
  const processStaticCourseGeneration = async (
    topic: string,
    purpose: CourseType['purpose'],
    difficulty: "beginner" | "intermediate" | "advanced",
    courseId: string
  ) => {
    try {
      setProgress(50);
      
      // Get static course data
      const staticCourse = getStaticCourse(topic, difficulty);
      
      if (!staticCourse) {
        throw new Error("No static course data available for this topic and difficulty");
      }
      
      setProgress(70);
      
      // Extract the summary
      const summary = staticCourse.summary || `Static course on ${topic} for ${purpose} at ${difficulty} level`;
      
      // Update course with static content
      await supabase
        .from('courses')
        .update({ 
          summary,
          content: {
            status: 'complete',
            generatedAt: new Date().toISOString(),
            parsedContent: staticCourse.content.parsedContent,
            flashcards: staticCourse.content.flashcards || [],
            mcqs: staticCourse.content.mcqs || [],
            qnas: staticCourse.content.qnas || []
          } 
        })
        .eq('id', courseId);
        
      console.log(`Course ${courseId} updated with static content`);
      setProgress(100);
      
    } catch (error: any) {
      console.error(`Error in static course generation for course ${courseId}:`, error);
      setProgress(0);
      
      // Try to update the course with error status
      try {
        await supabase
          .from('courses')
          .update({ 
            content: { 
              status: 'error', 
              message: error.message || 'Unknown error during static course generation',
              lastUpdated: new Date().toISOString()
            } 
          })
          .eq('id', courseId);
          
        console.log(`Updated course ${courseId} status to error due to processing error`);
      } catch (updateError: any) {
        console.error(`Failed to update error status for course ${courseId}:`, updateError);
      }
    }
  };

  // Background processing function to handle course generation
  const processBackgroundCourseGeneration = async (
    topic: string,
    purpose: CourseType['purpose'],
    difficulty: CourseType['difficulty'],
    courseId: string
  ) => {
    try {
      // Update course status to generating
      await supabase
        .from('courses')
        .update({ 
          content: { status: 'generating', lastUpdated: new Date().toISOString() } 
        })
        .eq('id', courseId);
        
      console.log(`Updated course ${courseId} status to generating`);
      setProgress(30);

      // Call OpenAI API through Edge Function
      console.log(`Calling OpenAI API for course ${courseId}`);
      
      try {
        const response = useFallback 
          ? await generateCourseFallback(topic, purpose, difficulty)
          : await generateCourseWithOpenAI(courseId, topic, purpose, difficulty);
        
        if (!response.success) {
          // If API call failed but retries are available, try again
          if (retryCount < 2 && !useFallback) {
            setRetryCount(prev => prev + 1);
            console.log(`API call failed, retrying (${retryCount + 1}/3)...`);
            
            // Update progress to indicate retry
            setProgress(35);
            
            // Wait 3 seconds before retry
            await new Promise(resolve => setTimeout(resolve, 3000));
            
            // Try again recursively
            return processBackgroundCourseGeneration(topic, purpose, difficulty, courseId);
          }
          
          // If we've exhausted retries, switch to fallback mode
          if (!useFallback) {
            console.log("Switching to fallback generation mode");
            setUseFallback(true);
            
            // Update progress to indicate fallback
            setProgress(40);
            
            // Try again with fallback
            return processBackgroundCourseGeneration(topic, purpose, difficulty, courseId);
          }
          
          throw new Error(response.error || 'Unknown error from OpenAI API');
        }
        
        console.log(`Background generation completed successfully for course ${courseId}`);
        setProgress(70);
        
        // Extract text content from response
        const text = response.text || '';
        
        if (!text) {
          throw new Error('Empty response from OpenAI API');
        }
        
        // Extract summary
        let summary = `An AI-generated course on ${topic}`;
        const summaryMatch = text.match(/# SUMMARY[:\n]+([^#]+)/i);
        if (summaryMatch && summaryMatch[1]) {
          summary = summaryMatch[1].trim().substring(0, 500);
        }
        
        // Parse the content into structured format
        const parsedContent = parseGeneratedContent(text);
        setProgress(90);
        
        // Update course with complete content
        await supabase
          .from('courses')
          .update({ 
            summary,
            content: {
              status: 'complete',
              fullText: text,
              generatedAt: new Date().toISOString(),
              parsedContent
            } 
          })
          .eq('id', courseId);
          
        console.log(`Course ${courseId} updated with generated content`);
        setProgress(100);
      } catch (error: any) {
        console.error(`Error calling OpenAI API: ${error.message}`);
        throw error;
      }
      
    } catch (error: any) {
      console.error(`Error in background processing for course ${courseId}:`, error);
      setProgress(0);
      
      // Try to update the course with error status
      try {
        await supabase
          .from('courses')
          .update({ 
            content: { 
              status: 'error', 
              message: error.message || 'Unknown error during background processing',
              lastUpdated: new Date().toISOString()
            } 
          })
          .eq('id', courseId);
          
        console.log(`Updated course ${courseId} status to error due to processing error`);
      } catch (updateError: any) {
        console.error(`Failed to update error status for course ${courseId}:`, updateError);
      }
    }
  };

  // Helper function to parse the generated content
  const parseGeneratedContent = (text: string) => {
    const parsedContent = {
      summary: "",
      chapters: []
    };

    // Extract summary
    const summaryMatch = text.match(/# SUMMARY\s*\n([\s\S]*?)(?=\n# |\n## |$)/i);
    if (summaryMatch && summaryMatch[1]) {
      parsedContent.summary = summaryMatch[1].trim();
    }

    // Extract chapters
    const chaptersSection = text.match(/# CHAPTERS\s*\n([\s\S]*?)(?=\n# |$)/i);
    if (chaptersSection && chaptersSection[1]) {
      const chaptersText = chaptersSection[1];
      const chapterBlocks = chaptersText.split(/\n(?=## )/g);
      
      parsedContent.chapters = chapterBlocks.map((block, index) => {
        const titleMatch = block.match(/## (.*)/);
        const title = titleMatch ? titleMatch[1].trim() : `Chapter ${index + 1}`;
        const content = block.replace(/## .*\n/, '').trim();
        
        return {
          title,
          content,
          order_number: index + 1
        };
      });
    }

    return parsedContent;
  };

  // Generate additional content (flashcards, MCQs, Q&As) separately
  const generateAdditionalContent = async (
    courseId: string,
    contentType: 'flashcards' | 'mcqs' | 'qna',
    topic: string,
    difficulty?: string
  ) => {
    // Implementation will be added in the future when needed
    console.log(`Generating ${contentType} for course ${courseId} on topic ${topic}`);
    // This would call the appropriate OpenAI API function based on contentType
  };

  return {
    generationInBackground,
    courseGenerationId,
    error,
    progress,
    setError,
    startCourseGeneration,
    generateAdditionalContent,
    generationStartTime
  };
};
