
import { supabase } from '@/integrations/supabase/client';
import { CourseType, ChapterType, FlashcardType, McqType, QnaType, MockInterviewType, InterviewQuestionType, InterviewAnalysisType } from '@/types';

// Define the StudyMaterial type that's missing
export interface StudyMaterial {
  id: number;
  course_id: string;
  course_type: string;
  topic: string;
  difficulty_level: string;
  created_by: string;
  status: string;
  course_layout?: any;
  created_at: string;
}

const staticCourseData = {
  "Network Security": {
    beginner: {
      title: "Network Security Fundamentals",
      chapters: [
        { title: "Introduction to Network Security", content: "This chapter covers the basics of network security, including key terminology, common threats, and foundational security principles." },
        { title: "Network Security Architecture", content: "Learn about the layered approach to network security and how different security controls work together." },
        { title: "Authentication and Access Control", content: "Understand the basics of authentication systems and how access controls protect network resources." },
        { title: "Common Network Attacks", content: "Explore the most common types of network attacks and their impact on organizations." },
        { title: "Basic Security Tools", content: "An introduction to essential tools for monitoring and maintaining network security." }
      ],
      flashcards: [
        { question: "What is the principle of least privilege?", answer: "Providing users with only the minimum levels of access needed to perform their job functions" },
        { question: "What is a firewall?", answer: "A network security device that monitors and filters incoming and outgoing network traffic" },
        { question: "Define authentication", answer: "The process of verifying the identity of a user or system" },
        { question: "What is encryption?", answer: "The process of converting information into a code to prevent unauthorized access" },
        { question: "What is a DDoS attack?", answer: "A distributed denial-of-service attack that attempts to make a server unavailable by overwhelming it with traffic from multiple sources" }
      ]
    },
    intermediate: {
      title: "Advanced Network Security Practices",
      chapters: [
        { title: "Security Protocols and Standards", content: "Deep dive into network security protocols including TLS/SSL, IPsec, and secure routing protocols." },
        { title: "Intrusion Detection and Prevention", content: "Learn about systems that monitor network traffic for suspicious activity and take automated protective actions." },
        { title: "VPN Technologies", content: "Understanding different VPN architectures and their implementation for secure remote access." },
        { title: "Network Segmentation Strategies", content: "Best practices for dividing networks into subnetworks to improve security and performance." },
        { title: "Incident Response for Network Breaches", content: "Methodologies for responding to and recovering from network security incidents." }
      ],
      flashcards: [
        { question: "What is the difference between IDS and IPS?", answer: "IDS (Intrusion Detection System) monitors and alerts on potential threats, while IPS (Intrusion Prevention System) actively blocks identified threats" },
        { question: "What is a zero-day vulnerability?", answer: "A software security flaw that is unknown to the vendor and has no available patch" },
        { question: "Explain defense in depth", answer: "A security strategy that employs multiple layers of defense throughout an IT system" },
        { question: "What is network segmentation?", answer: "Dividing a computer network into smaller parts to improve security and performance" },
        { question: "What is a security operations center (SOC)?", answer: "A facility that houses an information security team responsible for monitoring and analyzing an organization's security posture" }
      ]
    },
    advanced: {
      title: "Enterprise Network Security Strategies",
      chapters: [
        { title: "Advanced Threat Protection", content: "Sophisticated techniques for identifying and mitigating complex and persistent security threats." },
        { title: "Security Information and Event Management", content: "Implementation of SIEM systems for real-time analysis of security alerts." },
        { title: "Zero Trust Architecture", content: "Designing networks based on the principle that threats exist both outside and inside the network perimeter." },
        { title: "Cloud Security Integration", content: "Extending network security principles to cloud environments and hybrid infrastructures." },
        { title: "Regulatory Compliance and Network Security", content: "Aligning security controls with industry regulations like GDPR, HIPAA, and PCI DSS." }
      ],
      flashcards: [
        { question: "What is a security information and event management (SIEM) system?", answer: "A tool that provides real-time analysis of security alerts generated by applications and network hardware" },
        { question: "Define zero trust architecture", answer: "A security concept centered on the belief that organizations should not automatically trust anything inside or outside its perimeters" },
        { question: "What is a security orchestration, automation, and response (SOAR) platform?", answer: "Technology that enables organizations to collect security threats data and alerts from different sources and respond to low-level security events without human assistance" },
        { question: "What is a honeypot in network security?", answer: "A security mechanism set to detect, deflect, or counteract attempts at unauthorized use of information systems" },
        { question: "Explain the concept of microsegmentation", answer: "A security technique that creates secure zones in data centers and cloud deployments to isolate workloads from one another and secure them individually" }
      ]
    }
  },
  "Machine Learning": {
    beginner: {
      title: "Introduction to Machine Learning",
      chapters: [
        { title: "What is Machine Learning?", content: "An overview of machine learning concepts, applications, and basic terminology." },
        { title: "Types of Machine Learning", content: "Understanding supervised, unsupervised, and reinforcement learning approaches." },
        { title: "Data Preprocessing Fundamentals", content: "Basic techniques for cleaning and preparing data for machine learning models." },
        { title: "Linear Regression", content: "Introduction to one of the simplest and most fundamental machine learning algorithms." },
        { title: "Model Evaluation Basics", content: "Methods for evaluating the performance of machine learning models." }
      ],
      flashcards: [
        { question: "What is supervised learning?", answer: "A type of machine learning where the algorithm learns from labeled training data and makes predictions based on that data" },
        { question: "What is the purpose of training data?", answer: "Data used to teach a machine learning model to make predictions or decisions" },
        { question: "What is overfitting?", answer: "When a model learns the training data too well, including its noise and outliers, performing poorly on new data" },
        { question: "What is a feature in machine learning?", answer: "An individual measurable property or characteristic of a phenomenon being observed" },
        { question: "What is the bias-variance tradeoff?", answer: "The conflict in trying to simultaneously minimize two sources of error that prevent supervised learning algorithms from generalizing beyond their training set" }
      ]
    },
    intermediate: {
      title: "Applied Machine Learning Techniques",
      chapters: [
        { title: "Decision Trees and Random Forests", content: "Understanding tree-based algorithms and ensemble methods for classification and regression." },
        { title: "Support Vector Machines", content: "Exploring the mathematics behind SVMs and their applications." },
        { title: "Neural Networks Fundamentals", content: "Introduction to artificial neural networks, activation functions, and backpropagation." },
        { title: "Feature Engineering", content: "Advanced techniques for creating new features and selecting the most important ones." },
        { title: "Cross-Validation and Hyperparameter Tuning", content: "Methods for optimizing model performance through parameter selection." }
      ],
      flashcards: [
        { question: "What is a support vector machine?", answer: "A supervised learning algorithm that finds a hyperplane in an N-dimensional space that distinctly classifies data points" },
        { question: "What is an activation function in a neural network?", answer: "A function that determines the output of a neural network node based on its inputs" },
        { question: "What is k-fold cross-validation?", answer: "A resampling procedure used to evaluate machine learning models where the dataset is split into k subsets, with each subset used once as the validation data" },
        { question: "What is feature engineering?", answer: "The process of using domain knowledge to create new variables that make machine learning algorithms work better" },
        { question: "What is a confusion matrix?", answer: "A table used to describe the performance of a classification model by showing the counts of true positives, false positives, true negatives, and false negatives" }
      ]
    },
    advanced: {
      title: "Deep Learning and Advanced ML Concepts",
      chapters: [
        { title: "Convolutional Neural Networks", content: "Architecture and applications of CNNs for image processing tasks." },
        { title: "Recurrent Neural Networks and LSTM", content: "Understanding sequence modeling and applications in natural language processing." },
        { title: "Generative Adversarial Networks", content: "Exploring GANs and their applications in generating synthetic data." },
        { title: "Reinforcement Learning Advanced Concepts", content: "Deep reinforcement learning algorithms and real-world applications." },
        { title: "Deploying Machine Learning in Production", content: "Best practices for model deployment, monitoring, and maintenance." }
      ],
      flashcards: [
        { question: "What is a convolutional neural network?", answer: "A class of deep neural networks most commonly applied to analyzing visual imagery, designed to automatically and adaptively learn spatial hierarchies of features" },
        { question: "What is LSTM?", answer: "Long Short-Term Memory networks are a type of recurrent neural network capable of learning long-term dependencies" },
        { question: "What are Generative Adversarial Networks?", answer: "A class of machine learning systems where two neural networks contest with each other to generate new, synthetic instances of data that can pass for real data" },
        { question: "What is transfer learning?", answer: "A machine learning technique where a model developed for one task is reused as the starting point for a model on a second task" },
        { question: "What is model quantization?", answer: "The process of reducing the precision of the weights in a neural network to improve computational efficiency and reduce model size" }
      ]
    }
  },
  "Data Mining": {
    beginner: {
      title: "Fundamentals of Data Mining",
      chapters: [
        { title: "Introduction to Data Mining", content: "Basic concepts, applications, and the data mining process." },
        { title: "Data Preprocessing", content: "Techniques for cleaning, integrating, and transforming data for mining." },
        { title: "Exploratory Data Analysis", content: "Methods for understanding data characteristics through visualization and statistical summaries." },
        { title: "Association Rule Learning", content: "Discovering interesting relationships between variables in large databases." },
        { title: "Basic Clustering Techniques", content: "Introduction to methods for grouping similar data points together." }
      ],
      flashcards: [
        { question: "What is data mining?", answer: "The process of discovering patterns in large data sets involving methods at the intersection of machine learning, statistics, and database systems" },
        { question: "What is the CRISP-DM methodology?", answer: "Cross Industry Standard Process for Data Mining - a process model that describes commonly used approaches that data mining experts use to tackle problems" },
        { question: "What is data cleaning?", answer: "The process of detecting and correcting (or removing) corrupt or inaccurate records from a dataset" },
        { question: "What is an outlier?", answer: "A data point that differs significantly from other observations" },
        { question: "What is association rule learning?", answer: "A rule-based machine learning method for discovering interesting relations between variables in large databases" }
      ]
    },
    intermediate: {
      title: "Advanced Data Mining Applications",
      chapters: [
        { title: "Classification Methods", content: "Decision trees, Naive Bayes, and other algorithms for predictive modeling." },
        { title: "Advanced Clustering Algorithms", content: "DBSCAN, hierarchical clustering, and density-based approaches." },
        { title: "Dimensionality Reduction", content: "PCA, t-SNE, and other techniques for reducing data complexity." },
        { title: "Time Series Analysis", content: "Methods for analyzing time-based data to extract meaningful statistics and patterns." },
        { title: "Text Mining Fundamentals", content: "Techniques for extracting useful information from unstructured text data." }
      ],
      flashcards: [
        { question: "What is DBSCAN clustering?", answer: "Density-Based Spatial Clustering of Applications with Noise - a density-based clustering algorithm that groups together points that are closely packed together" },
        { question: "What is Principal Component Analysis (PCA)?", answer: "A statistical procedure that uses an orthogonal transformation to convert a set of observations of possibly correlated variables into a set of values of linearly uncorrelated variables" },
        { question: "What is a decision boundary?", answer: "The region of a problem space in which the output label of a classifier is ambiguous" },
        { question: "What is the TF-IDF statistic?", answer: "Term Frequency-Inverse Document Frequency - a numerical statistic intended to reflect how important a word is to a document in a collection or corpus" },
        { question: "What is anomaly detection?", answer: "The identification of rare items, events or observations which raise suspicions by differing significantly from the majority of the data" }
      ]
    },
    advanced: {
      title: "Enterprise Data Mining Strategies",
      chapters: [
        { title: "Deep Learning for Data Mining", content: "Applying neural networks to extract patterns from complex datasets." },
        { title: "Big Data Mining Techniques", content: "Strategies for mining extremely large datasets using distributed computing." },
        { title: "Network and Graph Mining", content: "Methods for analyzing connections and relationships in network data." },
        { title: "Advanced Text and Web Mining", content: "Sentiment analysis, topic modeling, and web content extraction techniques." },
        { title: "Ethical Implications and Privacy in Data Mining", content: "Addressing privacy concerns, bias, and ethical considerations in data mining projects." }
      ],
      flashcards: [
        { question: "What is PageRank?", answer: "An algorithm used by Google Search to rank web pages in their search engine results by analyzing the link structure of the web" },
        { question: "What is community detection in network analysis?", answer: "The task of identifying groups of nodes that are more densely connected to each other than to the rest of the network" },
        { question: "What is latent Dirichlet allocation?", answer: "A generative statistical model that allows sets of observations to be explained by unobserved groups, commonly used for topic modeling" },
        { question: "What is differential privacy?", answer: "A system for publicly sharing information about a dataset while withholding information about individuals in the dataset" },
        { question: "What is the MapReduce programming model?", answer: "A programming model for processing and generating large datasets with a parallel, distributed algorithm on a cluster" }
      ]
    }
  },
  "Full Stack Development": {
    beginner: {
      title: "Introduction to Full Stack Development",
      chapters: [
        { title: "Understanding the Web Stack", content: "Overview of client-side, server-side, and database technologies that make up a web application." },
        { title: "Front-end Fundamentals", content: "Introduction to HTML, CSS, and JavaScript for building user interfaces." },
        { title: "Back-end Basics", content: "Server-side programming concepts and introduction to a back-end language like Node.js or Python." },
        { title: "Database Fundamentals", content: "Introduction to databases, SQL, and basic data modeling." },
        { title: "Building Your First Web Application", content: "Step-by-step guide to creating a simple full-stack application." }
      ],
      flashcards: [
        { question: "What is the difference between front-end and back-end development?", answer: "Front-end development focuses on what users see and interact with in a browser, while back-end development involves server-side logic and databases" },
        { question: "What is responsive web design?", answer: "An approach to web design that makes web pages render well on a variety of devices and window or screen sizes" },
        { question: "What is a RESTful API?", answer: "An architectural style for an application program interface that uses HTTP requests to access and use data" },
        { question: "What is a database schema?", answer: "The structure that represents the logical view of the entire database, defining how the data is organized and how the relations among them are associated" },
        { question: "What is version control?", answer: "A system that records changes to a file or set of files over time so that you can recall specific versions later" }
      ]
    },
    intermediate: {
      title: "Modern Full Stack Development",
      chapters: [
        { title: "Modern JavaScript and Frameworks", content: "Working with React, Vue, or Angular for building dynamic UIs." },
        { title: "Server-side Frameworks", content: "Using Express.js, Django, or similar frameworks for building robust back-ends." },
        { title: "NoSQL Databases", content: "Working with MongoDB, Firebase, or other document-oriented databases." },
        { title: "API Development and Authentication", content: "Creating secure APIs and implementing authentication strategies." },
        { title: "DevOps for Developers", content: "Introduction to CI/CD, containerization, and deployment strategies." }
      ],
      flashcards: [
        { question: "What is a single-page application (SPA)?", answer: "A web application or website that interacts with the user by dynamically rewriting the current page rather than loading entire new pages from the server" },
        { question: "What is a JWT?", answer: "JSON Web Token - a compact, URL-safe means of representing claims to be transferred between two parties" },
        { question: "What is middleware in the context of web servers?", answer: "Software that acts as a bridge between an operating system or database and applications, particularly on a network" },
        { question: "What is Docker?", answer: "A platform for developing, shipping, and running applications inside containers" },
        { question: "What is GraphQL?", answer: "A query language for APIs and a runtime for fulfilling those queries with your existing data" }
      ]
    },
    advanced: {
      title: "Enterprise Full Stack Architecture",
      chapters: [
        { title: "Microservices Architecture", content: "Designing and implementing scalable microservice-based applications." },
        { title: "Advanced State Management", content: "Working with Redux, Vuex, or similar state management libraries for complex applications." },
        { title: "Real-time Applications", content: "Building applications with WebSockets, Socket.io, or similar technologies." },
        { title: "Performance Optimization", content: "Techniques for optimizing both front-end and back-end performance." },
        { title: "Security Best Practices", content: "Advanced security considerations for enterprise applications." }
      ],
      flashcards: [
        { question: "What is a microservice architecture?", answer: "An architectural style that structures an application as a collection of services that are highly maintainable and testable, loosely coupled, independently deployable, and organized around business capabilities" },
        { question: "What is server-side rendering (SSR)?", answer: "The process of rendering web pages on the server and sending fully rendered pages to the client" },
        { question: "What is a service mesh?", answer: "A dedicated infrastructure layer for handling service-to-service communication for microservices-based applications" },
        { question: "What is the OWASP Top Ten?", answer: "A standard awareness document for developers and web application security that represents a broad consensus about the most critical security risks to web applications" },
        { question: "What is code splitting?", answer: "A feature that allows you to split your code into various bundles which can then be loaded on demand or in parallel" }
      ]
    }
  }
};

const fromTable = <T>(tableName: string) => {
  return (supabase as any).from(tableName);
};

export const createCourse = async (
  title: string,
  purpose: CourseType['purpose'],
  difficulty: CourseType['difficulty'],
  summary: string,
  userId: string
): Promise<CourseType> => {
  const { data, error } = await fromTable<CourseType>('courses')
    .insert({
      title,
      purpose,
      difficulty,
      summary,
      user_id: userId,
      content: { status: 'pending' } // Add a status to indicate it's newly created
    })
    .select()
    .single();

  if (error) throw error;
  return data as CourseType;
};

export const getCourseById = async (courseId: string): Promise<CourseType> => {
  const { data, error } = await fromTable<CourseType>('courses')
    .select('*')
    .eq('id', courseId)
    .single();

  if (error) throw error;
  return data as CourseType;
};

export const getAllCourses = async (userId: string): Promise<CourseType[]> => {
  const { data, error } = await fromTable<CourseType>('courses')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
  return data as CourseType[] || [];
};

export const getUserCourses = async (): Promise<CourseType[]> => {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return [];
  
  return getAllCourses(userData.user.id);
};

export const checkCourseGenerationStatus = async (courseId: string): Promise<{
  isComplete: boolean;
  status: string;
  error?: string;
}> => {
  const { data, error } = await fromTable<CourseType>('courses')
    .select('content')
    .eq('id', courseId)
    .single();
    
  if (error) throw error;
  
  if (!data?.content || typeof data.content !== 'object') {
    return { isComplete: false, status: 'unknown' };
  }
  
  const content = data.content as any;
  return { 
    isComplete: content.status === 'complete',
    status: content.status || 'unknown',
    error: content.message
  };
};

export const updateCourseContent = async (
  courseId: string,
  content: any,
  summary?: string
): Promise<void> => {
  const updates: any = { content };
  if (summary) {
    updates.summary = summary;
  }
  
  const { error } = await fromTable<CourseType>('courses')
    .update(updates)
    .eq('id', courseId);
    
  if (error) throw error;
};

export const createChapters = async (
  courseId: string,
  chapters: { title: string; content: string; order_number: number }[]
): Promise<ChapterType[]> => {
  const chaptersWithCourseId = chapters.map(chapter => ({
    ...chapter,
    course_id: courseId
  }));

  const { data, error } = await fromTable<ChapterType>('chapters')
    .insert(chaptersWithCourseId)
    .select();

  if (error) throw error;
  return data as ChapterType[];
};

export const getChaptersByCourseId = async (courseId: string): Promise<ChapterType[]> => {
  const { data, error } = await fromTable<ChapterType>('chapters')
    .select('*')
    .eq('course_id', courseId)
    .order('order_number', { ascending: true });

  if (error) throw error;
  return data as ChapterType[];
};

export const createFlashcards = async (
  courseId: string,
  flashcards: { question: string; answer: string }[]
): Promise<FlashcardType[]> => {
  const flashcardsWithCourseId = flashcards.map(flashcard => ({
    ...flashcard,
    course_id: courseId
  }));

  const { data, error } = await fromTable<FlashcardType>('flashcards')
    .insert(flashcardsWithCourseId)
    .select();

  if (error) throw error;
  return data as FlashcardType[];
};

export const getFlashcardsByCourseId = async (courseId: string): Promise<FlashcardType[]> => {
  const { data, error } = await fromTable<FlashcardType>('flashcards')
    .select('*')
    .eq('course_id', courseId);

  if (error) throw error;
  return data as FlashcardType[];
};

export const createMcqs = async (
  courseId: string,
  mcqs: { question: string; options: string[]; correct_answer: string }[]
): Promise<McqType[]> => {
  const mcqsWithCourseId = mcqs.map(mcq => ({
    course_id: courseId,
    question: mcq.question,
    options: mcq.options,
    correct_answer: mcq.correct_answer
  }));

  const { data, error } = await fromTable<McqType>('mcqs')
    .insert(mcqsWithCourseId)
    .select();

  if (error) throw error;
  return data as McqType[];
};

export const getMcqsByCourseId = async (courseId: string): Promise<McqType[]> => {
  const { data, error } = await fromTable<McqType>('mcqs')
    .select('*')
    .eq('course_id', courseId);

  if (error) throw error;
  
  return data as McqType[];
};

export const createQnas = async (
  courseId: string,
  qnas: { question: string; answer: string }[]
): Promise<QnaType[]> => {
  const qnasWithCourseId = qnas.map(qna => ({
    ...qna,
    course_id: courseId
  }));

  const { data, error } = await fromTable<QnaType>('qna')
    .insert(qnasWithCourseId)
    .select();

  if (error) throw error;
  return data as QnaType[];
};

export const getQnasByCourseId = async (courseId: string): Promise<QnaType[]> => {
  const { data, error } = await fromTable<QnaType>('qna')
    .select('*')
    .eq('course_id', courseId);

  if (error) throw error;
  return data as QnaType[];
};

export const createMockInterview = async (
  jobRole: string,
  techStack: string,
  experience: string
): Promise<MockInterviewType> => {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) throw new Error("User not authenticated");

  const { data, error } = await fromTable<MockInterviewType>('mock_interviews')
    .insert({
      job_role: jobRole,
      tech_stack: techStack,
      experience: experience,
      user_id: userData.user.id,
      completed: false
    })
    .select()
    .single();

  if (error) throw error;
  return data as MockInterviewType;
};

export const getUserMockInterviews = async (): Promise<MockInterviewType[]> => {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return [];
  
  const { data, error } = await fromTable<MockInterviewType>('mock_interviews')
    .select('*')
    .eq('user_id', userData.user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching interviews:", error);
    return [];
  }
  return data as MockInterviewType[] || [];
};

export const getMockInterviewById = async (interviewId: string): Promise<MockInterviewType> => {
  const { data, error } = await fromTable<MockInterviewType>('mock_interviews')
    .select('*')
    .eq('id', interviewId)
    .single();

  if (error) throw error;
  return data as MockInterviewType;
};

export const updateMockInterviewCompleted = async (interviewId: string): Promise<void> => {
  const { error } = await fromTable<MockInterviewType>('mock_interviews')
    .update({
      completed: true
    })
    .eq('id', interviewId);

  if (error) throw error;
};

export const createInterviewQuestions = async (
  interviewId: string,
  questions: {
    question: string;
    order_number: number;
  }[]
): Promise<InterviewQuestionType[]> => {
  const questionsWithInterviewId = questions.map(q => ({
    interview_id: interviewId,
    order_number: q.order_number,
    question: q.question,
    user_answer: null
  }));

  const { data, error } = await fromTable<InterviewQuestionType>('interview_questions')
    .insert(questionsWithInterviewId)
    .select();

  if (error) throw error;
  return data as InterviewQuestionType[];
};

export const getInterviewQuestionsByInterviewId = async (interviewId: string): Promise<InterviewQuestionType[]> => {
  const { data, error } = await fromTable<InterviewQuestionType>('interview_questions')
    .select('*')
    .eq('interview_id', interviewId)
    .order('order_number', { ascending: true });

  if (error) throw error;
  return data as InterviewQuestionType[];
};

export const updateInterviewQuestionAnswer = async (questionId: string, answer: string): Promise<void> => {
  const { error } = await fromTable<InterviewQuestionType>('interview_questions')
    .update({
      user_answer: answer
    })
    .eq('id', questionId);

  if (error) throw error;
};

export const createInterviewAnalysis = async (
  interviewId: string,
  facialExpressionData: {
    confident: number;
    stressed: number;
    hesitant: number;
    nervous: number;
    excited: number;
  },
  pronunciationFeedback: string,
  technicalFeedback: string,
  languageFeedback: string,
  courseRecommendations: {
    title: string;
    description: string;
    link?: string;
  }[]
): Promise<InterviewAnalysisType> => {
  const { data, error } = await fromTable<InterviewAnalysisType>('interview_analysis')
    .insert({
      interview_id: interviewId,
      facial_data: facialExpressionData,
      pronunciation_feedback: pronunciationFeedback,
      technical_feedback: technicalFeedback,
      language_feedback: languageFeedback,
      recommendations: courseRecommendations
    })
    .select()
    .single();

  if (error) throw error;
  return data as InterviewAnalysisType;
};

export const getInterviewAnalysisByInterviewId = async (interviewId: string): Promise<InterviewAnalysisType> => {
  const { data, error } = await fromTable<InterviewAnalysisType>('interview_analysis')
    .select('*')
    .eq('interview_id', interviewId)
    .single();

  if (error) throw error;
  return data as InterviewAnalysisType;
};

export const analyzeSpeech = async (
  audioBlob: Blob,
  jobRole: string
): Promise<{
  clarity: number;
  confidence: number;
  fluency: number;
  accent: number;
  grammar: number;
  feedback: string;
}> => {
  return {
    clarity: Math.random() * 60 + 40,
    confidence: Math.random() * 60 + 40,
    fluency: Math.random() * 60 + 40,
    accent: Math.random() * 60 + 40,
    grammar: Math.random() * 60 + 40,
    feedback: "Your speech was clear, but try to slow down for technical explanations. Work on eliminating filler words like 'um' and 'ah'."
  };
};

export const analyzeFacialExpression = async (
  imageBlob: Blob
): Promise<{
  confident: number;
  stressed: number;
  hesitant: number;
  nervous: number;
  excited: number;
}> => {
  return {
    confident: Math.random() * 0.7 + 0.3,
    stressed: Math.random() * 0.5,
    hesitant: Math.random() * 0.6,
    nervous: Math.random() * 0.4,
    excited: Math.random() * 0.5 + 0.2
  };
};

export const generateCourseContent = async (
  courseId: string,
  topic: string, 
  purpose: CourseType['purpose'], 
  difficulty: CourseType['difficulty']
) => {
  try {
    // Use static data instead of OpenAI
    console.log("Using static data instead of OpenAI for course generation");
    return {
      success: true,
      text: `# SUMMARY\nThis is a generated course on ${topic} for ${purpose} at ${difficulty} level.\n\n# CHAPTERS\n## Introduction\nIntroduction to the topic.\n\n## Core Concepts\nDiscussion of core concepts.\n\n## Advanced Applications\nExploration of advanced applications.`
    };
  } catch (error) {
    console.error("Error generating course content:", error);
    return {
      success: false,
      error: "Failed to generate course content",
      text: "Failed to generate course content. Please try again later."
    };
  }
};

export const generateInterviewQuestions = async (
  jobRole: string,
  techStack: string,
  experience: string,
  questionCount: number = 5
) => {
  try {
    // Use static data instead of OpenAI
    console.log("Using static data instead of OpenAI for interview questions");
    
    const questions = [
      `Explain your experience with ${techStack} and how you've used it in previous projects.`,
      `What are the main design patterns you apply when working with ${techStack}?`,
      `How would you implement error handling in a ${jobRole} position using ${techStack}?`,
      `Describe a challenging problem you solved using ${techStack} and your approach to solving it.`,
      `How do you keep up with the latest developments in ${techStack} and related technologies?`,
      `What testing methodologies do you use for ${techStack} applications?`,
      `How would you optimize the performance of a ${techStack} application?`
    ];
    
    const selectedQuestions = questions.slice(0, questionCount);
    
    return {
      success: true,
      text: selectedQuestions.join('\n\n'),
      data: selectedQuestions
    };
  } catch (error) {
    console.error("Error generating interview questions:", error);
    return {
      success: false,
      error: "Failed to generate interview questions",
      text: "Failed to generate interview questions. Please try again later."
    };
  }
};

export const analyzeInterviewResponse = async (
  jobRole: string,
  question: string,
  answer: string
) => {
  try {
    // Use static data instead of OpenAI
    console.log("Using static data instead of OpenAI for interview analysis");
    
    let rating = Math.floor(Math.random() * 4) + 6; // Random rating between 6 and 9
    
    const feedback = `
      Your answer demonstrated a good understanding of the core concepts related to ${jobRole}. 
      
      Strengths:
      - Clear articulation of key points
      - Good technical knowledge of the subject matter
      - Logical structure in your explanation
      
      Areas for improvement:
      - Could provide more specific examples from your experience
      - Consider discussing alternative approaches to the problem
      - Dive deeper into the performance implications of your solution
      
      Overall rating: ${rating}/10
    `;
    
    return {
      success: true,
      text: feedback.trim(),
      data: { rating, feedback: feedback.trim() }
    };
  } catch (error) {
    console.error("Error analyzing interview response:", error);
    
    return {
      success: false,
      error: "Failed to analyze interview response",
      text: "An error occurred while analyzing the response. Please try again later."
    };
  }
};

export const startCourseGeneration = async (
  courseId: string,
  topic: string, 
  purpose: CourseType['purpose'], 
  difficulty: CourseType['difficulty']
): Promise<string> => {
  try {
    console.log("Course generation started for:", {courseId, topic, purpose, difficulty});
    return courseId;
  } catch (error) {
    console.error("Error in startCourseGeneration:", error);
    throw error;
  }
};

export const getStaticCourseData = (topic: string, difficulty: CourseType['difficulty']) => {
  let bestMatch = "Full Stack Development";
  
  const topics = Object.keys(staticCourseData);
  
  for (const availableTopic of topics) {
    if (topic.toLowerCase().includes(availableTopic.toLowerCase()) || 
        availableTopic.toLowerCase().includes(topic.toLowerCase())) {
      bestMatch = availableTopic;
      break;
    }
  }
  
  const difficultyLevel = 
    staticCourseData[bestMatch as keyof typeof staticCourseData][difficulty as keyof typeof staticCourseData[keyof typeof staticCourseData]] ||
    staticCourseData[bestMatch as keyof typeof staticCourseData].intermediate;
    
  return {
    topic: bestMatch,
    data: difficultyLevel
  };
};

export const getStaticInterviewAnalysis = (jobRole: string) => {
  return {
    facial_data: {
      confident: 0.72,
      stressed: 0.28,
      hesitant: 0.35,
      nervous: 0.42,
      excited: 0.64
    },
    pronunciation_feedback: "Your speech was clear and well-paced. Work on reducing filler words like 'um' and 'ah'. Maintain a confident tone throughout the interview.",
    technical_feedback: `Your technical knowledge of ${jobRole} concepts was solid. You demonstrated good understanding of core principles. Consider preparing more specific examples from your experience to strengthen your answers.`,
    language_feedback: "You communicated your ideas effectively. Work on being more concise with technical explanations. Your vocabulary was appropriate for the role.",
    recommendations: [
      {
        title: "Improve Body Language",
        description: "Practice maintaining eye contact and open posture during interviews."
      },
      {
        title: "Prepare STAR Examples",
        description: "Develop more Situation-Task-Action-Result stories from your experience."
      },
      {
        title: `Deepen ${jobRole} Knowledge`,
        description: "Focus on strengthening your understanding of advanced concepts in your field."
      },
      {
        title: "Practice Technical Explanations",
        description: "Work on explaining complex technical concepts in simple, clear terms."
      }
    ]
  };
};

export const createStudyMaterial = async (studyMaterial: Omit<StudyMaterial, 'id' | 'created_at'>): Promise<StudyMaterial> => {
  const { data, error } = await fromTable<StudyMaterial>('study_material')
    .insert(studyMaterial)
    .select()
    .single();

  if (error) throw error;
  return data as StudyMaterial;
};

export const getAllStudyMaterials = async (): Promise<StudyMaterial[]> => {
  const { data, error } = await fromTable<StudyMaterial>('study_material')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching study materials:", error);
    return [];
  }
  return data as StudyMaterial[] || [];
};

export const getStudyMaterialById = async (id: number): Promise<StudyMaterial | null> => {
  const { data, error } = await fromTable<StudyMaterial>('study_material')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error("Error fetching study material:", error);
    return null;
  }
  return data as StudyMaterial | null;
};

export const updateStudyMaterialStatus = async (id: number, status: string): Promise<void> => {
  const { error } = await fromTable<StudyMaterial>('study_material')
    .update({ status })
    .eq('id', id);

  if (error) throw error;
};

export const updateStudyMaterialLayout = async (id: number, courseLayout: any): Promise<void> => {
  const { error } = await fromTable<StudyMaterial>('study_material')
    .update({ course_layout: courseLayout })
    .eq('id', id);

  if (error) throw error;
};

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  is_member: boolean;
  created_at?: string;
}

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  const { data, error } = await fromTable<UserProfile>('users')
    .select('*')
    .eq('id', userId)
    .maybeSingle();

  if (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
  return data as UserProfile | null;
};

export const updateUserProfile = async (
  userId: string, 
  updates: Partial<Omit<UserProfile, 'id' | 'created_at'>>
): Promise<void> => {
  const { error } = await fromTable<UserProfile>('users')
    .update(updates)
    .eq('id', userId);

  if (error) throw error;
};

export const updateMembershipStatus = async (userId: string, isMember: boolean): Promise<void> => {
  const { error } = await fromTable<UserProfile>('users')
    .update({ is_member: isMember })
    .eq('id', userId);

  if (error) throw error;
};
