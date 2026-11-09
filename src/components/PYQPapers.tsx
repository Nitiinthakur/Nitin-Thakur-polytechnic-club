import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PreviousYearPaper } from '../types';
import { StorageService } from '../services/storage';
import {
  FileText,
  CheckCircle2,
  Download,
  Play,
  Calendar,
  Building,
  Clock,
  Printer,
  ShieldCheck,
  Search,
  Filter
} from 'lucide-react';

export const PYQPapers: React.FC = () => {
  const { startPYQPaper, setPrintableChapter, setIsPrintModalOpen, t } = useApp();
  const [papers] = useState<PreviousYearPaper[]>(() => StorageService.getPYQPapers());
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [selectedState, setSelectedState] = useState<string>('All');

  const filteredPapers = papers.filter(paper => {
    if (selectedYear !== 'All' && String(paper.year) !== selectedYear) return false;
    if (selectedState !== 'All' && paper.state !== selectedState) return false;
    return true;
  });

  const handlePrintPaper = (paper: PreviousYearPaper) => {
    // Generate clean printable paper view
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const questionsHtml = paper.questions.map((q, idx) => `
      <div style="margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #e2e8f0; page-break-inside: avoid;">
        <div style="font-weight: bold; margin-bottom: 6px; font-size: 14px;">
          Q${idx + 1}. ${q.textEn}
        </div>
        <div style="font-size: 13px; color: #475569; margin-bottom: 10px;">
          ${q.textHi}
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 12px; margin-bottom: 8px;">
          <div>(A) ${q.optionsEn[0]} / ${q.optionsHi[0]}</div>
          <div>(B) ${q.optionsEn[1]} / ${q.optionsHi[1]}</div>
          <div>(C) ${q.optionsEn[2]} / ${q.optionsHi[2]}</div>
          <div>(D) ${q.optionsEn[3]} / ${q.optionsHi[3]}</div>
        </div>
        <div style="background: #f1f5f9; padding: 8px 12px; border-radius: 6px; font-size: 12px; color: #0f172a;">
          <strong>Correct Answer: Option ${String.fromCharCode(65 + q.correctOptionIndex)}</strong><br/>
          <span style="color: #334155;">Solution: ${q.explanationEn}</span>
        </div>
      </div>
    `).join('');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${paper.title} - Polytechnic Preparation Hub</title>
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.5; color: #0f172a; margin: 40px; }
            h1 { font-size: 20px; margin-bottom: 4px; }
            .header { border-bottom: 2px solid #0f172a; padding-bottom: 12px; margin-bottom: 24px; }
            .badge { display: inline-block; background: #e0e7ff; color: #3730a3; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; }
            @media print {
              body { margin: 20px; }
              button { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <span class="badge">OFFICIAL VERIFIED QUESTION PAPER</span>
            <h1>${paper.title}</h1>
            <p style="margin: 0; font-size: 13px; color: #475569;">
              State: ${paper.state} · Year: ${paper.year} · Total Questions: ${paper.totalQuestions} · Maximum Marks: ${paper.totalMarks} · Duration: ${paper.durationMinutes} Minutes
            </p>
          </div>
          <div>
            ${questionsHtml}
          </div>
          <script>
            window.onload = function() { window.print(); };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>{t('Authentic Examination Archive', 'प्रामाणिक परीक्षा अभिलेखागार')}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
          {t('Previous Year Question Papers', 'पिछले वर्षों के प्रश्न-पत्र')}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
          {t(
            'Official question papers with exam year verification. Practice in timed CBT test mode or download printable PDF with complete answer keys.',
            'परीक्षा वर्ष सहित सत्यापित मूल प्रश्न-पत्र। समयबद्ध ऑनलाइन टेस्ट दें या पूर्ण उत्तर कुंजी सहित पीडीएफ डाउनलोड/प्रिंट करें।'
          )}
        </p>
      </div>

      {/* Filter Controls (Year & State) */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        {/* Year Pills */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase">{t('Year:', 'वर्ष:')}</span>
          <div className="flex items-center gap-1">
            {['All', '2024', '2023', '2022'].map(yr => (
              <button
                key={yr}
                onClick={() => setSelectedYear(yr)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  selectedYear === yr
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {yr}
              </button>
            ))}
          </div>
        </div>

        {/* State Selection */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase">{t('State:', 'राज्य:')}</span>
          <div className="flex items-center gap-1">
            {['All', 'Uttar Pradesh', 'Bihar'].map(st => (
              <button
                key={st}
                onClick={() => setSelectedState(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  selectedState === st
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {st === 'All' ? t('All States', 'सभी राज्य') : st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Papers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPapers.map(paper => (
          <div
            key={paper.id}
            className="flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-400 dark:hover:border-blue-600 transition-all space-y-5 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold">
                  <CheckCircle2 className="w-3 h-3" />
                  {paper.paperType}
                </span>

                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded">
                  Year {paper.year}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                  {paper.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-2">
                  <span className="flex items-center gap-1">
                    <Building className="w-3.5 h-3.5" />
                    {paper.state}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {paper.durationMinutes} {t('Mins', 'मिनट')}
                  </span>
                  <span>·</span>
                  <span className="font-mono">
                    {paper.totalQuestions} Qs ({paper.totalMarks} M)
                  </span>
                </div>
              </div>
            </div>

            {/* Actions: Solve CBT vs Download PDF */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2.5">
              <button
                onClick={() => startPYQPaper(paper)}
                className="py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{t('Solve Online CBT', 'ऑनलाइन CBT हल करें')}</span>
              </button>

              <button
                onClick={() => handlePrintPaper(paper)}
                className="py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs border border-slate-200 dark:border-slate-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-blue-500" />
                <span>{t('Download PDF', 'पीडीएफ प्रिंट')}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
