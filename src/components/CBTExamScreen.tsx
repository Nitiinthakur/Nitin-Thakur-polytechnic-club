import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Question, TestAttempt, QuestionAnswerState } from '../types';
import { StorageService } from '../services/storage';
import {
  Clock,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Flag,
  Send,
  Bookmark,
  Check,
  Languages,
  ShieldCheck,
  User as UserIcon
} from 'lucide-react';
import { TestResultModal } from './TestResultModal';

export const CBTExamScreen: React.FC = () => {
  const {
    user,
    activeMockTest,
    activePYQPaper,
    activeExamMode,
    setActiveTab,
    refreshAttempts,
    toggleBookmark,
    isBookmarked,
    t
  } = useApp();

  // Test setup
  const questions: Question[] = activeMockTest
    ? activeMockTest.questions
    : activePYQPaper
    ? activePYQPaper.questions
    : [];

  const examTitle = activeMockTest
    ? t(activeMockTest.titleEn, activeMockTest.titleHi)
    : activePYQPaper
    ? `${activePYQPaper.examName} (${activePYQPaper.year})`
    : 'Polytechnic CBT Mock Exam';

  const totalQuestions = questions.length;
  const initialDurationMinutes = activeMockTest
    ? activeMockTest.durationMinutes
    : activePYQPaper
    ? activePYQPaper.durationMinutes
    : 60;

  // Local examination state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, QuestionAnswerState>>({});
  const [secondsRemaining, setSecondsRemaining] = useState<number>(initialDurationMinutes * 60);
  const [examLanguage, setExamLanguage] = useState<'en' | 'hi'>('en');
  const [showSubmitConfirm, setShowSubmitConfirm] = useState<boolean>(false);
  const [submittedAttempt, setSubmittedAttempt] = useState<TestAttempt | null>(null);
  const [selectedSection, setSelectedSection] = useState<'all' | 'mathematics' | 'physics' | 'chemistry'>('all');

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize answer states
  useEffect(() => {
    const initial: Record<string, QuestionAnswerState> = {};
    questions.forEach((q, idx) => {
      initial[q.id] = {
        questionId: q.id,
        selectedOption: null,
        isMarkedForReview: false,
        isVisited: idx === 0
      };
    });
    setAnswers(initial);
  }, [questions]);

  // Countdown timer
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const formatTimer = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    if (hrs > 0) {
      return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const currentQ = questions[currentQuestionIndex];

  // Filter questions for sections
  const filteredQuestionIndices = questions
    .map((q, idx) => ({ q, idx }))
    .filter(({ q }) => {
      if (selectedSection === 'all') return true;
      return q.subjectId === selectedSection;
    })
    .map(({ idx }) => idx);

  // Handlers
  const handleSelectOption = (optionIndex: number) => {
    if (!currentQ) return;
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: {
        ...prev[currentQ.id],
        selectedOption: optionIndex,
        isVisited: true
      }
    }));
  };

  const handleClearResponse = () => {
    if (!currentQ) return;
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: {
        ...prev[currentQ.id],
        selectedOption: null
      }
    }));
  };

  const handleMarkForReviewAndNext = () => {
    if (!currentQ) return;
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: {
        ...prev[currentQ.id],
        isMarkedForReview: !prev[currentQ.id]?.isMarkedForReview,
        isVisited: true
      }
    }));
    handleNext();
  };

  const handleSaveAndNext = () => {
    if (!currentQ) return;
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: {
        ...prev[currentQ.id],
        isVisited: true
      }
    }));
    handleNext();
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      const nextIdx = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIdx);
      const nextQ = questions[nextIdx];
      if (nextQ) {
        setAnswers(prev => ({
          ...prev,
          [nextQ.id]: {
            ...prev[nextQ.id],
            isVisited: true
          }
        }));
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const jumpToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
    const q = questions[index];
    if (q) {
      setAnswers(prev => ({
        ...prev,
        [q.id]: {
          ...prev[q.id],
          isVisited: true
        }
      }));
    }
  };

  // Stats for palette
  const answeredCount = Object.values(answers).filter(a => a.selectedOption !== null).length;
  const markedForReviewCount = Object.values(answers).filter(a => a.isMarkedForReview).length;
  const visitedCount = Object.values(answers).filter(a => a.isVisited).length;
  const notAnsweredCount = visitedCount - answeredCount;
  const notVisitedCount = totalQuestions - visitedCount;

  // Submit test and evaluate
  const executeSubmit = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;

    const subjectStats = {
      mathematics: { correct: 0, incorrect: 0, score: 0, total: 0 },
      physics: { correct: 0, incorrect: 0, score: 0, total: 0 },
      chemistry: { correct: 0, incorrect: 0, score: 0, total: 0 }
    };

    const evaluatedAnswers = questions.map(q => {
      const userAns = answers[q.id]?.selectedOption ?? null;
      const sub = q.subjectId || 'mathematics';
      subjectStats[sub].total += 1;

      if (userAns === null) {
        unattemptedCount += 1;
        return {
          questionId: q.id,
          selectedOption: null,
          correctOption: q.correctOptionIndex,
          isCorrect: false
        };
      }

      if (userAns === q.correctOptionIndex) {
        correctCount += 1;
        subjectStats[sub].correct += 1;
        subjectStats[sub].score += 4;
        return {
          questionId: q.id,
          selectedOption: userAns,
          correctOption: q.correctOptionIndex,
          isCorrect: true
        };
      } else {
        incorrectCount += 1;
        subjectStats[sub].incorrect += 1;
        // Negative marking check
        const neg = activeMockTest?.negativeMarking ?? 0;
        subjectStats[sub].score -= neg;
        return {
          questionId: q.id,
          selectedOption: userAns,
          correctOption: q.correctOptionIndex,
          isCorrect: false
        };
      }
    });

    const marksPerQ = 4;
    const maxMarks = totalQuestions * marksPerQ;
    const totalScore = correctCount * 4 - incorrectCount * (activeMockTest?.negativeMarking ?? 0);
    const percentage = Math.max(0, Math.round((totalScore / maxMarks) * 100));
    const timeSpent = (initialDurationMinutes * 60) - secondsRemaining;

    const attempt: TestAttempt = {
      id: 'attempt-' + Date.now(),
      userId: user?.id || 'guest',
      testId: activeMockTest?.id || activePYQPaper?.id || 'test-custom',
      testTitle: examTitle,
      examType: activeMockTest?.examType || activePYQPaper?.examName || 'JEECUP CBT',
      totalQuestions,
      attemptedCount: answeredCount,
      correctCount,
      incorrectCount,
      unattemptedCount,
      totalScore,
      maxMarks,
      percentage,
      timeTakenSeconds: timeSpent,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      subjectScores: subjectStats,
      answers: evaluatedAnswers
    };

    StorageService.saveTestAttempt(attempt);
    refreshAttempts();
    setSubmittedAttempt(attempt);
    setShowSubmitConfirm(false);
  };

  const handleAutoSubmit = () => {
    executeSubmit();
  };

  if (totalQuestions === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">No questions found in this test.</p>
        <button
          onClick={() => setActiveTab('mock-tests')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold"
        >
          Return to Mock Tests
        </button>
      </div>
    );
  }

  // If test has been submitted, display result modal
  if (submittedAttempt) {
    return (
      <TestResultModal
        attempt={submittedAttempt}
        questions={questions}
        onClose={() => {
          setSubmittedAttempt(null);
          setActiveTab('dashboard');
        }}
        onRetake={() => {
          setSubmittedAttempt(null);
          setSecondsRemaining(initialDurationMinutes * 60);
          setCurrentQuestionIndex(0);
          const initial: Record<string, QuestionAnswerState> = {};
          questions.forEach((q, idx) => {
            initial[q.id] = {
              questionId: q.id,
              selectedOption: null,
              isMarkedForReview: false,
              isVisited: idx === 0
            };
          });
          setAnswers(initial);
        }}
      />
    );
  }

  const currentAnsState = currentQ ? answers[currentQ.id] : undefined;
  const currentSelectedOption = currentAnsState?.selectedOption ?? null;
  const isMarked = currentAnsState?.isMarkedForReview ?? false;
  const options = examLanguage === 'hi' ? currentQ?.optionsHi : currentQ?.optionsEn;

  return (
    <div className="space-y-4">
      {/* CBT Top Examination Bar */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-lg border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Exam title & Candidate Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-md">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-sm sm:text-base font-['Outfit'] leading-tight">
              {examTitle}
            </h1>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
              <span>{user ? user.name : 'Candidate: Nitin Kumar'}</span>
              <span>·</span>
              <span className="font-mono">{user ? user.rollNumber : 'JEEC-2026-001'}</span>
            </div>
          </div>
        </div>

        {/* Right: Language switch & Live Countdown Timer */}
        <div className="flex items-center justify-between md:justify-end gap-3">
          {/* Exam Screen Language Switcher */}
          <div className="flex items-center bg-slate-800 border border-slate-700 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => setExamLanguage('en')}
              className={`px-2.5 py-1 rounded font-semibold transition-colors ${
                examLanguage === 'en' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setExamLanguage('hi')}
              className={`px-2.5 py-1 rounded font-semibold transition-colors ${
                examLanguage === 'hi' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              हिंदी
            </button>
          </div>

          {/* Countdown Clock */}
          <div
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border font-mono font-bold text-sm sm:text-base ${
              secondsRemaining < 300
                ? 'bg-rose-500/20 text-rose-400 border-rose-500 animate-pulse'
                : 'bg-slate-800 text-emerald-400 border-slate-700'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>{formatTimer(secondsRemaining)}</span>
          </div>

          {/* Submit Test Trigger Button */}
          <button
            onClick={() => setShowSubmitConfirm(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow transition-all cursor-pointer whitespace-nowrap"
          >
            {t('Submit Test', 'टेस्ट जमा करें')}
          </button>
        </div>
      </div>

      {/* Main CBT Grid (Question Canvas + Question Palette) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* Left Column (Question Area) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Section Selector Tab Strip */}
          <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-x-auto">
            {[
              { id: 'all', label: 'All Sections' },
              { id: 'mathematics', label: 'Mathematics' },
              { id: 'physics', label: 'Physics' },
              { id: 'chemistry', label: 'Chemistry' }
            ].map(sec => (
              <button
                key={sec.id}
                onClick={() => setSelectedSection(sec.id as any)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  selectedSection === sec.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {sec.label}
              </button>
            ))}
          </div>

          {/* Question Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            {/* Question Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2.5 py-1 bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 rounded-md">
                  {t(`Question ${currentQuestionIndex + 1} of ${totalQuestions}`, `प्रश्न ${currentQuestionIndex + 1} / ${totalQuestions}`)}
                </span>
                <span className="text-[11px] font-semibold text-slate-500 uppercase">
                  {currentQ?.subjectId}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold font-mono">
                  +4 Marks
                </span>
                <span className="text-slate-400 font-mono">
                  -0 Negative
                </span>
                <button
                  onClick={() => currentQ && toggleBookmark(currentQ.id)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    currentQ && isBookmarked(currentQ.id)
                      ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                  title="Bookmark"
                >
                  <Bookmark className="w-4 h-4" fill={currentQ && isBookmarked(currentQ.id) ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>

            {/* Question Statement */}
            <div className="text-base font-semibold text-slate-900 dark:text-white leading-relaxed">
              {currentQ && (examLanguage === 'hi' ? currentQ.textHi : currentQ.textEn)}
            </div>

            {/* 4 Options */}
            <div className="space-y-3 pt-2">
              {options?.map((opt, optIdx) => {
                const isSelected = currentSelectedOption === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full p-4 rounded-xl border text-left text-sm transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50 dark:bg-blue-950/50 border-blue-600 dark:border-blue-500 text-blue-900 dark:text-blue-200 font-semibold shadow-sm'
                        : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-blue-400 dark:hover:border-blue-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                          isSelected
                            ? 'border-blue-600 bg-blue-600 text-white'
                            : 'border-slate-400 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {String.fromCharCode(65 + optIdx)}
                      </div>
                      <span>{opt}</span>
                    </div>

                    {isSelected && (
                      <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Action Controls */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {/* Clear Response */}
              <button
                onClick={handleClearResponse}
                disabled={currentSelectedOption === null}
                className="px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                {t('Clear Response', 'उत्तर हटाएं')}
              </button>

              {/* Mark for review & next */}
              <button
                onClick={handleMarkForReviewAndNext}
                className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border transition-colors cursor-pointer ${
                  isMarked
                    ? 'bg-purple-100 dark:bg-purple-950/60 border-purple-400 text-purple-700 dark:text-purple-300'
                    : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-purple-50'
                }`}
              >
                <Flag className="w-3.5 h-3.5" />
                <span>{isMarked ? t('Unmark Review', 'समीक्षा हटाएं') : t('Mark for Review & Next', 'समीक्षा हेतु चिह्नित करें')}</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              {/* Previous */}
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className="flex items-center gap-1 px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{t('Previous', 'पिछला')}</span>
              </button>

              {/* Save & Next */}
              <button
                onClick={handleSaveAndNext}
                className="flex items-center gap-1 px-5 py-2 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition-all cursor-pointer"
              >
                <span>{t('Save & Next', 'सहेजें व अगला')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (Question Palette & Counters) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Status Legends / Counters */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500">
              {t('Question Palette Legends', 'प्रश्नों की स्थिति')}
            </h3>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-emerald-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                  {answeredCount}
                </span>
                <span className="text-slate-600 dark:text-slate-300">{t('Answered', 'उत्तर दिए गए')}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-rose-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                  {notAnsweredCount}
                </span>
                <span className="text-slate-600 dark:text-slate-300">{t('Not Answered', 'अनुत्तरित')}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-purple-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                  {markedForReviewCount}
                </span>
                <span className="text-slate-600 dark:text-slate-300">{t('Marked Review', 'समीक्षा हेतु')}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-mono font-bold text-xs flex items-center justify-center">
                  {notVisitedCount}
                </span>
                <span className="text-slate-600 dark:text-slate-300">{t('Not Visited', 'नहीं देखे गए')}</span>
              </div>
            </div>
          </div>

          {/* Question Number Palette Grid */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500">
                {t('Jump to Question', 'प्रश्न पर जाएं')}
              </h3>
              <span className="text-[11px] text-slate-400 font-mono">
                {filteredQuestionIndices.length} {t('in section', 'वर्ग में')}
              </span>
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-5 gap-2 max-h-[360px] overflow-y-auto p-1">
              {filteredQuestionIndices.map(idx => {
                const q = questions[idx];
                const state = answers[q.id];
                const isCurrent = idx === currentQuestionIndex;
                const isAnswered = state?.selectedOption !== null;
                const isMarked = state?.isMarkedForReview;
                const isVisited = state?.isVisited;

                let colorStyle = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'; // Not visited

                if (isMarked && isAnswered) {
                  colorStyle = 'bg-purple-600 text-white border-emerald-400 border-2 font-bold';
                } else if (isMarked) {
                  colorStyle = 'bg-purple-600 text-white font-bold';
                } else if (isAnswered) {
                  colorStyle = 'bg-emerald-600 text-white font-bold';
                } else if (isVisited) {
                  colorStyle = 'bg-rose-500 text-white font-semibold';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => jumpToQuestion(idx)}
                    className={`h-9 rounded-lg font-mono text-xs transition-all flex items-center justify-center border cursor-pointer ${colorStyle} ${
                      isCurrent ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-slate-900 scale-105' : ''
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Final Submit Block */}
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-center space-y-2">
            <button
              onClick={() => setShowSubmitConfirm(true)}
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{t('Final Submit Examination', 'परीक्षा अंतिम रूप से जमा करें')}</span>
            </button>
            <p className="text-[11px] text-slate-500">
              {t('You can review and change your answers anytime before final submission.', 'अंतिम सबमिशन से पूर्व आप कभी भी उत्तर बदल सकते हैं।')}
            </p>
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl animate-in zoom-in-95">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h2 className="font-extrabold text-lg text-slate-900 dark:text-white font-['Outfit']">
                {t('Confirm Test Submission', 'टेस्ट सबमिशन की पुष्टि')}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t('Please review your attempt summary before final submission:', 'अंतिम सबमिशन से पहले अपने उत्तरों की समीक्षा करें:')}
              </p>
            </div>

            {/* Attempt Summary */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-center space-y-1">
                <span className="text-slate-500">{t('Total Questions', 'कुल प्रश्न')}</span>
                <p className="font-mono font-bold text-base text-slate-900 dark:text-white">{totalQuestions}</p>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-center space-y-1">
                <span className="text-emerald-700 dark:text-emerald-300">{t('Answered', 'उत्तर दिए गए')}</span>
                <p className="font-mono font-bold text-base text-emerald-600 dark:text-emerald-400">{answeredCount}</p>
              </div>
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-center space-y-1">
                <span className="text-rose-700 dark:text-rose-300">{t('Not Answered', 'अनुत्तरित')}</span>
                <p className="font-mono font-bold text-base text-rose-600 dark:text-rose-400">{totalQuestions - answeredCount}</p>
              </div>
              <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-center space-y-1">
                <span className="text-purple-700 dark:text-purple-300">{t('Marked Review', 'समीक्षा हेतु')}</span>
                <p className="font-mono font-bold text-base text-purple-600 dark:text-purple-400">{markedForReviewCount}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                {t('Return to Test', 'टेस्ट पर वापस जाएं')}
              </button>
              <button
                onClick={executeSubmit}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                {t('Yes, Submit Now', 'हाँ, जमा करें')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
