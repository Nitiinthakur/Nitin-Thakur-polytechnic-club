import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  Subject,
  Chapter,
  SubjectType,
  MockTest,
  PreviousYearPaper,
  Announcement,
  TestAttempt,
  Question
} from '../types';
import { StorageService } from '../services/storage';

export type AppTab =
  | 'home'
  | 'subjects'
  | 'chapter-detail'
  | 'mock-tests'
  | 'cbt-exam'
  | 'pyq'
  | 'daily-quiz'
  | 'dashboard'
  | 'admin';

interface AppContextType {
  user: User | null;
  setUser: (u: User | null) => void;
  language: 'en' | 'hi';
  setLanguage: (l: 'en' | 'hi') => void;
  theme: 'light' | 'dark';
  setTheme: (t: 'light' | 'dark') => void;
  toggleTheme: () => void;
  toggleLanguage: () => void;
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  selectedSubjectId: SubjectType | null;
  setSelectedSubjectId: (s: SubjectType | null) => void;
  selectedChapterId: string | null;
  setSelectedChapterId: (c: string | null) => void;
  activeMockTest: MockTest | null;
  setActiveMockTest: (t: MockTest | null) => void;
  activePYQPaper: PreviousYearPaper | null;
  setActivePYQPaper: (p: PreviousYearPaper | null) => void;
  activeExamMode: 'mock' | 'pyq' | 'daily';
  setActiveExamMode: (m: 'mock' | 'pyq' | 'daily') => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (b: boolean) => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (b: boolean) => void;
  isPrintModalOpen: boolean;
  setIsPrintModalOpen: (b: boolean) => void;
  printableChapter: Chapter | null;
  setPrintableChapter: (c: Chapter | null) => void;
  testAttempts: TestAttempt[];
  refreshAttempts: () => void;
  subjects: Subject[];
  refreshSubjects: () => void;
  announcements: Announcement[];
  refreshAnnouncements: () => void;
  bookmarks: string[];
  toggleBookmark: (qId: string) => boolean;
  isBookmarked: (qId: string) => boolean;
  markChapterComplete: (chapterId: string) => void;
  isChapterCompleted: (chapterId: string) => boolean;
  allQuestions: Question[];
  t: (en: string, hi: string) => string;
  startMockTest: (test: MockTest) => void;
  startPYQPaper: (paper: PreviousYearPaper) => void;
  openChapter: (subjectId: SubjectType, chapterId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(() => StorageService.getCurrentUser());
  const [language, setLanguageState] = useState<'en' | 'hi'>(() => StorageService.getLanguage());
  const [theme, setThemeState] = useState<'light' | 'dark'>(() => StorageService.getTheme());
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [selectedSubjectId, setSelectedSubjectId] = useState<SubjectType | null>('mathematics');
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>('math-ch1');
  const [activeMockTest, setActiveMockTest] = useState<MockTest | null>(null);
  const [activePYQPaper, setActivePYQPaper] = useState<PreviousYearPaper | null>(null);
  const [activeExamMode, setActiveExamMode] = useState<'mock' | 'pyq' | 'daily'>('mock');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);
  const [printableChapter, setPrintableChapter] = useState<Chapter | null>(null);

  const [testAttempts, setTestAttempts] = useState<TestAttempt[]>(() =>
    StorageService.getTestAttempts(user?.id)
  );
  const [subjects, setSubjects] = useState<Subject[]>(() => StorageService.getSubjects());
  const [announcements, setAnnouncements] = useState<Announcement[]>(() =>
    StorageService.getAnnouncements()
  );

  // Sync theme with HTML root class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    StorageService.setTheme(theme);
  }, [theme]);

  // Sync language
  const setLanguage = (lang: 'en' | 'hi') => {
    setLanguageState(lang);
    StorageService.setLanguage(lang);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  const toggleTheme = () => {
    setThemeState(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const setUser = (u: User | null) => {
    setUserState(u);
    StorageService.setCurrentUser(u);
    if (u) {
      setTestAttempts(StorageService.getTestAttempts(u.id));
    }
  };

  const refreshAttempts = () => {
    if (user) {
      setTestAttempts(StorageService.getTestAttempts(user.id));
    }
  };

  const refreshSubjects = () => {
    setSubjects(StorageService.getSubjects());
  };

  const refreshAnnouncements = () => {
    setAnnouncements(StorageService.getAnnouncements());
  };

  const bookmarks = user?.bookmarkedQuestionIds || [];

  const toggleBookmark = (qId: string): boolean => {
    if (!user) {
      setIsAuthModalOpen(true);
      return false;
    }
    const added = StorageService.toggleBookmark(user.id, qId);
    const updated = StorageService.getCurrentUser();
    setUserState(updated);
    return added;
  };

  const isBookmarked = (qId: string): boolean => {
    return bookmarks.includes(qId);
  };

  const markChapterComplete = (chapterId: string) => {
    if (!user) return;
    const current = new Set(user.completedChapters || []);
    if (current.has(chapterId)) {
      current.delete(chapterId);
    } else {
      current.add(chapterId);
    }
    const updated = {
      ...user,
      completedChapters: Array.from(current)
    };
    StorageService.updateUserProfile(updated);
    setUserState(updated);
  };

  const isChapterCompleted = (chapterId: string): boolean => {
    return (user?.completedChapters || []).includes(chapterId);
  };

  const allQuestions: Question[] = subjects.flatMap(s => s.chapters.flatMap(c => c.mcqs));

  const t = (en: string, hi: string): string => {
    return language === 'hi' ? hi : en;
  };

  const startMockTest = (test: MockTest) => {
    setActiveMockTest(test);
    setActivePYQPaper(null);
    setActiveExamMode('mock');
    setActiveTab('cbt-exam');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startPYQPaper = (paper: PreviousYearPaper) => {
    setActivePYQPaper(paper);
    setActiveMockTest(null);
    setActiveExamMode('pyq');
    setActiveTab('cbt-exam');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openChapter = (subjectId: SubjectType, chapterId: string) => {
    setSelectedSubjectId(subjectId);
    setSelectedChapterId(chapterId);
    setActiveTab('chapter-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        language,
        setLanguage,
        theme,
        setTheme: setThemeState,
        toggleTheme,
        toggleLanguage,
        activeTab,
        setActiveTab,
        selectedSubjectId,
        setSelectedSubjectId,
        selectedChapterId,
        setSelectedChapterId,
        activeMockTest,
        setActiveMockTest,
        activePYQPaper,
        setActivePYQPaper,
        activeExamMode,
        setActiveExamMode,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isSearchModalOpen,
        setIsSearchModalOpen,
        isPrintModalOpen,
        setIsPrintModalOpen,
        printableChapter,
        setPrintableChapter,
        testAttempts,
        refreshAttempts,
        subjects,
        refreshSubjects,
        announcements,
        refreshAnnouncements,
        bookmarks,
        toggleBookmark,
        isBookmarked,
        markChapterComplete,
        isChapterCompleted,
        allQuestions,
        t,
        startMockTest,
        startPYQPaper,
        openChapter
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
