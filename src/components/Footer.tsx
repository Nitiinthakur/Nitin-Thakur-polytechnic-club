import React from 'react';
import { useApp } from '../context/AppContext';
import { GraduationCap, Heart, ShieldCheck, BookOpen, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab, t } = useApp();

  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-bold text-base text-slate-900 dark:text-white font-['Outfit']">
                Polytechnic<span className="text-blue-600">Prep</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {t(
                'Comprehensive educational platform dedicated to helping aspirants crack JEECUP (UP Polytechnic), Bihar PE, and all state-level Polytechnic entrance examinations.',
                'JEECUP (यूपी पॉलिटेक्निक), बिहार PE, एवं सभी राज्य स्तरीय पॉलिटेक्निक प्रवेश परीक्षाओं की उत्कृष्ट तैयारी हेतु समर्पित मंच।'
              )}
            </p>
            <div className="pt-1">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                {t('100% Free Open Educational Resource', '100% निःशुल्क शिक्षा संसाधन')}
              </span>
            </div>
          </div>

          {/* Subjects Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              {t('Subjects & Syllabus', 'विषय व पाठ्यक्रम')}
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={() => setActiveTab('subjects')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                >
                  {t('Mathematics (50 Qs / 200 Marks)', 'गणित (50 प्रश्न / 200 अंक)')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('subjects')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                >
                  {t('Physics (25 Qs / 100 Marks)', 'भौतिक विज्ञान (25 प्रश्न / 100 अंक)')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('subjects')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                >
                  {t('Chemistry (25 Qs / 100 Marks)', 'रसायन विज्ञान (25 प्रश्न / 100 अंक)')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('subjects')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                >
                  {t('Formula Sheets & Key Principles', 'सूत्र संग्रह एवं मुख्य सिद्धांत')}
                </button>
              </li>
            </ul>
          </div>

          {/* Mock Tests & Practice */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              {t('Online Examination', 'ऑनलाइन परीक्षा')}
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={() => setActiveTab('mock-tests')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                >
                  {t('100-Question Grand Mock Test', '100 प्रश्नों का महा मॉक टेस्ट')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('mock-tests')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                >
                  {t('50-Question Mathematics Booster', '50 प्रश्नों का गणित बूस्टर टेस्ट')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('mock-tests')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                >
                  {t('25-Question Science Rapid Fire', '25 प्रश्नों का विज्ञान रैपिड टेस्ट')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('daily-quiz')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                >
                  {t('Daily Quiz & Live Leaderboard', 'दैनिक क्विज़ व लीडरबोर्ड')}
                </button>
              </li>
            </ul>
          </div>

          {/* Official Entrance Links & Disclaimer */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              {t('State Examination Portals', 'राज्य परीक्षा पोर्टल')}
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-1.5">
                <span>JEECUP (UP Polytechnic Entrance)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span>BCECE Board (Bihar Polytechnic DCECE)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span>MP PPT (Madhya Pradesh Pre-Polytechnic)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span>DSEU Delhi CET Diploma Entrance</span>
              </li>
            </ul>
            <p className="text-[11px] text-slate-400 pt-1 leading-snug">
              Notice: Verified previous year questions are labeled with their official year of examination; sample practice questions are clearly marked for conceptual drill.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© 2026 Polytechnic Preparation Hub. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Crafted for Polytechnic Aspirants across India</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
