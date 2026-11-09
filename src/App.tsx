import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HomeHero } from './components/HomeHero';
import { SubjectDirectory } from './components/SubjectDirectory';
import { ChapterView } from './components/ChapterView';
import { MockTestPortal } from './components/MockTestPortal';
import { CBTExamScreen } from './components/CBTExamScreen';
import { PYQPapers } from './components/PYQPapers';
import { DailyQuizView } from './components/DailyQuizView';
import { StudentDashboard } from './components/StudentDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { AuthModal } from './components/AuthModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { PrintableNotesModal } from './components/PrintableNotesModal';
import { Footer } from './components/Footer';

function MainContent() {
  const { activeTab } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'home' && <HomeHero />}
        {activeTab === 'subjects' && <SubjectDirectory />}
        {activeTab === 'chapter-detail' && <ChapterView />}
        {activeTab === 'mock-tests' && <MockTestPortal />}
        {activeTab === 'cbt-exam' && <CBTExamScreen />}
        {activeTab === 'pyq' && <PYQPapers />}
        {activeTab === 'daily-quiz' && <DailyQuizView />}
        {activeTab === 'dashboard' && <StudentDashboard />}
        {activeTab === 'admin' && <AdminDashboard />}
      </main>

      {/* Footer (Hidden during active CBT examination to maintain realistic exam environment) */}
      {activeTab !== 'cbt-exam' && <Footer />}

      {/* Global Modals */}
      <AuthModal />
      <GlobalSearchModal />
      <PrintableNotesModal />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
