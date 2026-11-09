import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Printer,
  X,
  BookOpen,
  Zap,
  CheckCircle2,
  GraduationCap
} from 'lucide-react';

export const PrintableNotesModal: React.FC = () => {
  const {
    isPrintModalOpen,
    setIsPrintModalOpen,
    printableChapter,
    subjects,
    t
  } = useApp();

  if (!isPrintModalOpen || !printableChapter) return null;

  const subject = subjects.find(s => s.id === printableChapter.subjectId);

  const handleBrowserPrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative">
        
        {/* Modal Top Actions (Hidden in browser print) */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 print:hidden">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <GraduationCap className="w-5 h-5 text-blue-600" />
            <span className="font-bold text-slate-900 dark:text-white">
              Polytechnic Preparation Hub - Document Vault
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleBrowserPrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow cursor-pointer transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>{t('Print / Save PDF Now', 'प्रिंट / पीडीएफ सहेजें')}</span>
            </button>
            <button
              onClick={() => setIsPrintModalOpen(false)}
              className="p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Study Document Content */}
        <div className="space-y-6 text-slate-900 dark:text-slate-100 font-sans print:text-black">
          {/* Header */}
          <div className="border-b-2 border-slate-900 dark:border-slate-300 pb-4">
            <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              JEECUP & STATE POLYTECHNIC ENTRANCE STUDY GUIDE
            </div>
            <h1 className="text-2xl font-extrabold font-['Outfit'] mt-1">
              Chapter {printableChapter.order}: {printableChapter.titleEn} ({printableChapter.titleHi})
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Subject: <strong>{subject?.nameEn} ({subject?.nameHi})</strong> · Polytechnic Preparation Hub Official Notes
            </p>
          </div>

          {/* Chapter Summary */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs leading-relaxed space-y-1">
            <strong className="block text-blue-600 dark:text-blue-400">Chapter Overview:</strong>
            <p>{printableChapter.summaryEn}</p>
            <p className="italic text-slate-600 dark:text-slate-400">{printableChapter.summaryHi}</p>
          </div>

          {/* Key Principles */}
          <div className="space-y-2">
            <h2 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Key High-Yield Principles
            </h2>
            <ul className="list-disc list-inside space-y-1 text-xs text-slate-700 dark:text-slate-300">
              {printableChapter.keyPointsEn.map((pt, i) => (
                <li key={i} className="leading-relaxed">{pt}</li>
              ))}
            </ul>
          </div>

          {/* Formulas Sheet */}
          {printableChapter.formulas.length > 0 && (
            <div className="space-y-3">
              <h2 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                Important Examination Formulas
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {printableChapter.formulas.map(f => (
                  <div key={f.id} className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 space-y-1">
                    <span className="font-bold text-slate-900 dark:text-white block">{f.titleEn} ({f.titleHi})</span>
                    <div className="p-2 rounded bg-slate-900 text-blue-400 font-mono text-xs font-bold text-center">
                      {f.formula}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{f.explanationEn}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comprehensive Notes Points */}
          <div className="space-y-3">
            <h2 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-blue-500" />
              Complete Theory & Step-by-Step Concepts (English & हिंदी)
            </h2>
            <div className="space-y-2.5">
              {printableChapter.notesEn.map((note, idx) => (
                <div key={idx} className="p-3 rounded-lg border border-slate-100 dark:border-slate-800 text-xs space-y-1">
                  <p className="font-medium text-slate-800 dark:text-slate-200">{idx + 1}. {note}</p>
                  {printableChapter.notesHi[idx] && (
                    <p className="text-slate-600 dark:text-slate-400 pl-4 border-l-2 border-blue-400">{printableChapter.notesHi[idx]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Solved Examples */}
          {printableChapter.importantQA.length > 0 && (
            <div className="space-y-3">
              <h2 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                Solved Model Problems with Explanations
              </h2>
              <div className="space-y-3">
                {printableChapter.importantQA.map((qa, i) => (
                  <div key={i} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-1.5">
                    <p className="font-bold text-slate-900 dark:text-white">Q: {qa.questionEn}</p>
                    <p className="text-slate-600 dark:text-slate-400 font-medium">प्रश्न: {qa.questionHi}</p>
                    <div className="p-2.5 rounded bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 space-y-1">
                      <strong className="block text-[11px]">Solution:</strong>
                      <p>{qa.answerEn}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer for print */}
          <div className="pt-4 border-t border-slate-200 text-center text-[10px] text-slate-400">
            Polytechnic Preparation Hub · Verified JEECUP & State Entrance Examination Prep Materials
          </div>
        </div>
      </div>
    </div>
  );
};
