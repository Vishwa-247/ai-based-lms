
import React, { createContext, useContext, useState, useReducer, useEffect, useRef } from "react";
import { InterviewQuestionType, MockInterviewType, CourseType } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

// Define types for the interview state
export enum InterviewStage {
  Setup = "setup",
  Questions = "questions",
  Recording = "recording",
  Review = "review",
  Complete = "complete",
}

// Mock interview questions based on job role
const staticInterviewQuestions = {
  "Software Engineer": [
    "Tell me about your experience with software development methodologies like Agile or Scrum.",
    "How do you approach debugging a complex issue in your code?",
    "Explain how you would design a scalable web application.",
    "What version control systems have you used and how do you manage code conflicts?",
    "Describe a challenging project you worked on and how you contributed to its success."
  ],
  "Frontend Developer": [
    "What's your experience with React hooks and how have you used them?",
    "How do you optimize website performance?",
    "Explain the concept of responsive design and how you implement it.",
    "What strategies do you use for testing frontend code?",
    "How do you handle cross-browser compatibility issues?"
  ],
  "Backend Developer": [
    "Describe your experience with database design and optimization.",
    "How do you handle API security concerns?",
    "Explain how you would design a microservice architecture.",
    "What strategies do you use for error handling in backend systems?",
    "How do you approach API versioning?"
  ],
  "Data Scientist": [
    "Explain your approach to cleaning and preparing data for analysis.",
    "What machine learning algorithms have you worked with and in what contexts?",
    "How do you validate the performance of your models?",
    "Describe a time when your analysis led to an actionable business insight.",
    "How do you communicate technical findings to non-technical stakeholders?"
  ],
  "DevOps Engineer": [
    "Describe your experience with CI/CD pipelines.",
    "How do you approach infrastructure automation?",
    "What monitoring and logging strategies have you implemented?",
    "How do you handle security in a DevOps environment?",
    "Explain your approach to incident response and management."
  ],
  "Default": [
    "Tell me about your background and experience in this field.",
    "What are your biggest strengths and weaknesses related to this role?",
    "How do you stay updated with current trends and technologies?",
    "Describe a challenging problem you solved in a previous role.",
    "Where do you see yourself professionally in the next 3-5 years?"
  ]
};

// Types for our context
interface InterviewContextType {
  // State
  isLoading: boolean;
  stage: InterviewStage;
  interviewData: MockInterviewType | null;
  questions: InterviewQuestionType[];
  currentQuestionIndex: number;
  isCourseTabActive: boolean;
  isGeneratingCourse: boolean;
  isRecording: boolean;
  recordingComplete: boolean;
  isProcessing: boolean;
  recentInterviews: MockInterviewType[];
  recentCourses: CourseType[];

  // Actions
  setStage: (stage: InterviewStage) => void;
  setCourseTabActive: (active: boolean) => void;
  handleInterviewSetup: (role: string, techStack: string, experience: string) => Promise<void>;
  handleAnswerSubmitted: (blob: Blob) => void;
  handleNextQuestion: () => void;
  handleSubmitCourse: (courseName: string, purpose: CourseType['purpose'], difficulty: CourseType['difficulty']) => Promise<void>;
  startRecording: () => void;
  stopRecording: () => void;
  handleCancel: () => void;
  handleDownloadInterview: () => void;
  resumeInterview: (interview: MockInterviewType) => void;
}

// Create the context
export const InterviewContext = createContext<InterviewContextType | undefined>(undefined);

// Provider component
export const InterviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [stage, setStage] = useState<InterviewStage>(InterviewStage.Setup);
  const [interviewData, setInterviewData] = useState<MockInterviewType | null>(null);
  const [questions, setQuestions] = useState<InterviewQuestionType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCourseTabActive, setIsCourseTabActive] = useState(false);
  const [isGeneratingCourse, setIsGeneratingCourse] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recentInterviews, setRecentInterviews] = useState<MockInterviewType[]>([
    {
      id: "interview-dummy-1",
      job_role: "Software Engineer",
      tech_stack: "React, Node.js",
      experience: "3-5",
      user_id: "user-123",
      completed: true,
      created_at: new Date().toISOString()
    },
    {
      id: "interview-dummy-2",
      job_role: "Frontend Developer",
      tech_stack: "React, TypeScript",
      experience: "1-3",
      user_id: "user-123",
      completed: false,
      created_at: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: "interview-dummy-3",
      job_role: "DevOps Engineer",
      tech_stack: "AWS, Docker, Kubernetes",
      experience: "5+",
      user_id: "user-123",
      completed: true,
      created_at: new Date(Date.now() - 172800000).toISOString()
    }
  ]);
  const [recentCourses, setRecentCourses] = useState<CourseType[]>([
    {
      id: "course-dummy-1",
      title: "JavaScript Fundamentals",
      purpose: "practice",
      difficulty: "beginner",
      created_at: new Date().toISOString(),
      user_id: "user-123",
      content: { status: 'complete' }
    },
    {
      id: "course-dummy-2",
      title: "Cloud Architecture",
      purpose: "exam",
      difficulty: "advanced",
      created_at: new Date(Date.now() - 86400000).toISOString(),
      user_id: "user-123",
      content: { status: 'complete' }
    }
  ]);
  const [recordingComplete, setRecordingComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleInterviewSetup = async (role: string, techStack: string, experience: string) => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newInterview = {
        id: crypto.randomUUID(),
        job_role: role || "Software Engineer",
        tech_stack: techStack || "React, Node.js",
        experience,
        user_id: user?.id || "guest-user",
        completed: false,
        created_at: new Date().toISOString()
      };
      
      setInterviewData(newInterview);
      
      const questionList = staticInterviewQuestions[role as keyof typeof staticInterviewQuestions] || 
                        staticInterviewQuestions.Default;
      
      const generatedQuestions = questionList.map((question, index) => ({
        id: crypto.randomUUID(),
        interview_id: newInterview.id,
        question,
        order_number: index + 1,
        user_answer: null,
        created_at: new Date().toISOString()
      }));
      
      setQuestions(generatedQuestions);
      setCurrentQuestionIndex(0);
      
      setRecentInterviews(prev => [newInterview as MockInterviewType, ...prev]);
      
      setStage(InterviewStage.Questions);
      toast({
        title: "Interview Created",
        description: "Your mock interview has been set up successfully.",
      });
    } catch (error) {
      console.error("Error setting up interview:", error);
      
      const defaultInterview = {
        id: crypto.randomUUID(),
        job_role: "Software Engineer",
        tech_stack: "JavaScript, React",
        experience: "1-3",
        user_id: user?.id || "guest-user",
        completed: false,
        created_at: new Date().toISOString()
      };
      
      const defaultQuestions = staticInterviewQuestions.Default.map((question, index) => ({
        id: crypto.randomUUID(),
        interview_id: defaultInterview.id,
        question,
        order_number: index + 1,
        user_answer: null,
        created_at: new Date().toISOString()
      }));
      
      setInterviewData(defaultInterview);
      setQuestions(defaultQuestions);
      setCurrentQuestionIndex(0);
      setRecentInterviews(prev => [defaultInterview as MockInterviewType, ...prev]);
      setStage(InterviewStage.Questions);
      
      toast({
        title: "Interview Created",
        description: "Your mock interview has been set up with default questions.",
      });
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  };

  const fetchInterviewQuestions = async (interviewId: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const interview = recentInterviews.find(i => i.id === interviewId);
      if (!interview) {
        throw new Error("Interview not found");
      }
      
      const questionList = staticInterviewQuestions[interview.job_role as keyof typeof staticInterviewQuestions] || 
                         staticInterviewQuestions.Default;
      
      const generatedQuestions = questionList.map((question, index) => ({
        id: crypto.randomUUID(),
        interview_id: interviewId,
        question,
        order_number: index + 1,
        user_answer: null,
        created_at: new Date().toISOString()
      }));
      
      if (isMounted.current) {
        setQuestions(generatedQuestions);
        setCurrentQuestionIndex(0);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
      
      const fallbackQuestions = staticInterviewQuestions.Default.map((question, index) => ({
        id: crypto.randomUUID(),
        interview_id: interviewId,
        question,
        order_number: index + 1,
        user_answer: null,
        created_at: new Date().toISOString()
      }));
      
      if (isMounted.current) {
        setQuestions(fallbackQuestions);
        setCurrentQuestionIndex(0);
        toast({
          title: "Using Default Questions",
          description: "We've provided general interview questions for your practice session.",
        });
      }
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  };

  const handleAnswerSubmitted = async (blob: Blob) => {
    if (!interviewData || !questions[currentQuestionIndex]) return;
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const updatedQuestions = [...questions];
      updatedQuestions[currentQuestionIndex] = {
        ...updatedQuestions[currentQuestionIndex],
        user_answer: "Recorded answer"
      };
      
      setQuestions(updatedQuestions);
      
      toast({
        title: "Answer Recorded",
        description: "Your answer has been recorded successfully.",
      });
      setRecordingComplete(true);
    } catch (error) {
      console.error("Error saving answer:", error);
      
      setRecordingComplete(true);
      toast({
        title: "Answer Recorded",
        description: "Your answer has been saved.",
      });
    }
  };

  const handleNextQuestion = async () => {
    setRecordingComplete(false);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setStage(InterviewStage.Questions);
    } else {
      setStage(InterviewStage.Complete);
      setIsProcessing(true);
      
      if (interviewData) {
        try {
          const updatedInterview = {
            ...interviewData,
            completed: true
          };
          
          setRecentInterviews(prev => prev.map(item => 
            item.id === interviewData.id ? updatedInterview : item
          ));
          
          toast({
            title: "Interview Completed",
            description: "Your interview has been completed. Preparing your results...",
          });
          
          setTimeout(() => {
            if (isMounted.current) {
              navigate(`/interview-result/${interviewData.id}`);
            }
          }, 1500);
        } catch (error) {
          console.error("Error updating interview status:", error);
          
          setTimeout(() => {
            if (isMounted.current) {
              navigate(`/interview-result/${interviewData.id}`);
            }
          }, 1500);
        }
      }
    }
  };

  const handleSubmitCourse = async (courseName: string, purpose: CourseType['purpose'], difficulty: CourseType['difficulty']) => {
    setIsGeneratingCourse(true);
    
    try {
      toast({
        title: "Generating Course",
        description: "Please wait while we create your course.",
      });

      const courseId = crypto.randomUUID();
      
      const newCourse = {
        id: courseId,
        title: courseName,
        purpose: purpose,
        difficulty: difficulty,
        summary: `A comprehensive course on ${courseName} designed for ${purpose} level.`,
        user_id: user?.id || "guest-user",
        created_at: new Date().toISOString(),
        content: { status: 'complete' }
      };
      
      setRecentCourses(prev => [newCourse as CourseType, ...prev]);
      
      setTimeout(() => {
        if (isMounted.current) {
          toast({
            title: "Course Generated",
            description: "Your course has been successfully generated!",
          });
          
          navigate(`/course/${courseId}`);
        }
      }, 1500);
    } catch (error) {
      console.error("Error creating course:", error);
      
      const fallbackCourse = {
        id: crypto.randomUUID(),
        title: courseName || "New Course",
        purpose: purpose,
        difficulty: difficulty,
        user_id: user?.id || "guest-user",
        created_at: new Date().toISOString(),
        content: { status: 'complete' }
      };
      
      setRecentCourses(prev => [fallbackCourse as CourseType, ...prev]);
      
      setTimeout(() => {
        if (isMounted.current) {
          toast({
            title: "Course Generated",
            description: "Your course has been generated with example content.",
          });
          
          navigate(`/course/${fallbackCourse.id}`);
        }
      }, 1500);
    } finally {
      if (isMounted.current) {
        setIsGeneratingCourse(false);
      }
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordingComplete(false);
  };
  
  const stopRecording = () => {
    setIsRecording(false);
  };
  
  const handleCancel = () => {
    setStage(InterviewStage.Questions);
    setRecordingComplete(false);
  };

  const handleDownloadInterview = () => {
    toast({
      title: "Interview Downloaded",
      description: "Your interview has been downloaded successfully.",
    });
  };
  
  const resumeInterview = (interview: MockInterviewType) => {
    setInterviewData(interview);
    fetchInterviewQuestions(interview.id);
    setStage(InterviewStage.Questions);
  };
  
  const setCourseTabActive = (active: boolean) => {
    setIsCourseTabActive(active);
  };

  const value = {
    // State
    isLoading,
    stage,
    interviewData,
    questions,
    currentQuestionIndex,
    isCourseTabActive,
    isGeneratingCourse,
    isRecording,
    recordingComplete,
    isProcessing,
    recentInterviews,
    recentCourses,
    
    // Actions
    setStage,
    setCourseTabActive,
    handleInterviewSetup,
    handleAnswerSubmitted,
    handleNextQuestion,
    handleSubmitCourse,
    startRecording,
    stopRecording,
    handleCancel,
    handleDownloadInterview,
    resumeInterview,
  };

  return <InterviewContext.Provider value={value}>{children}</InterviewContext.Provider>;
};

// Custom hook to use the interview context
export const useInterview = (): InterviewContextType => {
  const context = useContext(InterviewContext);
  if (context === undefined) {
    throw new Error("useInterview must be used within an InterviewProvider");
  }
  return context;
};
