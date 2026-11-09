import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MockTest } from '../types';
import { StorageService } from '../services/storage';
import {
  ClipboardCheck,
  Clock,
  Award,
  AlertCircle,
  Play,
  HelpCircle,
  CheckCircle2,
  Filter,
  Flame,
  Zap,
  Target
} from 'lucide-react';

export const MockTestPortal: React.FC = () => {
  const { startMockTest, testAttempts, t } = useApp();
  const [tests] = useState<MockTest[]>(() => StorageService.getMockTests());
  const [selectedFilter, setSelectedFilter] = useState<'All' | '100' | '50' | '25'>('All');

  const filteredTests = tests.filter(test => {
    if (selectedFilter === 'All') return true;
    return test.questionCount === Number(selectedFilter);
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
          <ClipboardCheck className="w-4 h-4" />
          <span>{t('National Level Exam Simulator', 'राष्ट्रीय स्तरीय परीक्षा सिमुलेटर')}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
          {t('Online CBT Mock Test System', 'ऑनलाइन कंप्यूटर आधारित मॉक टेस्ट')}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
          {t(
            'Practice in authentic JEECUP & State entrance CBT interface. Available in 25, 50, and 100-question timed sets with negative marking analysis and detailed scorecards.',
            'वास्तविक JEECUP परीक्षा इंटरफेस में अभ्यास करें। 25, 50 एवं 100 प्रश्नों के समयबद्ध टेस्ट, स्वचालित परिणाम एवं विस्तृत समाधान सहित उपलब्ध।'
          )}
        </p>
      </div>

      {/* Test Length Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {[
          { id: 'All', labelEn: 'All Tests', labelHi: 'सभी टेस्ट' },
          { id: '100', labelEn: '100 Questions (Grand Mock)', labelHi: '100 प्रश्न (महा मॉक)' },
          { id: '50', labelEn: '50 Questions (Speed Booster)', labelHi: '50 प्रश्न (स्पीड टेस्ट)' },
          { id: '25', labelEn: '25 Questions (Quick Sprint)', labelHi: '25 प्रश्न (रैपिड टेस्ट)' }
        ].map(filter => (
          <button
            key={filter.id}
            onClick={() => setSelectedFilter(filter.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedFilter === filter.id
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {t(filter.labelEn, filter.labelHi)}
          </button>
        ))}
      </div>

      {/* Rules and Marking Scheme Notice */}
      <div className="p-5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/80 dark:border-blue-900/40 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 font-bold">
            +4
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white">{t('Marking Scheme', 'अंकन योजना')}</h4>
            <p className="text-slate-600 dark:text-slate-400 mt-0.5">
              {t('+4 Marks for each correct answer; 0 or -1 based on state rule.', 'प्रत्येक सही उत्तर पर +4 अंक; राज्य अनुसार 0 या -1।')}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white">{t('Countdown Timer', 'समय सीमा')}</h4>
            <p className="text-slate-600 dark:text-slate-400 mt-0.5">
              {t('Auto-submits when time expires. Timer warning when under 5 mins.', 'समय समाप्त होने पर स्वतः जमा। अंतिम 5 मिनट पर चेतावनी।')}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white">{t('Instant Scorecard', 'त्वरित रिपोर्ट')}</h4>
            <p className="text-slate-600 dark:text-slate-400 mt-0.5">
              {t('Subject-wise accuracy, speed analysis, and bilingual explanations.', 'विषयवार सटीकता, गति विश्लेषण और द्विभाषी समाधान।')}
            </p>
          </div>
        </div>
      </div>

      {/* Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTests.map(test => {
          // Check if previously attempted
          const attempt = testAttempts.find(a => a.testId === test.id);

          return (
            <div
              key={test.id}
              className="flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-400 dark:hover:border-blue-600 transition-all space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-md">
                    {test.questionCount} {t('Questions', 'प्रश्न')}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    {test.totalMarks} {t('Marks', 'अंक')}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                    {t(test.titleEn, test.titleHi)}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {t(test.descriptionEn, test.descriptionHi)}
                  </p>
                </div>

                {/* Test Specs */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2 text-[11px] text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-500" />
                    <span>{test.durationMinutes} {t('Minutes', 'मिनट')}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{test.difficulty} {t('Level', 'स्तर')}</span>
                  </div>
                  <div className="col-span-2 text-slate-500 font-medium">
                    {t('Pattern: 4 Options CBT', 'पैटर्न: 4 विकल्प कंप्यूटर परीक्षा')}
                  </div>
                </div>

                {/* Previous Attempt Summary if present */}
                {attempt && (
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-xs flex items-center justify-between">
                    <span className="text-slate-500">{t('Last Score:', 'पिछला स्कोर:')}</span>
                    <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                      {attempt.totalScore} / {attempt.maxMarks} ({attempt.percentage}%)
                    </span>
                  </div>
                )}
              </div>

              {/* Start Test CTA */}
              <div className="pt-2">
                <button
                  onClick={() => startMockTest(test)}
                  className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>
                    {attempt
                      ? t('Re-attempt CBT Test', 'पुनः टेस्ट दें')
                      : t('Start Online Test', 'ऑनलाइन टेस्ट शुरू करें')}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
