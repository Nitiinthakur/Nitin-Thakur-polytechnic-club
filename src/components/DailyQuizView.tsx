import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Question, LeaderboardEntry } from '../types';
import { StorageService } from '../services/storage';
import {
  Flame,
  Clock,
  Award,
  CheckCircle2,
  XCircle,
  Trophy,
  RotateCcw,
  Sparkles,
  ArrowRight,
  TrendingUp,
  User as UserIcon,
  Check
} from 'lucide-react';

export const DailyQuizView: React.FC = () => {
  const { user, t } = useApp();
  const [questions] = useState<Question[]>(() => StorageService.getDailyQuizQuestions());
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(() => StorageService.getLeaderboard());

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [quizTimer, setQuizTimer] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(true);

  useEffect(() => {
    let interval: any = null;
    if (isTimerActive && !isCompleted) {
      interval = setInterval(() => {
        setQuizTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, isCompleted]);

  const handleSelect = (optionIdx: number) => {
    setUserAnswers(prev => ({ ...prev, [currentIndex]: optionIdx }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    setIsCompleted(true);
    setIsTimerActive(false);

    // Calculate score
    let correct = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctOptionIndex) {
        correct++;
      }
    });

    const score = correct * 10;
    const mins = Math.floor(quizTimer / 60);
    const secs = quizTimer % 60;
    const timeTaken = `${mins} min ${secs} sec`;

    if (user) {
      const entry: LeaderboardEntry = {
        id: 'lead-' + Date.now(),
        studentName: user.name,
        rollNumber: user.rollNumber,
        score,
        totalMarks: 100,
        timeTaken,
        avatarUrl: user.avatarUrl,
        date: 'Just now',
        state: 'UP'
      };
      StorageService.addLeaderboardEntry(entry);
      setLeaderboard(StorageService.getLeaderboard());
    }
  };

  const currentQ = questions[currentIndex];
  const selectedAns = userAnswers[currentIndex];

  const totalCorrect = questions.reduce((acc, q, idx) => {
    return userAnswers[idx] === q.correctOptionIndex ? acc + 1 : acc;
  }, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
          <Flame className="w-4 h-4" />
          <span>{t('Daily Practice Sprint', 'दैनिक अभ्यास क्विज़')}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
          {t('Daily 10-Question Polytechnic Quiz', 'दैनिक 10 बहुविकल्पीय प्रश्नोत्तरी')}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
          {t(
            'Test your daily speed with 10 high-yield questions covering General Science, Mathematics, Physics, Chemistry and Exam GK. Compete on the daily leaderboard!',
            'दैनिक 10 प्रश्नों के साथ अपनी तैयारी की गति जांचें: सामान्य विज्ञान, गणित, भौतिकी, रसायन और परीक्षा उपयोगी सामान्य ज्ञान।'
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Quiz Canvas */}
        <div className="lg:col-span-7 space-y-6">
          {!isCompleted ? (
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              {/* Progress and Timer Header */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded-md">
                    {t(`Question ${currentIndex + 1} of ${questions.length}`, `प्रश्न ${currentIndex + 1} / ${questions.length}`)}
                  </span>
                  <span className="text-xs font-semibold uppercase text-slate-400">
                    {currentQ.subjectId}
                  </span>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs font-bold text-slate-600 dark:text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span>
                    {Math.floor(quizTimer / 60)}:{String(quizTimer % 60).padStart(2, '0')}
                  </span>
                </div>
              </div>

              {/* Question Statement */}
              <div className="space-y-1">
                <h3 className="font-bold text-base text-slate-900 dark:text-white leading-snug">
                  {currentQ.textEn}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {currentQ.textHi}
                </p>
              </div>

              {/* 4 Options */}
              <div className="space-y-2.5">
                {currentQ.optionsEn.map((opt, optIdx) => {
                  const isSelected = selectedAns === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelect(optIdx)}
                      className={`w-full p-3.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-amber-50 dark:bg-amber-950/50 border-amber-500 text-amber-900 dark:text-amber-200 font-semibold'
                          : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-amber-400'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full border border-current font-mono text-[10px] flex items-center justify-center font-bold">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt} / {currentQ.optionsHi[optIdx]}</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-amber-500 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Next / Submit Button */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNext}
                  disabled={selectedAns === undefined}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>
                    {currentIndex < questions.length - 1
                      ? t('Next Question', 'अगला प्रश्न')
                      : t('Finish Quiz', 'क्विज़ पूरा करें')}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            /* Quiz Completed Scorecard */
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl text-center space-y-5 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center mx-auto text-2xl font-bold">
                🏆
              </div>

              <div className="space-y-1">
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
                  {t('Daily Quiz Completed!', 'दैनिक क्विज़ संपन्न!')}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {t('Your daily score has been added to the public leaderboard.', 'आपका स्कोर दैनिक लीडरबोर्ड में जोड़ दिया गया है।')}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 inline-block px-8">
                <span className="text-xs text-amber-700 dark:text-amber-400 font-semibold block uppercase">
                  {t('Score Obtained', 'प्राप्तांक')}
                </span>
                <span className="text-4xl font-extrabold font-mono text-slate-900 dark:text-white">
                  {totalCorrect * 10} / 100
                </span>
                <span className="text-xs text-slate-500 block mt-1">
                  {totalCorrect} / 10 {t('Correct Answers', 'सही उत्तर')}
                </span>
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  onClick={() => {
                    setIsCompleted(false);
                    setCurrentIndex(0);
                    setUserAnswers({});
                    setQuizTimer(0);
                    setIsTimerActive(true);
                  }}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t('Try Again', 'पुनः प्रयास करें')}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right: Daily Leaderboard */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white font-['Outfit']">
                  {t('Daily Leaderboard', 'दैनिक लीडरबोर्ड')}
                </h3>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                Top Performers
              </span>
            </div>

            <div className="space-y-3">
              {leaderboard.map((entry, idx) => (
                <div
                  key={entry.id}
                  className={`p-3 rounded-2xl flex items-center justify-between border transition-all ${
                    idx === 0
                      ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800/60 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-6 h-6 rounded-full font-mono text-xs font-bold flex items-center justify-center shrink-0 ${
                        idx === 0
                          ? 'bg-amber-500 text-white'
                          : idx === 1
                          ? 'bg-slate-300 text-slate-800'
                          : idx === 2
                          ? 'bg-amber-700 text-white'
                          : 'text-slate-500'
                      }`}
                    >
                      {idx + 1}
                    </span>

                    <img
                      src={entry.avatarUrl}
                      alt={entry.studentName}
                      className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80';
                      }}
                    />

                    <div>
                      <div className="font-bold text-xs text-slate-900 dark:text-white leading-tight">
                        {entry.studentName}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {entry.rollNumber} · {entry.timeTaken}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-mono font-bold text-sm text-blue-600 dark:text-blue-400">
                      {entry.score}
                    </span>
                    <span className="text-[10px] text-slate-400 block">/ 100</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
