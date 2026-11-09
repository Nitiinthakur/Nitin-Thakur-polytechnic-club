import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft,
  BookOpen,
  Zap,
  HelpCircle,
  CheckCircle2,
  Bookmark,
  Printer,
  Copy,
  Check,
  ChevronRight,
  ClipboardCheck,
  Sparkles,
  Info
} from 'lucide-react';
import { Question } from '../types';

export const ChapterView: React.FC = () => {
  const {
    subjects,
    selectedSubjectId,
    selectedChapterId,
    setActiveTab,
    markChapterComplete,
    isChapterCompleted,
    toggleBookmark,
    isBookmarked,
    setPrintableChapter,
    setIsPrintModalOpen,
    startMockTest,
    t
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'notes' | 'formulas' | 'importantQA' | 'mcqs'>('notes');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});
  const [copiedFormulaId, setCopiedFormulaId] = useState<string | null>(null);

  const subject = subjects.find(s => s.id === selectedSubjectId) || subjects[0];
  const chapter = subject?.chapters.find(c => c.id === selectedChapterId) || subject?.chapters[0];

  if (!chapter) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">Chapter not found.</p>
        <button
          onClick={() => setActiveTab('subjects')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold"
        >
          Return to Subjects
        </button>
      </div>
    );
  }

  const isCompleted = isChapterCompleted(chapter.id);

  const handleSelectOption = (qId: string, optionIndex: number) => {
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIndex }));
    setShowExplanation(prev => ({ ...prev, [qId]: true }));
  };

  const copyFormula = (formula: string, id: string) => {
    navigator.clipboard.writeText(formula);
    setCopiedFormulaId(id);
    setTimeout(() => setCopiedFormulaId(null), 2000);
  };

  const handlePrintNotes = () => {
    setPrintableChapter(chapter);
    setIsPrintModalOpen(true);
  };

  const handleLaunchChapterTest = () => {
    startMockTest({
      id: `test-${chapter.id}`,
      titleEn: `${chapter.titleEn} - Chapter Practice Test`,
      titleHi: `${chapter.titleHi} - अध्याय अभ्यास टेस्ट`,
      examType: 'JEECUP / Polytechnic Chapter Mock',
      questionCount: 25,
      durationMinutes: 30,
      totalMarks: 100,
      negativeMarking: 0,
      difficulty: 'Medium',
      subjectScope: subject.id === 'mathematics' ? 'Mathematics' : subject.id === 'physics' ? 'Physics' : 'Chemistry',
      descriptionEn: `25-question timed mock test specifically covering ${chapter.titleEn}.`,
      descriptionHi: `${chapter.titleHi} पर आधारित 25 प्रश्नों का समयबद्ध मॉक टेस्ट।`,
      questions: []
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Breadcrumbs & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <button
            onClick={() => setActiveTab('subjects')}
            className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 font-medium cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t('All Subjects', 'सभी विषय')}</span>
          </button>
          <span>/</span>
          <span className="text-slate-700 dark:text-slate-300 font-medium">
            {t(subject.nameEn, subject.nameHi)}
          </span>
          <span>/</span>
          <span className="text-blue-600 dark:text-blue-400 font-semibold truncate max-w-[200px]">
            {t(chapter.titleEn, chapter.titleHi)}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Mark Complete Button */}
          <button
            onClick={() => markChapterComplete(chapter.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              isCompleted
                ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isCompleted ? t('Completed', 'अध्याय पूर्ण') : t('Mark as Completed', 'पूर्ण चिह्नित करें')}</span>
          </button>

          {/* Download / Print Notes in PDF */}
          <button
            onClick={handlePrintNotes}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-blue-500" />
            <span>{t('Download / Print PDF', 'पीडीएफ डाउनलोड / प्रिंट')}</span>
          </button>
        </div>
      </div>

      {/* Chapter Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold px-2.5 py-1 bg-white/20 backdrop-blur-md rounded-md text-blue-200">
            {t(`Chapter 0${chapter.order}`, `अध्याय 0${chapter.order}`)} · {t(subject.nameEn, subject.nameHi)}
          </span>
          <button
            onClick={handleLaunchChapterTest}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow transition-all cursor-pointer"
          >
            <ClipboardCheck className="w-3.5 h-3.5" />
            <span>{t('Launch 25-Q Chapter Test', '25 प्रश्नों का अध्याय टेस्ट दें')}</span>
          </button>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold font-['Outfit']">
          {t(chapter.titleEn, chapter.titleHi)}
        </h1>
        <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
          {t(chapter.summaryEn, chapter.summaryHi)}
        </p>

        {/* Mobile test CTA */}
        <div className="sm:hidden pt-2">
          <button
            onClick={handleLaunchChapterTest}
            className="w-full flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow transition-all"
          >
            <ClipboardCheck className="w-3.5 h-3.5" />
            <span>{t('Launch 25-Q Chapter Test', '25 प्रश्नों का अध्याय टेस्ट दें')}</span>
          </button>
        </div>
      </div>

      {/* Secondary Segmented Navigation (Notes, Formulas, Q&A, MCQs) */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveSubTab('notes')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeSubTab === 'notes'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>{t('Complete Notes', 'संपूर्ण नोट्स')}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('formulas')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeSubTab === 'formulas'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>{t('Important Formulas', 'महत्वपूर्ण सूत्र')} ({chapter.formulas.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('importantQA')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeSubTab === 'importantQA'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t('Important Q&A', 'हल सहित महत्वपूर्ण प्रश्न')}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('mcqs')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeSubTab === 'mcqs'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{t('Practice MCQs', 'अभ्यास बहुविकल्पीय प्रश्न')} ({chapter.mcqs.length})</span>
        </button>
      </div>

      {/* Tab 1: Notes Content */}
      {activeSubTab === 'notes' && (
        <div className="space-y-6">
          {/* Key Principles Callout */}
          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-slate-800 dark:text-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>{t('High-Yield Exam Highlights', 'परीक्षा में सर्वाधिक पूछे जाने वाले मुख्य बिंदु')}</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 list-disc list-inside">
              {(t('en', 'hi') === 'hi' ? chapter.keyPointsHi : chapter.keyPointsEn).map((point, idx) => (
                <li key={idx} className="leading-relaxed">
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Full Notes Body */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white font-['Outfit']">
                {t('Study Notes & Core Theory', 'विस्तृत अध्ययन नोट्स एवं सिद्धांत')}
              </h2>
              <span className="text-xs text-slate-400 font-medium">
                {t('Bilingual Curriculum Guide', 'द्विभाषी पाठ्यक्रम मार्गदर्शिका')}
              </span>
            </div>

            <div className="space-y-4">
              {(t('en', 'hi') === 'hi' ? chapter.notesHi : chapter.notesEn).map((note, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-sm leading-relaxed text-slate-700 dark:text-slate-300"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">
                      {idx + 1}
                    </span>
                    <p className="flex-1">{note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Important Formulas */}
      {activeSubTab === 'formulas' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 text-xs text-blue-800 dark:text-blue-300 flex items-center gap-2">
            <Info className="w-4 h-4 shrink-0 text-blue-600 dark:text-blue-400" />
            <span>
              {t(
                'Directly applicable formulas frequently tested in JEECUP numerical problems. Click copy to save to clipboard.',
                'JEECUP के संख्यात्मक प्रश्नों में सीधे प्रयुक्त होने वाले सूत्र। क्लिपबोर्ड में कॉपी करने के लिए कॉपी बटन दबाएं।'
              )}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {chapter.formulas.map(formula => (
              <div
                key={formula.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    {t(formula.titleEn, formula.titleHi)}
                  </h3>
                  <button
                    onClick={() => copyFormula(formula.formula, formula.id)}
                    title="Copy Formula"
                    className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    {copiedFormulaId === formula.id ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Formula Display Box */}
                <div className="p-3.5 rounded-xl bg-slate-900 text-blue-400 font-mono text-sm font-semibold tracking-wide border border-slate-800 overflow-x-auto text-center">
                  {formula.formula}
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {t(formula.explanationEn, formula.explanationHi)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Important Q&A */}
      {activeSubTab === 'importantQA' && (
        <div className="space-y-4">
          {chapter.importantQA.map((qa, index) => (
            <div
              key={index}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
            >
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  Q{index + 1}
                </span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                  {t(qa.questionEn, qa.questionHi)}
                </h3>
              </div>

              <div className="pl-9 text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800/80">
                <span className="font-bold text-blue-600 dark:text-blue-400 block mb-1">
                  {t('Detailed Solution:', 'विस्तृत उत्तर / हल:')}
                </span>
                {t(qa.answerEn, qa.answerHi)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Practice MCQs */}
      {activeSubTab === 'mcqs' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs">
            <span className="font-medium text-slate-700 dark:text-slate-300">
              {t('Instant Feedback Practice Mode', 'त्वरित उत्तर परीक्षण मोड')}
            </span>
            <span className="font-mono text-slate-500 dark:text-slate-400">
              {chapter.mcqs.length} {t('Questions Available', 'प्रश्न उपलब्ध')}
            </span>
          </div>

          <div className="space-y-5">
            {chapter.mcqs.map((mcq, qIdx) => {
              const selectedOpt = selectedAnswers[mcq.id];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = selectedOpt === mcq.correctOptionIndex;
              const bookmarked = isBookmarked(mcq.id);
              const options = t('en', 'hi') === 'hi' ? mcq.optionsHi : mcq.optionsEn;

              return (
                <div
                  key={mcq.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {qIdx + 1}
                      </span>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white leading-snug">
                        {t(mcq.textEn, mcq.textHi)}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {mcq.examSource && (
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded">
                          {mcq.examSource}
                        </span>
                      )}
                      <button
                        onClick={() => toggleBookmark(mcq.id)}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          bookmarked
                            ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40'
                            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                        }`}
                        title={bookmarked ? 'Remove Bookmark' : 'Bookmark Question'}
                      >
                        <Bookmark className="w-4 h-4" fill={bookmarked ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                  </div>

                  {/* 4 Options Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {options.map((opt, optIdx) => {
                      let btnStyle = 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-400';
                      
                      if (isAnswered) {
                        if (optIdx === mcq.correctOptionIndex) {
                          btnStyle = 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold';
                        } else if (optIdx === selectedOpt) {
                          btnStyle = 'bg-rose-50 dark:bg-rose-950/50 border-rose-500 text-rose-800 dark:text-rose-300';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isAnswered}
                          onClick={() => handleSelectOption(mcq.id, optIdx)}
                          className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center font-mono text-[10px] font-bold shrink-0">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span>{opt}</span>
                          </div>
                          {isAnswered && optIdx === mcq.correctOptionIndex && (
                            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Solution & Explanation */}
                  {isAnswered && (
                    <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-xs space-y-1 animate-in fade-in">
                      <div className="flex items-center gap-1.5 font-bold">
                        {isCorrect ? (
                          <span className="text-emerald-600 dark:text-emerald-400">
                            ✓ {t('Correct Answer! (+4 Marks)', 'सही उत्तर! (+4 अंक)')}
                          </span>
                        ) : (
                          <span className="text-rose-600 dark:text-rose-400">
                            ✗ {t(`Incorrect. Correct Option: ${String.fromCharCode(65 + mcq.correctOptionIndex)}`, `गलत उत्तर। सही विकल्प: ${String.fromCharCode(65 + mcq.correctOptionIndex)}`)}
                          </span>
                        )}
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        <strong className="text-slate-800 dark:text-slate-200">{t('Explanation:', 'व्याख्या:')} </strong>
                        {t(mcq.explanationEn, mcq.explanationHi)}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
