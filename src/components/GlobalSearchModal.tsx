import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  X,
  BookOpen,
  Zap,
  HelpCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { SubjectType } from '../types';

export const GlobalSearchModal: React.FC = () => {
  const {
    isSearchModalOpen,
    setIsSearchModalOpen,
    subjects,
    allQuestions,
    openChapter,
    t
  } = useApp();

  const [query, setQuery] = useState('');

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsSearchModalOpen(false);
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchModalOpen]);

  if (!isSearchModalOpen) return null;

  const trimmed = query.trim().toLowerCase();

  // Search chapters
  const matchedChapters = trimmed
    ? subjects.flatMap(s =>
        s.chapters
          .filter(
            c =>
              c.titleEn.toLowerCase().includes(trimmed) ||
              c.titleHi.toLowerCase().includes(trimmed) ||
              c.summaryEn.toLowerCase().includes(trimmed) ||
              c.summaryHi.toLowerCase().includes(trimmed)
          )
          .map(c => ({ chapter: c, subject: s }))
      )
    : [];

  // Search formulas
  const matchedFormulas = trimmed
    ? subjects.flatMap(s =>
        s.chapters.flatMap(c =>
          c.formulas
            .filter(
              f =>
                f.titleEn.toLowerCase().includes(trimmed) ||
                f.titleHi.toLowerCase().includes(trimmed) ||
                f.formula.toLowerCase().includes(trimmed)
            )
            .map(f => ({ formula: f, chapter: c, subject: s }))
        )
      )
    : [];

  // Search questions
  const matchedQuestions = trimmed
    ? allQuestions.filter(
        q =>
          q.textEn.toLowerCase().includes(trimmed) ||
          q.textHi.toLowerCase().includes(trimmed) ||
          q.optionsEn.some(o => o.toLowerCase().includes(trimmed)) ||
          q.optionsHi.some(o => o.toLowerCase().includes(trimmed))
      )
    : [];

  const handleSelectChapter = (subId: SubjectType, chId: string) => {
    openChapter(subId, chId);
    setIsSearchModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-2xl relative animate-in fade-in zoom-in-95 max-h-[80vh] flex flex-col">
        
        {/* Search Input Box */}
        <div className="relative">
          <input
            type="text"
            autoFocus
            placeholder={t(
              'Search syllabus, formulas (e.g. Pythagoras, Ohm, pH, Heat, Trigonometry)...',
              'पाठ्यक्रम, सूत्र खोजें (जैसे पाइथागोरस, ओम, pH, ऊष्मा, त्रिकोणमिति)...'
            )}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <button
            onClick={() => setIsSearchModalOpen(false)}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results Container */}
        <div className="overflow-y-auto space-y-4 pr-1 flex-1">
          {!trimmed && (
            <div className="text-center py-8 text-xs text-slate-500 space-y-2">
              <Sparkles className="w-6 h-6 text-blue-500 mx-auto" />
              <p>Type keywords to search across all Mathematics, Physics, and Chemistry topics.</p>
              <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2">
                {['Ohm\'s Law', 'Number System', 'Trigonometry', 'Newton', 'pH Scale', 'Periodic Table'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-100 hover:text-blue-700 text-[11px] cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chapters match */}
          {matchedChapters.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                {t('Matching Chapters', 'संबंधित अध्याय')} ({matchedChapters.length})
              </h4>
              <div className="space-y-1.5">
                {matchedChapters.map(({ chapter, subject }) => (
                  <div
                    key={chapter.id}
                    onClick={() => handleSelectChapter(subject.id, chapter.id)}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-slate-100 dark:border-slate-800 cursor-pointer flex items-center justify-between text-xs transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <BookOpen className="w-4 h-4 text-blue-500 shrink-0" />
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white block">
                          {t(chapter.titleEn, chapter.titleHi)}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          {t(subject.nameEn, subject.nameHi)} · Chapter {chapter.order}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Formulas match */}
          {matchedFormulas.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                {t('Matching Formulas', 'संबंधित सूत्र')} ({matchedFormulas.length})
              </h4>
              <div className="space-y-1.5">
                {matchedFormulas.map(({ formula, chapter, subject }) => (
                  <div
                    key={formula.id}
                    onClick={() => handleSelectChapter(subject.id, chapter.id)}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-slate-100 dark:border-slate-800 cursor-pointer flex items-center justify-between text-xs transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white block">
                          {t(formula.titleEn, formula.titleHi)}
                        </span>
                        <span className="font-mono text-blue-600 dark:text-blue-400 text-[11px]">
                          {formula.formula}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {chapter.titleEn}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Questions match */}
          {matchedQuestions.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                {t('Matching Exam Questions', 'संबंधित परीक्षा प्रश्न')} ({matchedQuestions.length})
              </h4>
              <div className="space-y-2">
                {matchedQuestions.map(q => (
                  <div
                    key={q.id}
                    onClick={() => handleSelectChapter(q.subjectId, q.chapterId)}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-slate-100 dark:border-slate-800 cursor-pointer text-xs space-y-1 transition-colors"
                  >
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase text-slate-400">
                      <span>{q.subjectId}</span>
                      <span>{q.examSource || 'Question'}</span>
                    </div>
                    <p className="font-semibold text-slate-900 dark:text-white line-clamp-2">
                      {t(q.textEn, q.textHi)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {trimmed && matchedChapters.length === 0 && matchedFormulas.length === 0 && matchedQuestions.length === 0 && (
            <div className="text-center py-10 text-xs text-slate-500">
              No results matching "{query}". Try checking the spelling or search for broader terms like "Math" or "Motion".
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
