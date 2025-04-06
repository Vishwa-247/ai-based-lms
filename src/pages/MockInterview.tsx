
import React from "react";
import { Button } from "@/components/ui/button";
import InterviewSetup from "@/components/interview/InterviewSetup";
import VideoRecorder from "@/components/interview/VideoRecorder";
import Container from "@/components/ui/Container";
import { ChevronLeft, ChevronRight, Download, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CourseForm from "@/components/course/CourseForm";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import { InterviewStage, useInterview } from "@/context/InterviewContext";

const MockInterview = () => {
  const {
    isLoading,
    stage,
    questions,
    currentQuestionIndex,
    isCourseTabActive,
    isGeneratingCourse,
    isRecording,
    recordingComplete,
    isProcessing,
    recentInterviews,
    recentCourses,
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
    interviewData
  } = useInterview();

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
                        window.location.href = `/interview-result/${interview.id}`;
                      } else {
                        resumeInterview(interview);
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
          onDismissed={() => {}}
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
            onClick={() => setCourseTabActive(false)}
          >
            Mock Interview
          </Button>
          <Button 
            variant={isCourseTabActive ? "default" : "outline"} 
            onClick={() => setCourseTabActive(true)}
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
                          onClick={() => window.location.href = `/course/${course.id}`}
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
