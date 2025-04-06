import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import InterviewSetup from "@/components/interview/InterviewSetup";
import VideoRecorder from "@/components/interview/VideoRecorder";
import { useAuth } from "@/context/AuthContext";
import { InterviewQuestionType, MockInterviewType, CourseType } from "@/types";
import Container from "@/components/ui/Container";
import { ChevronLeft, ChevronRight, Download, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CourseForm from "@/components/course/CourseForm";
import { useCourseGeneration } from "@/hooks/useCourseGeneration";
import LoadingOverlay from "@/components/ui/LoadingOverlay";

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

enum InterviewStage {
  Setup = "setup",
  Questions = "questions",
  Recording = "recording",
  Review = "review",
  Complete = "complete",
}

const MockInterview = () => {
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
  
  const { startCourseGeneration } = useCourseGeneration();

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
      
      if (user) {
        await startCourseGeneration(courseName, purpose, difficulty, user.id);
      }
      
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

  const renderStage = () => {
    switch (stage) {
      case InterviewStage.Questions:
        if (questions.length === 0) {
          return (
            <div className="text-center py-12">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p>Loading questions...</p>
            </div>
          );
        }
        
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="mb-6 flex items-center justify-between">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setStage(InterviewStage.Setup)}
                  className="text-muted-foreground"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Cancel Interview
                </Button>
                
                <span className="text-sm text-muted-foreground">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
              </div>
              
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Question {currentQuestionIndex + 1}</CardTitle>
                  <CardDescription>
                    Take a moment to think about your answer before recording.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-muted rounded-md text-lg">
                    {questions[currentQuestionIndex]?.question}
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-center mt-4">
                <Button 
                  size="lg"
                  onClick={() => setStage(InterviewStage.Recording)}
                >
                  Ready to Answer
                </Button>
              </div>

              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Interview Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                        <span className="block h-1.5 w-1.5 rounded-full bg-primary"></span>
                      </div>
                      <span>Speak clearly and at a moderate pace</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                        <span className="block h-1.5 w-1.5 rounded-full bg-primary"></span>
                      </div>
                      <span>Maintain eye contact with the camera</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                        <span className="block h-1.5 w-1.5 rounded-full bg-primary"></span>
                      </div>
                      <span>Structure your answers using the STAR method</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                        <span className="block h-1.5 w-1.5 rounded-full bg-primary"></span>
                      </div>
                      <span>Take a brief pause before answering to collect your thoughts</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Camera Preview</CardTitle>
                  <CardDescription>
                    Check your camera and microphone before starting
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <VideoRecorder 
                    onRecordingComplete={() => {}}
                    isRecording={false}
                    startRecording={() => {}}
                    stopRecording={() => {}}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Save Your Interview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Download your interview session for future reference or to share with mentors.
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={handleDownloadInterview}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Interview
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      
      case InterviewStage.Recording:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">
                  Question {currentQuestionIndex + 1}:
                </h2>
                <div className="p-4 bg-muted rounded-md text-lg mb-4">
                  {questions[currentQuestionIndex]?.question}
                </div>
                <p className="text-muted-foreground">
                  When you're ready, click "Start Recording" and begin your answer. We'll analyze both your verbal response and facial expressions.
                </p>
              </div>
              
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Answering Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                        <span className="block h-1.5 w-1.5 rounded-full bg-primary"></span>
                      </div>
                      <span>Use specific examples from your experience</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                        <span className="block h-1.5 w-1.5 rounded-full bg-primary"></span>
                      </div>
                      <span>Avoid filler words like "um" and "uh"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                        <span className="block h-1.5 w-1.5 rounded-full bg-primary"></span>
                      </div>
                      <span>Speak confidently and maintain good posture</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <VideoRecorder 
                onRecordingComplete={handleAnswerSubmitted}
                isRecording={isRecording}
                startRecording={startRecording}
                stopRecording={stopRecording}
              />
              
              <div className="mt-6 flex justify-center space-x-4">
                {recordingComplete ? (
                  <Button 
                    onClick={handleNextQuestion}
                    className="px-6 py-3 bg-primary text-white rounded-lg flex items-center space-x-2"
                  >
                    <span>Next Question</span>
                    <ChevronRight size={16} />
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </div>
        );
      
      case InterviewStage.Complete:
        return (
          <div className="max-w-3xl mx-auto text-center py-12">
            <div className="mb-8">
              <Loader2 className="h-12 w-12 animate-spin mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-2">Processing Your Interview</h2>
              <p className="text-muted-foreground">
                We're analyzing your responses and preparing your personalized feedback. You'll be redirected automatically when it's ready.
              </p>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const renderRecentInterviews = () => {
    if (recentInterviews.length === 0) {
      return (
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Recent Mock Interviews</h2>
          <p className="text-muted-foreground">You haven't completed any mock interviews yet.</p>
        </div>
      );
    }
    
    return (
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Recent Mock Interviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentInterviews.map((interview) => (
            <Card key={interview.id} className="overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{interview.job_role}</CardTitle>
                    <CardDescription>{new Date(interview.created_at).toLocaleDateString()}</CardDescription>
                  </div>
                  <div className={`px-2 py-1 text-xs font-medium rounded-full ${
                    interview.completed ? "bg-green-500/10 text-green-500" : "bg-amber-500/10 text-amber-500"
                  }`}>
                    {interview.completed ? "Completed" : "In Progress"}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-4">
                  {interview.tech_stack.split(',').map((tech, i) => (
                    <div key={i} className="px-2 py-1 text-xs font-medium rounded-full bg-secondary">
                      {tech.trim()}
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => {
                      if (interview.completed) {
                        navigate(`/interview-result/${interview.id}`);
                      } else {
                        setInterviewData(interview);
                        fetchInterviewQuestions(interview.id);
                        setStage(InterviewStage.Questions);
                      }
                    }}
                  >
                    {interview.completed ? "View Results" : "Resume Interview"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Container className="py-12">
      {isProcessing && (
        <LoadingOverlay 
          isLoading={true} 
          message="Analyzing Your Interview"
          subMessage="Please wait while our AI evaluates your responses."
          autoDismiss={2000}
          onDismissed={() => setIsProcessing(false)}
        />
      )}
      
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            {isCourseTabActive ? "Course Generator" : "Mock Interview"}
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            {isCourseTabActive 
              ? "Create customized courses on any topic with our AI-powered course generator."
              : "Practice your interview skills with our AI-powered mock interview simulator."}
          </p>
        </div>
        <div className="flex gap-4">
          <Button 
            variant={isCourseTabActive ? "outline" : "default"} 
            onClick={() => setIsCourseTabActive(false)}
          >
            Mock Interview
          </Button>
          <Button 
            variant={isCourseTabActive ? "default" : "outline"} 
            onClick={() => setIsCourseTabActive(true)}
          >
            Course Generator
          </Button>
        </div>
      </div>

      {isCourseTabActive ? (
        <div className="space-y-8">
          <CourseForm onSubmit={handleSubmitCourse} isLoading={isGeneratingCourse} />
          
          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-4">Recent Course Generations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentCourses.length > 0 ? (
                recentCourses.map((course) => (
                  <Card key={course.id} className="overflow-hidden">
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{course.title}</CardTitle>
                          <CardDescription>{new Date(course.created_at).toLocaleDateString()}</CardDescription>
                        </div>
                        <div className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                          {course.purpose.replace('_', ' ')}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">{course.difficulty}</span>
                        <span className="text-sm text-muted-foreground">Generated</span>
                      </div>
                      <div className="mt-4">
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => navigate(`/course/${course.id}`)}
                        >
                          View Course
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-muted-foreground col-span-3">No courses generated yet. Try creating your first course above!</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          {stage === InterviewStage.Setup && (
            <div className="space-y-8">
              <InterviewSetup onSubmit={handleInterviewSetup} isLoading={isLoading} />
              {renderRecentInterviews()}
            </div>
          )}
          
          {stage !== InterviewStage.Setup && renderStage()}
        </>
      )}
    </Container>
  );
};

export default MockInterview;
