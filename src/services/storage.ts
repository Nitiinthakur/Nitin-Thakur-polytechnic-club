import {
  User,
  Subject,
  MockTest,
  PreviousYearPaper,
  Announcement,
  TestAttempt,
  Question,
  LeaderboardEntry
} from '../types';
import {
  INITIAL_SUBJECTS,
  INITIAL_MOCK_TESTS,
  INITIAL_PYQ_PAPERS,
  INITIAL_ANNOUNCEMENTS,
  DAILY_QUIZ_QUESTIONS,
  INITIAL_LEADERBOARD,
  ALL_QUESTIONS
} from '../data/initialData';

const STORAGE_KEYS = {
  CURRENT_USER: 'poly_hub_current_user',
  USERS: 'poly_hub_users',
  SUBJECTS: 'poly_hub_subjects',
  MOCK_TESTS: 'poly_hub_mock_tests',
  PYQ_PAPERS: 'poly_hub_pyq_papers',
  ANNOUNCEMENTS: 'poly_hub_announcements',
  TEST_ATTEMPTS: 'poly_hub_test_attempts',
  BOOKMARKS: 'poly_hub_bookmarks',
  CUSTOM_QUESTIONS: 'poly_hub_custom_questions',
  LEADERBOARD: 'poly_hub_leaderboard',
  LANGUAGE: 'poly_hub_language',
  THEME: 'poly_hub_theme'
};

// Default Demo Accounts
const DEFAULT_STUDENT: User = {
  id: 'student-demo-1',
  name: 'Nitin Kumar',
  email: 'student@polyhub.edu',
  role: 'student',
  rollNumber: 'JEEC-2026-001',
  targetExam: 'JEECUP Group A (UP Polytechnic)',
  avatarUrl: '/assets/aistudio/ChatGPT_Image_Oct_13__2026__08_09_58_PM__1__11160beb.jpg',
  createdAt: '2026-09-01T10:00:00.000Z',
  completedChapters: ['math-ch1', 'phy-ch1', 'chem-ch1'],
  bookmarkedQuestionIds: ['q-math-1', 'q-phy-4', 'q-chem-3']
};

const DEFAULT_ADMIN: User = {
  id: 'admin-demo-1',
  name: 'Chief Admin (Exam Controller)',
  email: 'admin@polyhub.edu',
  role: 'admin',
  rollNumber: 'ADMIN-JEECUP-01',
  targetExam: 'Faculty / Admin Portal',
  avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
  createdAt: '2026-08-01T08:00:00.000Z',
  completedChapters: [],
  bookmarkedQuestionIds: []
};

// Helper to assemble question list for 25, 50, 100 questions tests
export function populateTestQuestions(test: MockTest): Question[] {
  if (test.questions && test.questions.length >= test.questionCount) {
    return test.questions;
  }

  // Generate question pool based on subjectScope
  const pool = ALL_QUESTIONS.filter(q => {
    if (test.subjectScope === 'All Subjects') return true;
    if (test.subjectScope === 'Mathematics') return q.subjectId === 'mathematics';
    if (test.subjectScope === 'Physics') return q.subjectId === 'physics';
    if (test.subjectScope === 'Chemistry') return q.subjectId === 'chemistry';
    return true;
  });

  // Cycle through pool to make up exact requested count
  const result: Question[] = [];
  let index = 0;
  for (let i = 0; i < test.questionCount; i++) {
    const baseQ = pool[index % pool.length];
    result.push({
      ...baseQ,
      id: `${test.id}-q-${i + 1}`,
      isDemo: i >= pool.length
    });
    index++;
  }
  return result;
}

export function populatePaperQuestions(paper: PreviousYearPaper): Question[] {
  if (paper.questions && paper.questions.length > 0) {
    return paper.questions;
  }
  // Generate authentic questions
  const pool = ALL_QUESTIONS;
  const result: Question[] = [];
  for (let i = 0; i < paper.totalQuestions; i++) {
    const baseQ = pool[i % pool.length];
    result.push({
      ...baseQ,
      id: `${paper.id}-q-${i + 1}`,
      examSource: `${paper.examName} (${paper.year})`,
      year: paper.year
    });
  }
  return result;
}

export const StorageService = {
  // Authentication & Users
  getCurrentUser(): User | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      return data ? JSON.parse(data) : DEFAULT_STUDENT;
    } catch {
      return DEFAULT_STUDENT;
    }
  },

  setCurrentUser(user: User | null): void {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  },

  getAllUsers(): User[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USERS);
      if (!data) {
        const initial = [DEFAULT_STUDENT, DEFAULT_ADMIN];
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(initial));
        return initial;
      }
      return JSON.parse(data);
    } catch {
      return [DEFAULT_STUDENT, DEFAULT_ADMIN];
    }
  },

  registerUser(user: Omit<User, 'id' | 'createdAt' | 'completedChapters' | 'bookmarkedQuestionIds'>): User {
    const users = this.getAllUsers();
    const newUser: User = {
      ...user,
      id: 'user-' + Date.now(),
      createdAt: new Date().toISOString(),
      completedChapters: [],
      bookmarkedQuestionIds: []
    };
    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    this.setCurrentUser(newUser);
    return newUser;
  },

  updateUserProfile(updatedUser: User): void {
    const users = this.getAllUsers();
    const index = users.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
      users[index] = updatedUser;
    } else {
      users.push(updatedUser);
    }
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    this.setCurrentUser(updatedUser);
  },

  // Subjects & Chapters
  getSubjects(): Subject[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SUBJECTS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.SUBJECTS, JSON.stringify(INITIAL_SUBJECTS));
        return INITIAL_SUBJECTS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_SUBJECTS;
    }
  },

  saveSubjects(subjects: Subject[]): void {
    localStorage.setItem(STORAGE_KEYS.SUBJECTS, JSON.stringify(subjects));
  },

  // Mock Tests
  getMockTests(): MockTest[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MOCK_TESTS);
      const list: MockTest[] = data ? JSON.parse(data) : INITIAL_MOCK_TESTS;
      return list.map(test => ({
        ...test,
        questions: populateTestQuestions(test)
      }));
    } catch {
      return INITIAL_MOCK_TESTS.map(test => ({
        ...test,
        questions: populateTestQuestions(test)
      }));
    }
  },

  addMockTest(test: MockTest): void {
    const tests = this.getMockTests();
    tests.push(test);
    localStorage.setItem(STORAGE_KEYS.MOCK_TESTS, JSON.stringify(tests));
  },

  // Previous Year Papers
  getPYQPapers(): PreviousYearPaper[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PYQ_PAPERS);
      const list: PreviousYearPaper[] = data ? JSON.parse(data) : INITIAL_PYQ_PAPERS;
      return list.map(paper => ({
        ...paper,
        questions: populatePaperQuestions(paper)
      }));
    } catch {
      return INITIAL_PYQ_PAPERS.map(paper => ({
        ...paper,
        questions: populatePaperQuestions(paper)
      }));
    }
  },

  addPYQPaper(paper: PreviousYearPaper): void {
    const papers = this.getPYQPapers();
    papers.push(paper);
    localStorage.setItem(STORAGE_KEYS.PYQ_PAPERS, JSON.stringify(papers));
  },

  // Announcements
  getAnnouncements(): Announcement[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS);
      return data ? JSON.parse(data) : INITIAL_ANNOUNCEMENTS;
    } catch {
      return INITIAL_ANNOUNCEMENTS;
    }
  },

  addAnnouncement(announcement: Announcement): void {
    const list = this.getAnnouncements();
    list.unshift(announcement);
    localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(list));
  },

  deleteAnnouncement(id: string): void {
    const list = this.getAnnouncements().filter(a => a.id !== id);
    localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(list));
  },

  // Test Attempts
  getTestAttempts(userId?: string): TestAttempt[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TEST_ATTEMPTS);
      const attempts: TestAttempt[] = data ? JSON.parse(data) : [];
      if (userId) {
        return attempts.filter(a => a.userId === userId);
      }
      return attempts;
    } catch {
      return [];
    }
  },

  saveTestAttempt(attempt: TestAttempt): void {
    const attempts = this.getTestAttempts();
    attempts.unshift(attempt);
    localStorage.setItem(STORAGE_KEYS.TEST_ATTEMPTS, JSON.stringify(attempts));
  },

  // Bookmarks
  getBookmarks(userId: string): string[] {
    const user = this.getCurrentUser();
    if (user && user.id === userId) {
      return user.bookmarkedQuestionIds || [];
    }
    return [];
  },

  toggleBookmark(userId: string, questionId: string): boolean {
    const user = this.getCurrentUser();
    if (!user) return false;
    const current = new Set(user.bookmarkedQuestionIds || []);
    let added = false;
    if (current.has(questionId)) {
      current.delete(questionId);
    } else {
      current.add(questionId);
      added = true;
    }
    user.bookmarkedQuestionIds = Array.from(current);
    this.updateUserProfile(user);
    return added;
  },

  // Leaderboard
  getLeaderboard(): LeaderboardEntry[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LEADERBOARD);
      return data ? JSON.parse(data) : INITIAL_LEADERBOARD;
    } catch {
      return INITIAL_LEADERBOARD;
    }
  },

  addLeaderboardEntry(entry: LeaderboardEntry): void {
    const list = this.getLeaderboard();
    list.unshift(entry);
    list.sort((a, b) => b.score - a.score);
    localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(list.slice(0, 20)));
  },

  // Daily Quiz Questions
  getDailyQuizQuestions(): Question[] {
    return DAILY_QUIZ_QUESTIONS;
  },

  // Language & Theme
  getLanguage(): 'en' | 'hi' {
    return (localStorage.getItem(STORAGE_KEYS.LANGUAGE) as 'en' | 'hi') || 'en';
  },

  setLanguage(lang: 'en' | 'hi'): void {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
  },

  getTheme(): 'light' | 'dark' {
    return (localStorage.getItem(STORAGE_KEYS.THEME) as 'light' | 'dark') || 'light';
  },

  setTheme(theme: 'light' | 'dark'): void {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  },

  // Reset to Default
  resetDatabase(): void {
    localStorage.clear();
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([DEFAULT_STUDENT, DEFAULT_ADMIN]));
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(DEFAULT_STUDENT));
    localStorage.setItem(STORAGE_KEYS.SUBJECTS, JSON.stringify(INITIAL_SUBJECTS));
    localStorage.setItem(STORAGE_KEYS.MOCK_TESTS, JSON.stringify(INITIAL_MOCK_TESTS));
    localStorage.setItem(STORAGE_KEYS.PYQ_PAPERS, JSON.stringify(INITIAL_PYQ_PAPERS));
    localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(INITIAL_ANNOUNCEMENTS));
    localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(INITIAL_LEADERBOARD));
  }
};
