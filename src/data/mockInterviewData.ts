
// Types for interview data
interface InterviewQuestion {
  question: string;
  answer: string;
  feedback: string;
  score: number;
}

interface TimelineItem {
  time: string;
  note: string;
  score: number;
}

interface Recommendation {
  title: string;
  type: string;
  reason: string;
  link: string;
}

export interface InterviewData {
  id: string;
  title: string;
  date: string;
  duration: string;
  overallScore: number;
  jobRole: string;
  techStack: string[];
  experience: string;
  feedback: {
    technical: {
      score: number;
      strengths: string[];
      weaknesses: string[];
      summary: string;
    };
    communication: {
      score: number;
      strengths: string[];
      weaknesses: string[];
      summary: string;
    };
    nonVerbal: {
      score: number;
      strengths: string[];
      weaknesses: string[];
      summary: string;
    };
  };
  questions: InterviewQuestion[];
  recommendations: Recommendation[];
  videoAnalysis: {
    confidenceScore: number;
    engagementScore: number;
    stressIndicators: number;
    timeline: TimelineItem[];
  };
}

// Define static mock interview data
const mockInterviewData: InterviewData = {
  id: "mock-001",
  title: "Software Engineer Interview (React)",
  date: "2023-05-15",
  duration: "32 minutes",
  overallScore: 78,
  jobRole: "Frontend Developer",
  techStack: ["React", "TypeScript", "Node.js"],
  experience: "3-5 years",
  feedback: {
    technical: {
      score: 82,
      strengths: [
        "Strong understanding of React component lifecycle",
        "Good knowledge of state management patterns",
        "Clear explanation of frontend performance optimization"
      ],
      weaknesses: [
        "Some gaps in TypeScript advanced types knowledge",
        "Limited understanding of modern build tools",
        "Could improve on system design explanations"
      ],
      summary: "Your technical knowledge is solid, especially in React fundamentals and state management. Focus on improving your TypeScript skills and expanding your knowledge of modern build tools and system design principles."
    },
    communication: {
      score: 75,
      strengths: [
        "Clear articulation of complex concepts",
        "Good pacing and tone throughout the interview",
        "Effective use of examples to illustrate points"
      ],
      weaknesses: [
        "Occasionally used vague terminology",
        "Some responses could be more concise",
        "A few instances of filler words that reduced clarity"
      ],
      summary: "Your communication is generally strong, with good articulation and pacing. Work on being more precise with technical terminology and reducing filler words to increase the impact of your responses."
    },
    nonVerbal: {
      score: 70,
      strengths: [
        "Maintained good eye contact",
        "Appropriate facial expressions",
        "Professional demeanor throughout"
      ],
      weaknesses: [
        "Occasional fidgeting indicated nervousness",
        "Body posture could be more confident",
        "Hand gestures sometimes distracting"
      ],
      summary: "Your non-verbal communication was professional, with good eye contact. Focus on reducing nervous fidgeting and adopting a more confident posture to enhance your presence."
    }
  },
  questions: [
    {
      question: "Explain the virtual DOM and how it improves performance in React.",
      answer: "The virtual DOM is a lightweight copy of the actual DOM. When state changes in a React application, React first updates the virtual DOM, compares it with the previous version (diffing), and then only updates the actual DOM with the necessary changes. This approach is more efficient than directly manipulating the DOM for every state change because DOM operations are expensive. By batching and optimizing these updates, React significantly improves performance, especially in complex applications with frequent state changes.",
      feedback: "Good explanation of the virtual DOM concept and its performance benefits. You could strengthen the answer by mentioning specific examples of when this optimization matters most, such as in components that re-render frequently.",
      score: 85
    },
    {
      question: "How would you handle state management in a large React application?",
      answer: "For large React applications, I would implement a state management solution that scales well. Context API is good for simpler applications or for state that doesn't change frequently. For more complex applications, I'd use Redux or Zustand. I prefer Redux when we need strong guarantees about state updates, middleware support, and a well-established ecosystem. I'd structure the store using the ducks pattern or feature-based organization. For server state, I'd integrate React Query to handle caching, background updates, and synchronization.",
      feedback: "Strong answer showing awareness of different state management approaches and their trade-offs. Good mention of React Query for server state management. Consider discussing how you would determine which state belongs in global store versus component-local state.",
      score: 90
    },
    {
      question: "Describe TypeScript's type system and how it helps prevent bugs.",
      answer: "TypeScript adds static typing to JavaScript, allowing developers to define types for variables, function parameters, return values, and more. It helps prevent bugs by catching type-related errors during development rather than at runtime. Features like interfaces, generics, and union types provide powerful ways to describe complex data structures. The type system also enhances developer experience through better autocomplete and documentation.",
      feedback: "Your explanation covers the basics well, but lacks depth on advanced TypeScript features. Consider expanding your knowledge of conditional types, mapped types, and the utility types that TypeScript provides. Also, specific examples of bugs that TypeScript prevents would strengthen this answer.",
      score: 65
    }
  ],
  recommendations: [
    {
      title: "Advanced TypeScript Patterns",
      type: "course",
      reason: "To address gaps in TypeScript knowledge identified during the interview",
      link: "/course/ts-advanced"
    },
    {
      title: "System Design for Frontend Engineers",
      type: "course",
      reason: "To improve understanding of frontend architecture and system design principles",
      link: "/course/fe-system-design"
    },
    {
      title: "Technical Communication Skills",
      type: "practice",
      reason: "To work on more precise and concise communication of technical concepts",
      link: "/mock-interview?focus=communication"
    }
  ],
  videoAnalysis: {
    confidenceScore: 72,
    engagementScore: 85,
    stressIndicators: 40,
    timeline: [
      { time: "00:02:15", note: "Increased confidence when discussing familiar topics", score: 80 },
      { time: "00:08:40", note: "Signs of stress when addressing TypeScript questions", score: 55 },
      { time: "00:15:20", note: "Strong engagement and eye contact during system design explanation", score: 90 },
      { time: "00:22:10", note: "Fidgeting observed during challenging questions", score: 60 },
      { time: "00:28:35", note: "Confident closing statements and questions", score: 85 }
    ]
  }
};

// Create additional interview data for different roles
const fullStackInterviewData: InterviewData = {
  ...mockInterviewData,
  id: "mock-002",
  title: "Full Stack Developer Interview",
  jobRole: "Full Stack Developer",
  techStack: ["React", "Node.js", "MongoDB", "Express"],
  experience: "2-4 years",
  overallScore: 84,
  feedback: {
    ...mockInterviewData.feedback,
    technical: {
      ...mockInterviewData.feedback.technical,
      score: 88,
      strengths: [
        "Excellent understanding of RESTful API design",
        "Strong knowledge of database optimization",
        "Good grasp of frontend-backend integration strategies"
      ],
      weaknesses: [
        "Limited experience with microservices architecture",
        "Could improve knowledge of containerization tools",
        "Some gaps in understanding of caching strategies"
      ],
      summary: "Your technical knowledge is strong in both frontend and backend development. Focus on expanding your understanding of distributed systems architecture and containerization technologies to become a more well-rounded full-stack developer."
    }
  }
};

const dataEngineerInterviewData: InterviewData = {
  ...mockInterviewData,
  id: "mock-003",
  title: "Data Engineer Interview",
  jobRole: "Data Engineer",
  techStack: ["Python", "SQL", "Spark", "AWS"],
  experience: "3-5 years",
  overallScore: 79,
  feedback: {
    ...mockInterviewData.feedback,
    technical: {
      ...mockInterviewData.feedback.technical,
      score: 81,
      strengths: [
        "Strong SQL optimization skills",
        "Good understanding of data pipelines",
        "Solid knowledge of data warehousing concepts"
      ],
      weaknesses: [
        "Limited experience with real-time data processing",
        "Could improve on distributed computing concepts",
        "Some gaps in cloud-based ETL solutions"
      ],
      summary: "Your foundation in data engineering principles is strong. To advance further, focus on deepening your knowledge of distributed data processing frameworks and real-time analytics solutions."
    }
  },
  questions: [
    {
      question: "Explain the difference between star and snowflake schema in data warehousing.",
      answer: "Star schema has a central fact table connected to multiple dimension tables, creating a star-like structure. Snowflake schema extends this by normalizing dimension tables into multiple related tables, resembling a snowflake. Star schema is simpler and typically faster for queries, while snowflake reduces data redundancy but can require more complex joins.",
      feedback: "Good explanation of the basic differences. Consider also discussing specific use cases where one might be preferred over the other, and how these schemas impact query performance and ETL processes.",
      score: 78
    },
    {
      question: "How would you approach optimizing a slow-running SQL query?",
      answer: "I would start by analyzing the execution plan to identify bottlenecks. Common optimization strategies include adding appropriate indexes, rewriting joins to be more efficient, avoiding SELECT *, limiting result sets, and considering query restructuring or materialized views for complex calculations. For large tables, partitioning or sharding might also help.",
      feedback: "Excellent answer demonstrating a systematic approach to query optimization and knowledge of various techniques. You could further strengthen this by mentioning specific monitoring tools you'd use to identify problematic queries.",
      score: 92
    },
    {
      question: "Describe your experience with ETL processes and tools.",
      answer: "I've designed and implemented ETL pipelines using tools like Apache Airflow for orchestration and Spark for processing large datasets. I typically structure pipelines with clear extraction logic from source systems, transformation steps that handle data cleaning and normalization, and loading procedures with appropriate error handling and validation.",
      feedback: "Your answer shows practical experience with ETL processes. To improve, consider discussing how you handle incremental loads, data quality checks, and monitoring for ETL pipelines. Also, expanding on specific challenges you've overcome in ETL implementations would strengthen the response.",
      score: 75
    }
  ]
};

// Map of all interview data
const interviewDataMap: Record<string, InterviewData> = {
  "default": mockInterviewData,
  "mock-001": mockInterviewData,
  "mock-002": fullStackInterviewData,
  "mock-003": dataEngineerInterviewData
};

// Function to get interview data based on ID
export const getInterviewData = (id: string): InterviewData => {
  return interviewDataMap[id] || interviewDataMap["default"];
};
