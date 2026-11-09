import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StorageService } from '../services/storage';
import {
  User as UserIcon,
  Award,
  CheckCircle2,
  Clock,
  TrendingUp,
  Bookmark,
  Calendar,
  Layers,
  FileText,
  RotateCcw,
  Sparkles,
  ExternalLink,
  Trash2,
  BookOpen,
  Edit2
} from 'lucide-react';
import { TestAttempt, Question } from '../types';

export const StudentDashboard: React.FC = () => {
  const {
    user,
    setUser,
    testAttempts,
    subjects,
    bookmarks,
    toggleBookmark,
    openChapter,
    allQuestions,
    startMockTest,
    t
  } = useApp();

  const [activeDashTab, setActiveDashTab] = useState<'overview' | 'history' | 'bookmarks' | 'profile'>('overview');
  const [selectedAttemptForReview, setSelectedAttemptForReview] = useState<TestAttempt | null>(null);
  const [bookmarkSubjectFilter, setBookmarkSubjectFilter] = useState<'all' | 'mathematics' | 'physics' | 'chemistry'>('all');

  // Edit profile states
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editTargetExam, setEditTargetExam] = useState(user?.targetExam || 'JEECUP Group A (UP)');

  if (!user) {
    return (
      <div className="text-center py-16 space-y-4">
        <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
          <UserIcon className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white font-['Outfit']">
          {t('Sign In to View Your Dashboard', 'डैशबोर्ड देखने के लिए लॉग इन करें')}
        </h2>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          {t('Track your tests, marks, bookmarks, and learning progress in one unified portal.', 'अपने टेस्ट, अंक, बुकमार्क और अध्ययन प्रगति को एक ही पोर्टल पर ट्रैक करें।')}
        </p>
      </div>
    );
  }

  // Aggregate stats
  const totalAttempts = testAttempts.length;
  const totalScore = testAttempts.reduce((acc, curr) => acc + curr.totalScore, 0);
  const avgPercentage = totalAttempts > 0
    ? Math.round(testAttempts.reduce((acc, curr) => acc + curr.percentage, 0) / totalAttempts)
    : 0;
  const totalCompletedChapters = user.completedChapters?.length || 0;
  const totalChapters = subjects.reduce((acc, s) => acc + s.chapters.length, 0);

  // Bookmarked questions list
  const bookmarkedQuestions = allQuestions.filter(q => {
    if (!bookmarks.includes(q.id)) return false;
    if (bookmarkSubjectFilter !== 'all' && q.subjectId !== bookmarkSubjectFilter) return false;
    return true;
  });

  const handleSaveProfile = () => {
    const updated = {
      ...user,
      name: editName,
      targetExam: editTargetExam
    };
    StorageService.updateUserProfile(updated);
    setUser(updated);
    setIsEditingProfile(false);
  };

  return (
    <div className="space-y-8">
      {/* Student Profile Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-blue-400/60 shadow-lg"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80';
              }}
            />
            <span className="absolute -bottom-1 -right-1 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-blue-600 rounded-full border border-white/20">
              {user.role}
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold font-['Outfit']">
                {user.name}
              </h1>
              <button
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Edit Profile"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-xs text-blue-200 font-mono">
              Roll No: {user.rollNumber} · {user.email}
            </p>
            <p className="text-xs text-slate-300">
              Target: <strong className="text-white">{user.targetExam}</strong>
            </p>
          </div>
        </div>

        {/* Quick Quick KPI Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md text-center">
            <span className="text-[11px] text-slate-300 block">{t('Tests Taken', 'कुल टेस्ट')}</span>
            <span className="font-mono font-bold text-lg text-white">{totalAttempts}</span>
          </div>
          <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md text-center">
            <span className="text-[11px] text-slate-300 block">{t('Total Marks', 'कुल अंक')}</span>
            <span className="font-mono font-bold text-lg text-blue-300">{totalScore}</span>
          </div>
          <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md text-center">
            <span className="text-[11px] text-slate-300 block">{t('Avg Score', 'औसत')}</span>
            <span className="font-mono font-bold text-lg text-emerald-300">{avgPercentage}%</span>
          </div>
          <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md text-center">
            <span className="text-[11px] text-slate-300 block">{t('Chapters', 'अध्याय')}</span>
            <span className="font-mono font-bold text-lg text-amber-300">
              {totalCompletedChapters}/{totalChapters}
            </span>
          </div>
        </div>
      </div>

      {/* Edit Profile Panel */}
      {isEditingProfile && (
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 animate-in fade-in">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
            {t('Edit Student Information', 'विद्यार्थी विवरण संपादित करें')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">
                {t('Full Name', 'पूरा नाम')}
              </label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">
                {t('Target Examination', 'लक्षित परीक्षा')}
              </label>
              <select
                value={editTargetExam}
                onChange={(e) => setEditTargetExam(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option value="JEECUP Group A (UP Polytechnic)">JEECUP Group A (UP Polytechnic)</option>
                <option value="Bihar Polytechnic (DCECE/PE)">Bihar Polytechnic (DCECE/PE)</option>
                <option value="MP PPT (Madhya Pradesh)">MP PPT (Madhya Pradesh)</option>
                <option value="Delhi CET Polytechnic">Delhi CET Polytechnic</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2 justify-end">
            <button
              onClick={() => setIsEditingProfile(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveProfile}
              className="px-4 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-500 cursor-pointer"
            >
              Save Profile
            </button>
          </div>
        </div>
      )}

      {/* Dashboard Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        {[
          { id: 'overview', labelEn: 'Learning Progress', labelHi: 'अध्ययन प्रगति' },
          { id: 'history', labelEn: `Test History (${totalAttempts})`, labelHi: `टेस्ट इतिहास (${totalAttempts})` },
          { id: 'bookmarks', labelEn: `Saved Questions (${bookmarks.length})`, labelHi: `बुकमार्क प्रश्न (${bookmarks.length})` }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveDashTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeDashTab === tab.id
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {t(tab.labelEn, tab.labelHi)}
          </button>
        ))}
      </div>

      {/* Sub-Tab 1: Learning Progress */}
      {activeDashTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subjects.map(subject => {
              const completedInSubject = subject.chapters.filter(c =>
                user.completedChapters?.includes(c.id)
              ).length;
              const percent = Math.round((completedInSubject / subject.chapters.length) * 100);

              return (
                <div
                  key={subject.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                      {t(subject.nameEn, subject.nameHi)}
                    </h3>
                    <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                      {percent}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>

                  {/* Chapters Checklist */}
                  <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    {subject.chapters.map(ch => {
                      const done = user.completedChapters?.includes(ch.id);
                      return (
                        <div
                          key={ch.id}
                          onClick={() => openChapter(subject.id, ch.id)}
                          className="flex items-center justify-between text-xs p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                        >
                          <span className={`truncate max-w-[200px] ${done ? 'text-slate-400 line-through' : 'text-slate-700 dark:text-slate-300'}`}>
                            {ch.order}. {t(ch.titleEn, ch.titleHi)}
                          </span>
                          {done ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          ) : (
                            <span className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">Study →</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Sub-Tab 2: Test History */}
      {activeDashTab === 'history' && (
        <div className="space-y-4">
          {testAttempts.length === 0 ? (
            <div className="text-center py-12 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <p className="text-xs text-slate-500">
                {t('You have not attempted any mock tests yet.', 'आपने अभी तक कोई मॉक टेस्ट नहीं दिया है।')}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {testAttempts.map(attempt => (
                <div
                  key={attempt.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded">
                        {attempt.date}
                      </span>
                      <span className="text-xs text-slate-400">· {attempt.examType}</span>
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                      {attempt.testTitle}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span>{t('Score:', 'अंक:')} <strong className="text-slate-800 dark:text-slate-200 font-mono">{attempt.totalScore}/{attempt.maxMarks}</strong></span>
                      <span>{t('Correct:', 'सही:')} <strong className="text-emerald-600 font-mono">{attempt.correctCount}</strong></span>
                      <span>{t('Incorrect:', 'गलत:')} <strong className="text-rose-600 font-mono">{attempt.incorrectCount}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right sm:block">
                      <span className="text-xl font-bold font-mono text-blue-600 dark:text-blue-400">
                        {attempt.percentage}%
                      </span>
                      <span className="text-[10px] text-slate-400 block">
                        {Math.floor(attempt.timeTakenSeconds / 60)}m {attempt.timeTakenSeconds % 60}s
                      </span>
                    </div>

                    <button
                      onClick={() => setSelectedAttemptForReview(attempt)}
                      className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-slate-700 dark:text-slate-300 font-semibold text-xs transition-colors cursor-pointer"
                    >
                      {t('Review Solutions', 'उत्तर देखें')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Sub-Tab 3: Bookmarks */}
      {activeDashTab === 'bookmarks' && (
        <div className="space-y-4">
          {/* Subject Filter for Bookmarks */}
          <div className="flex items-center gap-2">
            {[
              { id: 'all', label: 'All Subjects' },
              { id: 'mathematics', label: 'Mathematics' },
              { id: 'physics', label: 'Physics' },
              { id: 'chemistry', label: 'Chemistry' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setBookmarkSubjectFilter(f.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                  bookmarkSubjectFilter === f.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {bookmarkedQuestions.length === 0 ? (
            <div className="text-center py-12 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <p className="text-xs text-slate-500">
                {t('No questions bookmarked yet. Click the bookmark icon on any question to save here for revision.', 'कोई प्रश्न बुकमार्क नहीं है। किसी भी प्रश्न पर बुकमार्क आइकन क्लिक करके यहाँ सहेजें।')}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookmarkedQuestions.map((q, idx) => (
                <div
                  key={q.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-bold uppercase text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded">
                      {q.subjectId} · {q.chapterTitleEn || 'Chapter'}
                    </span>
                    <button
                      onClick={() => toggleBookmark(q.id)}
                      className="text-rose-500 hover:text-rose-700 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{t('Remove', 'हटाएं')}</span>
                    </button>
                  </div>

                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {t(q.textEn, q.textHi)}
                  </p>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-xs space-y-1">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      {t('Correct Answer: Option', 'सही उत्तर: विकल्प')} {String.fromCharCode(65 + q.correctOptionIndex)} ({q.optionsEn[q.correctOptionIndex]})
                    </span>
                    <p className="text-slate-600 dark:text-slate-300">
                      {t(q.explanationEn, q.explanationHi)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Review Attempt Modal if selected */}
      {selectedAttemptForReview && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h2 className="font-bold text-base text-slate-900 dark:text-white">
                  {selectedAttemptForReview.testTitle}
                </h2>
                <span className="text-xs text-slate-400 font-mono">
                  {selectedAttemptForReview.date} · Score: {selectedAttemptForReview.totalScore}/{selectedAttemptForReview.maxMarks} ({selectedAttemptForReview.percentage}%)
                </span>
              </div>
              <button
                onClick={() => setSelectedAttemptForReview(null)}
                className="text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-4">
              {selectedAttemptForReview.answers.map((ans, idx) => {
                const questionObj = allQuestions.find(q => q.id === ans.questionId);
                return (
                  <div
                    key={ans.questionId}
                    className={`p-4 rounded-xl border text-xs space-y-2 ${
                      ans.isCorrect
                        ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300'
                        : ans.selectedOption === null
                        ? 'bg-slate-50 dark:bg-slate-800 border-slate-200'
                        : 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-300'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold">
                      <span>Q{idx + 1}</span>
                      <span>
                        {ans.isCorrect ? '✓ Correct (+4)' : ans.selectedOption === null ? 'Skipped (0)' : '✗ Incorrect (0)'}
                      </span>
                    </div>
                    {questionObj && (
                      <p className="font-medium text-slate-800 dark:text-slate-200">
                        {t(questionObj.textEn, questionObj.textHi)}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
                      <span>{t('Your answer:', 'आपका उत्तर:')} {ans.selectedOption !== null ? String.fromCharCode(65 + ans.selectedOption) : 'None'}</span>
                      <span>{t('Correct answer:', 'सही उत्तर:')} {String.fromCharCode(65 + ans.correctOption)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
