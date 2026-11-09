import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SubjectType } from '../types';
import {
  Calculator,
  Atom,
  FlaskConical,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  FileText,
  Zap,
  HelpCircle,
  Sparkles
} from 'lucide-react';

export const SubjectDirectory: React.FC = () => {
  const {
    subjects,
    selectedSubjectId,
    setSelectedSubjectId,
    openChapter,
    isChapterCompleted,
    t
  } = useApp();

  const [activeSubjectTab, setActiveSubjectTab] = useState<SubjectType>(
    selectedSubjectId || 'mathematics'
  );

  const currentSubject = subjects.find(s => s.id === activeSubjectTab) || subjects[0];

  const getSubjectIcon = (id: SubjectType) => {
    switch (id) {
      case 'mathematics':
        return Calculator;
      case 'physics':
        return Atom;
      case 'chemistry':
        return FlaskConical;
    }
  };

  return (
    <div className="space-y-8">
      {/* Subject Header & Tabs */}
      <div className="space-y-4">
        <div>
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            {t('Polytechnic Entrance Curriculum', 'पॉलिटेक्निक प्रवेश परीक्षा पाठ्यक्रम')}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-['Outfit'] mt-1">
            {t('Subjects & Study Materials', 'विषय एवं अध्ययन सामग्री')}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            {t(
              'Select a subject to access complete bilingual chapter notes, formulas, step-by-step solved questions, and chapter-wise mock tests.',
              'संपूर्ण द्विभाषी अध्यायवार नोट्स, सूत्र संग्रह, हल सहित महत्वपूर्ण प्रश्न एवं अध्याय टेस्ट के लिए विषय चुनें।'
            )}
          </p>
        </div>

        {/* 3 Subject Segmented Control */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-1.5 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          {subjects.map(subject => {
            const Icon = getSubjectIcon(subject.id);
            const isSelected = activeSubjectTab === subject.id;
            return (
              <button
                key={subject.id}
                onClick={() => {
                  setActiveSubjectTab(subject.id);
                  setSelectedSubjectId(subject.id);
                }}
                className={`flex items-center gap-3 p-3.5 rounded-xl text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700'
                    : 'hover:bg-white/60 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-300'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isSelected
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`font-bold text-sm ${isSelected ? 'text-slate-900 dark:text-white' : ''}`}>
                    {t(subject.nameEn, subject.nameHi)}
                  </h3>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    {subject.chapters.length} {t('Chapters', 'अध्याय')} · {subject.id === 'mathematics' ? '50 Qs (200 M)' : '25 Qs (100 M)'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Subject Overview Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900/10 via-indigo-900/10 to-slate-900/10 dark:from-blue-950/40 dark:via-indigo-950/40 dark:to-slate-900/40 border border-blue-200/60 dark:border-blue-900/40 space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h2 className="font-bold text-lg text-slate-900 dark:text-white">
              {t(currentSubject.nameEn, currentSubject.nameHi)} - {t('Detailed Syllabus', 'विस्तृत पाठ्यक्रम')}
            </h2>
          </div>
          <span className="text-xs font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/50 px-2.5 py-1 rounded-md">
            {currentSubject.id === 'mathematics' ? t('50% of Exam Score', 'कुल परीक्षा का 50% अंक') : t('25% of Exam Score', 'कुल परीक्षा का 25% अंक')}
          </span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          {t(currentSubject.descriptionEn, currentSubject.descriptionHi)}
        </p>
      </div>

      {/* Chapter Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {currentSubject.chapters.map(chapter => {
          const isDone = isChapterCompleted(chapter.id);
          return (
            <div
              key={chapter.id}
              className="flex flex-col justify-between p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded">
                    {t(`Chapter ${chapter.order}`, `अध्याय ${chapter.order}`)}
                  </span>
                  {isDone && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {t('Completed', 'पूर्ण')}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {t(chapter.titleEn, chapter.titleHi)}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {t(chapter.summaryEn, chapter.summaryHi)}
                  </p>
                </div>

                {/* Chapter Content Metrics */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-4 text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <FileText className="w-3 h-3 text-blue-500" />
                    {chapter.notesEn.length} {t('Notes Topics', 'विषय')}
                  </span>
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3 text-amber-500" />
                    {chapter.formulas.length} {t('Formulas', 'सूत्र')}
                  </span>
                  <span className="flex items-center gap-1">
                    <HelpCircle className="w-3 h-3 text-emerald-500" />
                    {chapter.mcqs.length} {t('MCQs', 'प्रश्न')}
                  </span>
                </div>
              </div>

              {/* Open Chapter Action */}
              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => openChapter(currentSubject.id, chapter.id)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{t('Open Chapter Study Material', 'अध्याय सामग्री पढ़ें')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
