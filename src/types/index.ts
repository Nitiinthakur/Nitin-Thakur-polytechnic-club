export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  rollNumber: string;
  targetExam: string; // e.g. 'JEECUP Group A (UP)' | 'Bihar PE' | 'MP PPT' | 'Delhi CET'
  avatarUrl: string;
  createdAt: string;
  completedChapters: string[];
  bookmarkedQuestionIds: string[];
}

export type SubjectType = 'mathematics' | 'physics' | 'chemistry';

export interface Formula {
  id: string;
  titleEn: string;
  titleHi: string;
  formula: string;
  explanationEn: string;
  explanationHi: string;
}

export interface Question {
  id: string;
  subjectId: SubjectType;
  chapterId: string;
  chapterTitleEn?: string;
  chapterTitleHi?: string;
  textEn: string;
  textHi: string;
  optionsEn: string[];
  optionsHi: string[];
  correctOptionIndex: number; // 0, 1, 2, 3
  explanationEn: string;
  explanationHi: string;
  examSource?: string; // e.g. "JEECUP 2024" or "Demo Practice"
  isDemo?: boolean;
  year?: number;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
}

export interface Chapter {
  id: string;
  subjectId: SubjectType;
  titleEn: string;
  titleHi: string;
  order: number;
  summaryEn: string;
  summaryHi: string;
  notesEn: string[];
  notesHi: string[];
  keyPointsEn: string[];
  keyPointsHi: string[];
  formulas: Formula[];
  mcqs: Question[];
  importantQA: {
    questionEn: string;
    questionHi: string;
    answerEn: string;
    answerHi: string;
  }[];
}

export interface Subject {
  id: SubjectType;
  nameEn: string;
  nameHi: string;
  iconName: string;
  color: string;
  descriptionEn: string;
  descriptionHi: string;
  totalChapters: number;
  chapters: Chapter[];
}

export interface MockTest {
  id: string;
  titleEn: string;
  titleHi: string;
  examType: string; // "JEECUP (UP Polytechnic)", "Bihar PE", etc.
  questionCount: 25 | 50 | 100;
  durationMinutes: number;
  totalMarks: number; // usually 4 marks per question (e.g. 100 marks for 25Q, 400 for 100Q)
  negativeMarking: number; // -1 for JEECUP or 0
  difficulty: 'Easy' | 'Medium' | 'Hard';
  subjectScope: 'All Subjects' | 'Mathematics' | 'Physics' | 'Chemistry';
  descriptionEn: string;
  descriptionHi: string;
  questions: Question[];
}

export interface QuestionAnswerState {
  questionId: string;
  selectedOption: number | null; // 0-3 or null
  isMarkedForReview: boolean;
  isVisited: boolean;
  timeSpentSeconds?: number;
}

export interface TestAttempt {
  id: string;
  userId: string;
  testId: string;
  testTitle: string;
  examType: string;
  totalQuestions: number;
  attemptedCount: number;
  correctCount: number;
  incorrectCount: number;
  unattemptedCount: number;
  totalScore: number;
  maxMarks: number;
  percentage: number;
  timeTakenSeconds: number;
  date: string;
  subjectScores: {
    mathematics: { correct: number; incorrect: number; score: number; total: number };
    physics: { correct: number; incorrect: number; score: number; total: number };
    chemistry: { correct: number; incorrect: number; score: number; total: number };
  };
  answers: {
    questionId: string;
    selectedOption: number | null;
    correctOption: number;
    isCorrect: boolean;
  }[];
}

export interface PreviousYearPaper {
  id: string;
  title: string;
  examName: string; // e.g. "JEECUP Group A"
  year: number;
  state: string; // "Uttar Pradesh" | "Bihar" | "Delhi" | "National"
  durationMinutes: number;
  totalQuestions: number;
  totalMarks: number;
  verified: boolean;
  paperType: 'Official Verified' | 'Memory Based';
  questions: Question[];
}

export interface DailyQuiz {
  id: string;
  date: string;
  titleEn: string;
  titleHi: string;
  questions: Question[];
}

export interface LeaderboardEntry {
  id: string;
  studentName: string;
  rollNumber: string;
  score: number;
  totalMarks: number;
  timeTaken: string;
  avatarUrl: string;
  date: string;
  state: string;
}

export interface Announcement {
  id: string;
  titleEn: string;
  titleHi: string;
  category: 'Exam Date' | 'Admit Card' | 'Syllabus' | 'Result' | 'Counseling' | 'General';
  date: string;
  isImportant: boolean;
  contentEn: string;
  contentHi: string;
  badge: string;
  linkText?: string;
  linkUrl?: string;
}

export interface CurrentAffairsItem {
  id: string;
  date: string;
  titleEn: string;
  titleHi: string;
  category: 'Science & Tech' | 'National' | 'Awards' | 'Environment';
  descriptionEn: string;
  descriptionHi: string;
}
