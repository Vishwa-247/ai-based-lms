
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast as sonnerToast } from "sonner";
import { CourseType } from "@/types";
import { getStaticCourse } from "@/data/staticCourses";

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
  const [generationStartTime, setGenerationStartTime] = useState<Date | null>(null);

  useEffect(() => {
    let intervalId: number | null = null;
    
    if (generationInBackground && courseGenerationId) {
      console.log("Setting up interval to check course generation status for ID:", courseGenerationId);
      
      // Speed up the course generation progress checks - check every 1 second instead of 3
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
              // Faster progress simulation
              setProgress(prev => Math.min(prev + 15, 90)); // Increment progress much faster
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
      }, 1000); // Reduced from 3000ms to 1000ms for faster updates
    }
    
    return () => {
      if (intervalId) {
        console.log("Clearing interval for course generation check");
        clearInterval(intervalId);
      }
    };
  }, [generationInBackground, courseGenerationId]);

  // Create a function to start course generation (using only static data)
  const startCourseGeneration = async (
    courseName: string, 
    purpose: CourseType['purpose'], 
    difficulty: CourseType['difficulty'],
    userId: string
  ) => {
    try {
      console.log("Starting static course generation for:", courseName);
      
      // Reset progress and set start time
      setProgress(25); // Start at higher progress value
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
      setProgress(40);

      // Start the background process with static data
      // Speed up course generation from 5s to just 1s for faster response
      setTimeout(() => {
        processStaticCourseGeneration(
          courseName,
          purpose,
          difficulty as "beginner" | "intermediate" | "advanced",
          emptyCourse.id
        );
      }, 1000); // Reduced from 5000ms to 1000ms for much faster generation
      
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
      setProgress(70);
      
      // Get static course data
      const staticCourse = getStaticCourse(topic, difficulty);
      
      if (!staticCourse) {
        throw new Error("No static course data available for this topic and difficulty");
      }
      
      setProgress(90);
      
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

  // Generate additional content from static data
  const generateAdditionalContent = async (
    courseId: string,
    contentType: 'flashcards' | 'mcqs' | 'qna',
    topic: string,
    difficulty?: string
  ) => {
    console.log(`Generating static ${contentType} for course ${courseId} on topic ${topic}`);
    // This would retrieve the appropriate static content based on contentType
    // Implementation could be added later if needed
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
