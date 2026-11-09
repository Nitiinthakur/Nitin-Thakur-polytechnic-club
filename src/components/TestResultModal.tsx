import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TestAttempt, Question } from '../types';
import {
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  TrendingUp,
  RotateCcw,
  LayoutDashboard,
  Check,
  Bookmark,
  Share2,
  ChevronDown,
  Filter
} from 'lucide-react';

interface TestResultModalProps {
  attempt: TestAttempt;
  questions: Question[];
  onClose: () => void;
  onRetake: () => void;
}

export const TestResultModal: React.FC<TestResultModalProps> = ({
  attempt,
  questions,
  onClose,
  onRetake
}) => {
  const { toggleBookmark, isBookmarked, t } = useApp();
  const [filterType, setFilterType] = useState<'all' | 'correct' | 'incorrect' | 'unattempted'>('all');
  const [expandedSolutions, setExpandedSolutions] = useState<Record<string, boolean>>({});

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}m ${secs}s`;
  };

  const accuracy = attempt.attemptedCount > 0
    ? Math.round((attempt.correctCount / attempt.attemptedCount) * 100)
    : 0;

  // Filter questions for detailed analysis
  const filteredQuestions = questions.filter(q => {
    const ans = attempt.answers.find(a => a.questionId === q.id);
    if (!ans) return filterType === 'all' || filterType === 'unattempted';
    if (filterType === 'all') return true;
    if (filterType === 'correct') return ans.isCorrect;
    if (filterType === 'incorrect') return ans.selectedOption !== null && !ans.isCorrect;
    if (filterType === 'unattempted') return ans.selectedOption === null;
    return true;
  });

  const toggleExpand = (qId: string) => {
    setExpandedSolutions(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Scorecard Hero Banner */}
      <div className="relative overflow-hidden p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white shadow-2xl border border-slate-800">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left summary & Rank badge */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{t('Examination Successfully Evaluated', 'परीक्षा परिणाम सफलतापूर्वक तैयार')}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-['Outfit']">
              {attempt.testTitle}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300">
              {t(
                'Detailed performance summary computed automatically per JEECUP marking guidelines (+4 per correct answer).',
                'JEECUP अंकन प्रणाली के अनुसार स्वतः गणना किया गया विस्तृत प्रदर्शन सारांश (+4 अंक प्रति सही उत्तर)।'
              )}
            </p>

            {/* Main Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onRetake}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t('Re-take Mock Test', 'पुनः टेस्ट दें')}</span>
              </button>

              <button
                onClick={onClose}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs transition-all cursor-pointer"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-blue-300" />
                <span>{t('Go to Student Dashboard', 'डैशबोर्ड पर जाएं')}</span>
              </button>
            </div>
          </div>

          {/* Right: Big Score Circle */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 text-center space-y-2">
            <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">
              {t('Total Score Obtained', 'प्राप्तांक')}
            </span>
            <div className="text-4xl sm:text-5xl font-extrabold font-mono text-white tracking-tight">
              {attempt.totalScore}
              <span className="text-xl sm:text-2xl text-slate-400 font-normal"> / {attempt.maxMarks}</span>
            </div>
            <div className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
              {attempt.percentage}% {t('Overall Score', 'कुल प्रतिशत')} · {accuracy}% {t('Accuracy', 'सटीकता')}
            </div>
          </div>
        </div>
      </div>

      {/* 4 Diagnostic Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>{t('Correct Answers', 'सही उत्तर')}</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
            {attempt.correctCount} <span className="text-xs text-slate-400 font-normal">/ {attempt.totalQuestions}</span>
          </div>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
            +{attempt.correctCount * 4} Marks
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>{t('Incorrect Answers', 'गलत उत्तर')}</span>
            <XCircle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-rose-600 dark:text-rose-400">
            {attempt.incorrectCount}
          </div>
          <span className="text-[11px] text-rose-500 font-medium">
            {attempt.incorrectCount > 0 ? t('Need Concept Revision', 'पुनः रिवीज़न आवश्यक') : t('Zero Errors', 'शून्य त्रुटि')}
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>{t('Unattempted', 'अनुत्तरित प्रश्न')}</span>
            <HelpCircle className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-700 dark:text-slate-300">
            {attempt.unattemptedCount}
          </div>
          <span className="text-[11px] text-slate-400 font-medium">
            {t('Left Blank', 'छोड़े गए')}
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>{t('Time Spent', 'लिया गया समय')}</span>
            <Clock className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-blue-600 dark:text-blue-400">
            {formatTime(attempt.timeTakenSeconds)}
          </div>
          <span className="text-[11px] text-slate-400 font-medium">
            ~{Math.round(attempt.timeTakenSeconds / Math.max(1, attempt.attemptedCount))}s {t('per question', 'प्रति प्रश्न')}
          </span>
        </div>
      </div>

      {/* Subject-Wise Performance Breakdown */}
      {attempt.subjectScores && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="font-bold text-base text-slate-900 dark:text-white font-['Outfit']">
            {t('Subject-wise Marks Breakdown', 'विषयवार अंक विश्लेषण')}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { id: 'mathematics', name: 'Mathematics (गणित)', stats: attempt.subjectScores.mathematics, color: 'blue' },
              { id: 'physics', name: 'Physics (भौतिक विज्ञान)', stats: attempt.subjectScores.physics, color: 'sky' },
              { id: 'chemistry', name: 'Chemistry (रसायन विज्ञान)', stats: attempt.subjectScores.chemistry, color: 'emerald' }
            ].map(item => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                  <span>{item.name}</span>
                  <span className="font-mono text-blue-600 dark:text-blue-400">
                    {item.stats.score} Marks
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-500 text-[11px]">
                  <span>{t('Correct:', 'सही:')} <strong className="text-emerald-600">{item.stats.correct}</strong></span>
                  <span>{t('Incorrect:', 'गलत:')} <strong className="text-rose-600">{item.stats.incorrect}</strong></span>
                  <span>{t('Total:', 'कुल:')} {item.stats.total} Qs</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Question-By-Question Detailed Analysis Header */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div>
            <h2 className="font-bold text-lg text-slate-900 dark:text-white font-['Outfit']">
              {t('Question Analysis & Solutions', 'प्रश्नवार विश्लेषण एवं विस्तृत हल')}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t('Review every question with candidate response and step-by-step bilingual explanations.', 'अपने उत्तर एवं आधिकारिक सही उत्तर की चरणबद्ध व्याख्या सहित समीक्षा करें।')}
            </p>
          </div>

          {/* Filter Segmented Control */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {[
              { id: 'all', label: `All (${questions.length})` },
              { id: 'correct', label: `Correct (${attempt.correctCount})` },
              { id: 'incorrect', label: `Incorrect (${attempt.incorrectCount})` },
              { id: 'unattempted', label: `Skipped (${attempt.unattemptedCount})` }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                  filterType === tab.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Question Cards List */}
        <div className="space-y-4">
          {filteredQuestions.map((q, idx) => {
            const userAnsRecord = attempt.answers.find(a => a.questionId === q.id);
            const userOption = userAnsRecord?.selectedOption ?? null;
            const isCorrect = userAnsRecord?.isCorrect ?? false;
            const isSkipped = userOption === null;
            const bookmarked = isBookmarked(q.id);

            return (
              <div
                key={q.id}
                className={`p-5 rounded-2xl border transition-all ${
                  isSkipped
                    ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                    : isCorrect
                    ? 'bg-emerald-50/30 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40'
                    : 'bg-rose-50/30 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/40'
                }`}
              >
                {/* Question Top Info */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-slate-800 font-mono font-bold text-xs flex items-center justify-center text-slate-800 dark:text-slate-200">
                      Q{idx + 1}
                    </span>
                    <span className="text-xs uppercase font-bold text-slate-500">
                      {q.subjectId}
                    </span>
                    {isCorrect ? (
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300">
                        ✓ Correct (+4)
                      </span>
                    ) : isSkipped ? (
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        Skipped (0)
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300">
                        ✗ Incorrect (0)
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => toggleBookmark(q.id)}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      bookmarked ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40' : 'text-slate-400 hover:text-slate-600'
                    }`}
                    title="Bookmark Question"
                  >
                    <Bookmark className="w-4 h-4" fill={bookmarked ? 'currentColor' : 'none'} />
                  </button>
                </div>

                {/* Question Statement */}
                <div className="space-y-1 mb-4">
                  <p className="font-semibold text-sm text-slate-900 dark:text-white leading-relaxed">
                    {q.textEn}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {q.textHi}
                  </p>
                </div>

                {/* 4 Options Comparison */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {q.optionsEn.map((opt, optIdx) => {
                    const isOfficialCorrect = optIdx === q.correctOptionIndex;
                    const isCandidateChoice = optIdx === userOption;

                    let optStyle = 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300';
                    if (isOfficialCorrect) {
                      optStyle = 'bg-emerald-100 dark:bg-emerald-950/60 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-bold';
                    } else if (isCandidateChoice && !isCorrect) {
                      optStyle = 'bg-rose-100 dark:bg-rose-950/60 border-rose-500 text-rose-800 dark:text-rose-200 font-medium';
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`p-3 rounded-xl border flex items-center justify-between ${optStyle}`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full border border-current font-mono text-[10px] flex items-center justify-center font-bold">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>
                        {isOfficialCorrect && (
                          <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
                            {t('Correct Answer', 'सही उत्तर')}
                          </span>
                        )}
                        {isCandidateChoice && !isCorrect && (
                          <span className="text-[10px] font-bold text-rose-700 dark:text-rose-300">
                            {t('Your Choice', 'आपका चयन')}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Detailed Bilingual Explanation */}
                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs space-y-1 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl">
                  <span className="font-bold text-blue-600 dark:text-blue-400 block">
                    {t('Step-by-step Solution & Concept:', 'विस्तृत समाधान एवं अवधारणा:')}
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {q.explanationEn}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed italic">
                    {q.explanationHi}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
