import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StorageService } from '../services/storage';
import {
  ShieldAlert,
  PlusCircle,
  BookOpen,
  ClipboardCheck,
  FileText,
  Users,
  Bell,
  Trash2,
  Check,
  RotateCcw,
  Upload,
  Sparkles,
  HelpCircle,
  Eye
} from 'lucide-react';
import { Question, SubjectType, MockTest, Announcement, PreviousYearPaper } from '../types';

export const AdminDashboard: React.FC = () => {
  const {
    user,
    subjects,
    refreshSubjects,
    announcements,
    refreshAnnouncements,
    t
  } = useApp();

  const [activeTab, setActiveTab] = useState<'questions' | 'tests' | 'announcements' | 'students' | 'papers'>('questions');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form: Add Question
  const [qSubject, setQSubject] = useState<SubjectType>('mathematics');
  const [qChapter, setQChapter] = useState<string>('math-ch1');
  const [qTextEn, setQTextEn] = useState('');
  const [qTextHi, setQTextHi] = useState('');
  const [qOptA, setQOptA] = useState('');
  const [qOptB, setQOptB] = useState('');
  const [qOptC, setQOptC] = useState('');
  const [qOptD, setQOptD] = useState('');
  const [qCorrect, setQCorrect] = useState<number>(0);
  const [qExpEn, setQExpEn] = useState('');
  const [qExpHi, setQExpHi] = useState('');

  // Form: Add Announcement
  const [annTitleEn, setAnnTitleEn] = useState('');
  const [annTitleHi, setAnnTitleHi] = useState('');
  const [annCategory, setAnnCategory] = useState<'Exam Date' | 'Admit Card' | 'Syllabus' | 'Result' | 'Counseling' | 'General'>('Exam Date');
  const [annContentEn, setAnnContentEn] = useState('');
  const [annContentHi, setAnnContentHi] = useState('');
  const [annIsImportant, setAnnIsImportant] = useState(true);

  // Form: Add Mock Test
  const [testTitleEn, setTestTitleEn] = useState('');
  const [testTitleHi, setTestTitleHi] = useState('');
  const [testCount, setTestCount] = useState<25 | 50 | 100>(25);
  const [testDuration, setTestDuration] = useState<number>(35);
  const [testScope, setTestScope] = useState<'All Subjects' | 'Mathematics' | 'Physics' | 'Chemistry'>('All Subjects');

  // Form: Add PYQ Paper
  const [pyqTitle, setPyqTitle] = useState('');
  const [pyqExam, setPyqExam] = useState('JEECUP Group A');
  const [pyqYear, setPyqYear] = useState<number>(2025);
  const [pyqState, setPyqState] = useState('Uttar Pradesh');

  const showNotification = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3500);
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qTextEn || !qOptA || !qOptB || !qOptC || !qOptD) {
      alert('Please fill out all question fields and options.');
      return;
    }

    const newQ: Question = {
      id: 'custom-q-' + Date.now(),
      subjectId: qSubject,
      chapterId: qChapter,
      textEn: qTextEn,
      textHi: qTextHi || qTextEn,
      optionsEn: [qOptA, qOptB, qOptC, qOptD],
      optionsHi: [qOptA, qOptB, qOptC, qOptD],
      correctOptionIndex: qCorrect,
      explanationEn: qExpEn || 'Standard conceptual solution.',
      explanationHi: qExpHi || 'मानक अवधारणात्मक हल।',
      examSource: 'Faculty Admin Added',
      isDemo: false,
      year: 2026
    };

    // Update in StorageService
    const currentSubjects = StorageService.getSubjects();
    const targetSub = currentSubjects.find(s => s.id === qSubject);
    if (targetSub) {
      const targetCh = targetSub.chapters.find(c => c.id === qChapter);
      if (targetCh) {
        targetCh.mcqs.unshift(newQ);
        StorageService.saveSubjects(currentSubjects);
        refreshSubjects();
      }
    }

    showNotification('New Question Added Successfully to Chapter MCQs!');
    setQTextEn('');
    setQTextHi('');
    setQOptA('');
    setQOptB('');
    setQOptC('');
    setQOptD('');
    setQExpEn('');
    setQExpHi('');
  };

  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitleEn || !annContentEn) return;

    const newAnn: Announcement = {
      id: 'ann-' + Date.now(),
      titleEn: annTitleEn,
      titleHi: annTitleHi || annTitleEn,
      category: annCategory,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      isImportant: annIsImportant,
      badge: annCategory.toUpperCase(),
      contentEn: annContentEn,
      contentHi: annContentHi || annContentEn,
      linkText: 'Read Circular'
    };

    StorageService.addAnnouncement(newAnn);
    refreshAnnouncements();
    showNotification('Official Announcement Published Live!');
    setAnnTitleEn('');
    setAnnTitleHi('');
    setAnnContentEn('');
    setAnnContentHi('');
  };

  const handleAddMockTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testTitleEn) return;

    const newTest: MockTest = {
      id: 'mock-' + Date.now(),
      titleEn: testTitleEn,
      titleHi: testTitleHi || testTitleEn,
      examType: 'JEECUP / Polytechnic Special',
      questionCount: testCount,
      durationMinutes: testDuration,
      totalMarks: testCount * 4,
      negativeMarking: 0,
      difficulty: 'Medium',
      subjectScope: testScope,
      descriptionEn: `Custom scheduled test with ${testCount} questions covering ${testScope}.`,
      descriptionHi: `${testScope} पर आधारित ${testCount} प्रश्नों का विशेष टेस्ट।`,
      questions: []
    };

    StorageService.addMockTest(newTest);
    showNotification(`New ${testCount}-Question Mock Test Created!`);
    setTestTitleEn('');
    setTestTitleHi('');
  };

  const handleAddPYQ = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pyqTitle) return;

    const newPaper: PreviousYearPaper = {
      id: 'pyq-' + Date.now(),
      title: pyqTitle,
      examName: pyqExam,
      year: pyqYear,
      state: pyqState,
      durationMinutes: 150,
      totalQuestions: 100,
      totalMarks: 400,
      verified: true,
      paperType: 'Official Verified',
      questions: []
    };

    StorageService.addPYQPaper(newPaper);
    showNotification('Previous Year Paper Uploaded & Archived!');
    setPyqTitle('');
  };

  const handleResetData = () => {
    if (confirm('Are you sure you want to restore default curriculum data and reset accounts?')) {
      StorageService.resetDatabase();
      refreshSubjects();
      refreshAnnouncements();
      showNotification('Database successfully restored to pristine state!');
    }
  };

  const allUsers = StorageService.getAllUsers();

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold font-['Outfit']">
              Polytechnic Hub Admin Console
            </h1>
            <p className="text-xs text-slate-400">
              Manage questions, mock tests, announcements, student records & papers
            </p>
          </div>
        </div>

        <button
          onClick={handleResetData}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-rose-900/60 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Sample Database</span>
        </button>
      </div>

      {/* Success Notification Alert */}
      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Admin Tab Selector */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 overflow-x-auto pb-2">
        {[
          { id: 'questions', label: 'Add Questions', icon: PlusCircle },
          { id: 'tests', label: 'Create Mock Tests', icon: ClipboardCheck },
          { id: 'announcements', label: 'Announcements', icon: Bell },
          { id: 'papers', label: 'Upload PYQ Papers', icon: FileText },
          { id: 'students', label: `Manage Students (${allUsers.length})`, icon: Users }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Add Questions Form */}
      {activeTab === 'questions' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="space-y-1">
            <h2 className="font-bold text-base text-slate-900 dark:text-white">
              Add New Question to Curriculum
            </h2>
            <p className="text-xs text-slate-500">
              Enter bilingual question text, 4 options, designate the correct choice, and step-by-step solution.
            </p>
          </div>

          <form onSubmit={handleAddQuestion} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-semibold">
                  Target Subject
                </label>
                <select
                  value={qSubject}
                  onChange={(e) => {
                    const sub = e.target.value as SubjectType;
                    setQSubject(sub);
                    const subObj = subjects.find(s => s.id === sub);
                    if (subObj && subObj.chapters[0]) {
                      setQChapter(subObj.chapters[0].id);
                    }
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="mathematics">Mathematics (गणित)</option>
                  <option value="physics">Physics (भौतिक विज्ञान)</option>
                  <option value="chemistry">Chemistry (रसायन विज्ञान)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-semibold">
                  Target Chapter
                </label>
                <select
                  value={qChapter}
                  onChange={(e) => setQChapter(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  {subjects.find(s => s.id === qSubject)?.chapters.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.order}. {c.titleEn} ({c.titleHi})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Question English & Hindi */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-semibold">
                  Question Text (English) *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. If the focal length of a concave mirror is 20 cm..."
                  value={qTextEn}
                  onChange={(e) => setQTextEn(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-semibold">
                  Question Text (हिंदी)
                </label>
                <textarea
                  rows={3}
                  placeholder="उदा. यदि किसी अवतल दर्पण की फोकस दूरी 20 सेमी है..."
                  value={qTextHi}
                  onChange={(e) => setQTextHi(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* 4 Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-semibold">Option A</label>
                <input
                  type="text"
                  required
                  value={qOptA}
                  onChange={(e) => setQOptA(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-semibold">Option B</label>
                <input
                  type="text"
                  required
                  value={qOptB}
                  onChange={(e) => setQOptB(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-semibold">Option C</label>
                <input
                  type="text"
                  required
                  value={qOptC}
                  onChange={(e) => setQOptC(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-semibold">Option D</label>
                <input
                  type="text"
                  required
                  value={qOptD}
                  onChange={(e) => setQOptD(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Correct Choice Radio */}
            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1.5 font-semibold">
                Correct Answer Option *
              </label>
              <div className="flex items-center gap-4">
                {[0, 1, 2, 3].map(idx => (
                  <label key={idx} className="flex items-center gap-1.5 cursor-pointer font-bold">
                    <input
                      type="radio"
                      name="correctChoice"
                      checked={qCorrect === idx}
                      onChange={() => setQCorrect(idx)}
                      className="text-amber-600"
                    />
                    <span>Option {String.fromCharCode(65 + idx)}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Explanations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-semibold">
                  Explanation (English)
                </label>
                <input
                  type="text"
                  placeholder="Detailed formula and step-by-step reasoning..."
                  value={qExpEn}
                  onChange={(e) => setQExpEn(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-semibold">
                  Explanation (हिंदी)
                </label>
                <input
                  type="text"
                  placeholder="सूत्र एवं चरणबद्ध हल..."
                  value={qExpHi}
                  onChange={(e) => setQExpHi(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl shadow cursor-pointer transition-colors"
            >
              Save Question to Question Bank
            </button>
          </form>
        </div>
      )}

      {/* Tab 2: Create Mock Tests */}
      {activeTab === 'tests' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="space-y-1">
            <h2 className="font-bold text-base text-slate-900 dark:text-white">
              Create & Schedule Online Mock Test
            </h2>
            <p className="text-xs text-slate-500">
              Configure question counts (25, 50, or 100 Qs), timing, and target subject scope.
            </p>
          </div>

          <form onSubmit={handleAddMockTest} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-semibold">
                  Test Title (English) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. JEECUP Full Syllabus Grand Mock #4"
                  value={testTitleEn}
                  onChange={(e) => setTestTitleEn(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-semibold">
                  Test Title (हिंदी)
                </label>
                <input
                  type="text"
                  placeholder="उदा. JEECUP संपूर्ण पाठ्यक्रम महा मॉक टेस्ट"
                  value={testTitleHi}
                  onChange={(e) => setTestTitleHi(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-semibold">
                  Question Count *
                </label>
                <select
                  value={testCount}
                  onChange={(e) => {
                    const c = Number(e.target.value) as 25 | 50 | 100;
                    setTestCount(c);
                    setTestDuration(c === 100 ? 150 : c === 50 ? 75 : 35);
                  }}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value={25}>25 Questions (Sprint Test - 100 Marks)</option>
                  <option value={50}>50 Questions (Booster Test - 200 Marks)</option>
                  <option value={100}>100 Questions (Grand Mock - 400 Marks)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-semibold">
                  Duration (Minutes)
                </label>
                <input
                  type="number"
                  value={testDuration}
                  onChange={(e) => setTestDuration(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-semibold">
                  Subject Scope
                </label>
                <select
                  value={testScope}
                  onChange={(e) => setTestScope(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="All Subjects">All Subjects (Math, Phys, Chem)</option>
                  <option value="Mathematics">Mathematics Only</option>
                  <option value="Physics">Physics Only</option>
                  <option value="Chemistry">Chemistry Only</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow cursor-pointer transition-colors"
            >
              Publish Mock Test Online
            </button>
          </form>
        </div>
      )}

      {/* Tab 3: Announcements */}
      {activeTab === 'announcements' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="space-y-1">
            <h2 className="font-bold text-base text-slate-900 dark:text-white">
              Publish Exam Announcements & Updates
            </h2>
            <p className="text-xs text-slate-500">
              Post real-time exam notifications, counseling alerts, syllabus updates, and important dates.
            </p>
          </div>

          <form onSubmit={handleAddAnnouncement} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-semibold">
                  Announcement Title (English) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. JEECUP 2026 Admit Card Download Link Live"
                  value={annTitleEn}
                  onChange={(e) => setAnnTitleEn(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-semibold">
                  Category
                </label>
                <select
                  value={annCategory}
                  onChange={(e) => setAnnCategory(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="Exam Date">Exam Date</option>
                  <option value="Admit Card">Admit Card</option>
                  <option value="Syllabus">Syllabus</option>
                  <option value="Result">Result</option>
                  <option value="Counseling">Counseling</option>
                  <option value="General">General</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1 font-semibold">
                Content Details *
              </label>
              <textarea
                rows={2}
                required
                placeholder="Full notice text..."
                value={annContentEn}
                onChange={(e) => setAnnContentEn(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl shadow cursor-pointer transition-colors"
            >
              Publish Announcement
            </button>
          </form>

          {/* Existing announcements list */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500">
              Live Published Notices
            </h3>
            <div className="space-y-2">
              {announcements.map(a => (
                <div
                  key={a.id}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">{a.titleEn}</span>
                    <span className="text-slate-400 block text-[11px]">{a.date} · {a.category}</span>
                  </div>
                  <button
                    onClick={() => {
                      StorageService.deleteAnnouncement(a.id);
                      refreshAnnouncements();
                    }}
                    className="text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
                    title="Delete notice"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Upload PYQ Papers */}
      {activeTab === 'papers' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="space-y-1">
            <h2 className="font-bold text-base text-slate-900 dark:text-white">
              Upload Previous Year Question Papers
            </h2>
            <p className="text-xs text-slate-500">
              Add verified previous year question papers from JEECUP, Bihar PE, MP PPT, and other state entrance examinations.
            </p>
          </div>

          <form onSubmit={handleAddPYQ} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-semibold">
                  Paper Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. JEECUP 2025 Group A Engineering Entrance Paper"
                  value={pyqTitle}
                  onChange={(e) => setPyqTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-semibold">
                  Exam & Group
                </label>
                <input
                  type="text"
                  value={pyqExam}
                  onChange={(e) => setPyqExam(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-semibold">
                  Exam Year
                </label>
                <input
                  type="number"
                  value={pyqYear}
                  onChange={(e) => setPyqYear(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-semibold">
                  State
                </label>
                <select
                  value={pyqState}
                  onChange={(e) => setPyqState(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="Uttar Pradesh">Uttar Pradesh (JEECUP)</option>
                  <option value="Bihar">Bihar (DCECE/PE)</option>
                  <option value="Madhya Pradesh">Madhya Pradesh (MP PPT)</option>
                  <option value="Delhi">Delhi (DSEU CET)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow cursor-pointer transition-colors"
            >
              Upload Verified Question Paper
            </button>
          </form>
        </div>
      )}

      {/* Tab 5: Manage Students */}
      {activeTab === 'students' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-base text-slate-900 dark:text-white">
              Registered Candidate Database
            </h2>
            <span className="text-xs text-slate-400 font-mono">
              Total Accounts: {allUsers.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                <tr>
                  <th className="p-3 rounded-l-xl">Candidate Name</th>
                  <th className="p-3">Roll Number</th>
                  <th className="p-3">Target Exam</th>
                  <th className="p-3">Role</th>
                  <th className="p-3 rounded-r-xl">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {allUsers.map(st => (
                  <tr key={st.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-3 font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                      <img
                        src={st.avatarUrl}
                        alt={st.name}
                        className="w-7 h-7 rounded-full object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80';
                        }}
                      />
                      <span>{st.name}</span>
                    </td>
                    <td className="p-3 font-mono text-slate-500">{st.rollNumber}</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">{st.targetExam}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        st.role === 'admin' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300' : 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300'
                      }`}>
                        {st.role}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                        <Check className="w-3 h-3" />
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
