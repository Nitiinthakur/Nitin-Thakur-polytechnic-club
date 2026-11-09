import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  Sparkles,
  Search,
  BookOpen,
  ClipboardCheck,
  Award,
  Bell,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Clock,
  ExternalLink,
  Zap,
  Globe2
} from 'lucide-react';

export const HomeHero: React.FC = () => {
  const {
    user,
    announcements,
    setActiveTab,
    setIsSearchModalOpen,
    setIsAuthModalOpen,
    startMockTest,
    t
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredAnnouncements = announcements.filter(a => {
    if (selectedCategory === 'All') return true;
    return a.category === selectedCategory;
  });

  const stateExams = [
    { name: 'JEECUP (UP Polytechnic)', tag: 'Group A & All Groups', seats: '1.5 Lakh+ Seats', date: 'May 2026' },
    { name: 'Bihar Polytechnic (DCECE/PE)', tag: 'PE / PPE / PM / PMM', seats: '45,000+ Seats', date: 'June 2026' },
    { name: 'MP PPT (Madhya Pradesh)', tag: 'Pre-Polytechnic Test', seats: '35,000+ Seats', date: 'July 2026' },
    { name: 'Delhi CET Polytechnic', tag: 'DSEU Diploma Entrance', seats: '18,000+ Seats', date: 'June 2026' }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white p-6 sm:p-10 lg:p-12 shadow-2xl border border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.18),transparent_70%)] pointer-events-none" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading, Search & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>{t('Official Exam Prep Portal 2026', 'आधिकारिक प्रवेश परीक्षा तैयारी पोर्टल 2026')}</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-['Outfit'] leading-tight text-white">
                {t(
                  'Welcome to Polytechnic Preparation Hub',
                  'पॉलिटेक्निक प्रिपरेशन हब में आपका स्वागत है'
                )}
              </h1>
              <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
                {t(
                  'Master JEECUP (UP Polytechnic), Bihar PE, MP PPT & State Entrance Exams with authentic bilingual notes, chapter-wise formulas, real CBT mock tests, and verified past papers.',
                  'JEECUP (यूपी पॉलिटेक्निक), बिहार PE, MP PPT और राज्य प्रवेश परीक्षाओं की संपूर्ण तैयारी: द्विभाषी नोट्स, सूत्र संग्रह, कंप्यूटर आधारित मॉक टेस्ट एवं पूर्व प्रश्न-पत्र।'
                )}
              </p>
            </div>

            {/* Quick Search Bar */}
            <div className="relative max-w-lg">
              <input
                type="text"
                placeholder={t(
                  'Search questions, formulas (e.g. Ohm\'s law, Quadratic formula)...',
                  'प्रश्न, सूत्र खोजें (जैसे ओम का नियम, श्रीधराचार्य सूत्र)...'
                )}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchModalOpen(true)}
                className="w-full pl-11 pr-24 py-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all cursor-pointer"
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <button
                onClick={() => setIsSearchModalOpen(true)}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                {t('Search', 'खोजें')}
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setActiveTab('subjects')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 transition-all hover:translate-y-[-1px] cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>{t('Start Preparation', 'तैयारी शुरू करें')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('mock-tests')}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-sm transition-all cursor-pointer"
              >
                <ClipboardCheck className="w-4 h-4 text-emerald-400" />
                <span>{t('Take Online CBT Mock Test', 'ऑनलाइन मॉक टेस्ट दें')}</span>
              </button>
            </div>

            {/* Micro stats banner */}
            <div className="pt-4 border-t border-white/10 grid grid-cols-3 gap-4 max-w-lg">
              <div>
                <span className="text-xl sm:text-2xl font-bold font-mono text-white">100%</span>
                <p className="text-xs text-slate-400">{t('Free Access', 'निःशुल्क अध्ययन')}</p>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-bold font-mono text-white">17</span>
                <p className="text-xs text-slate-400">{t('Key Chapters', 'प्रमुख अध्याय')}</p>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-bold font-mono text-white">400</span>
                <p className="text-xs text-slate-400">{t('Full JEECUP Marks', 'JEECUP पूर्णांक')}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Topper / Mentor Card & Progress overview */}
          <div className="lg:col-span-5 space-y-4">
            {/* Student Topper / Mentor Spotlight with provided photo */}
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5 text-white shadow-xl">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src="/assets/aistudio/ChatGPT_Image_Oct_13__2026__08_09_58_PM__1__11160beb.jpg"
                    alt="Topper Mentor Nitin Kumar"
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-blue-400/60 shadow-md"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold shadow">
                    ★
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-base text-white">Nitin Kumar</span>
                    <span className="px-2 py-0.5 text-[10px] font-semibold bg-blue-500/30 border border-blue-400/40 text-blue-200 rounded">
                      Rank 1 Topper
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {t('Lead Mentor & JEECUP Engineering Topper', 'मुख्य मार्गदर्शक एवं JEECUP इंजीनियरिंग टॉपर')}
                  </p>
                  <p className="text-[11px] text-blue-300 italic mt-1 leading-snug">
                    "{t('Focus on Mathematics first (50% weightage) and memorize physics equations daily.', 'पहले गणित पर ध्यान दें (50% वेटेज) और भौतिकी के सूत्रों का रोज़ रिवीज़न करें।')}"
                  </p>
                </div>
              </div>

              {/* Progress Overview Card */}
              {user ? (
                <div className="mt-4 pt-4 border-t border-white/10 bg-slate-950/40 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-300">{t('Your Learning Progress', 'आपकी अध्ययन प्रगति')}</span>
                    <span className="font-mono text-blue-400 font-bold">
                      {user.completedChapters.length} / 17 {t('Chapters', 'अध्याय')}
                    </span>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-emerald-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.round((user.completedChapters.length / 17) * 100)}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span>{user.targetExam}</span>
                    <button
                      onClick={() => setActiveTab('dashboard')}
                      className="text-blue-300 hover:text-white font-medium underline underline-offset-2 cursor-pointer"
                    >
                      {t('View Dashboard', 'डैशबोर्ड देखें')} →
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-slate-300">{t('Track your tests & scores', 'अपने टेस्ट व अंक ट्रैक करें')}</span>
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="px-3 py-1 rounded bg-white text-slate-900 font-semibold hover:bg-slate-100 transition-colors"
                  >
                    {t('Login Now', 'लॉग इन')}
                  </button>
                </div>
              )}
            </div>

            {/* Quick Exam Blueprint strip */}
            <div className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-white/10 rounded-xl p-3 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-slate-200">
                  {t('JEECUP Pattern: 50 Math + 25 Phys + 25 Chem = 100 Qs (400 Marks)', 'JEECUP पैटर्न: 50 गणित + 25 भौतिकी + 25 रसायन = 100 प्रश्न (400 अंक)')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target State Entrance Examinations Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              <Globe2 className="w-3.5 h-3.5" />
              <span>{t('State-Level Examinations', 'राज्य स्तरीय प्रवेश परीक्षाएं')}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-['Outfit']">
              {t('Covered Polytechnic Entrance Exams', 'शामिल पॉलिटेक्निक प्रवेश परीक्षाएं')}
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('pyq')}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            {t('View Past Papers', 'पिछले प्रश्न-पत्र देखें')} →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stateExams.map((exam, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-300 dark:hover:border-blue-700 transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded">
                  {exam.date}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  {exam.seats}
                </span>
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {exam.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {exam.tag}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Announcements and Latest Exam Updates */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-['Outfit']">
                {t('Latest Exam Updates & Official Announcements', 'नवीनतम परीक्षा सूचनाएं व घोषणाएं')}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t('Verified notices from JEECUP & State Technical Examination Boards', 'JEECUP एवं राज्य प्राविधिक शिक्षा परिषदों से सत्यापित सूचनाएं')}
              </p>
            </div>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {['All', 'Exam Date', 'Syllabus', 'Counseling'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Announcement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAnnouncements.map(ann => (
            <div
              key={ann.id}
              className={`p-5 rounded-2xl border transition-all ${
                ann.isImportant
                  ? 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/60 shadow-sm'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/40 px-2 py-0.5 rounded">
                  {ann.badge}
                </span>
                <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {ann.date}
                </span>
              </div>

              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1.5">
                {t(ann.titleEn, ann.titleHi)}
              </h3>
              
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                {t(ann.contentEn, ann.contentHi)}
              </p>

              {ann.linkText && (
                <button
                  onClick={() => setActiveTab('mock-tests')}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 cursor-pointer"
                >
                  <span>{ann.linkText}</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
            01
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            {t('Complete Bilingual Notes', 'संपूर्ण द्विभाषी नोट्स')}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {t(
              'Detailed chapter-by-chapter notes in Hindi and English with all key formulas, solved step-by-step questions, and downloadable printable PDFs.',
              'हिंदी और अंग्रेजी दोनों माध्यमों में संपूर्ण अध्यायवार नोट्स, आवश्यक सूत्र संग्रह, हल सहित महत्वपूर्ण प्रश्न एवं प्रिंटेबल पीडीएफ डाउनलोड।'
            )}
          </p>
          <button
            onClick={() => setActiveTab('subjects')}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            {t('Explore Subjects', 'विषय देखें')} →
          </button>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            02
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            {t('Real CBT Mock Exam Engine', 'कंप्यूटर आधारित परीक्षा सिमुलेटर')}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {t(
              'Practice 25, 50, and 100-question timed mock tests designed exactly like the official JEECUP CBT screen with question palette and auto-evaluation.',
              'ऑफिशियल परीक्षा की तरह 25, 50 और 100 प्रश्नों के समयबद्ध टेस्ट, वास्तविक कलर कोडेड पैलेट, ऑटो-मार्किंग और विस्तृत व्याख्या।'
            )}
          </p>
          <button
            onClick={() => setActiveTab('mock-tests')}
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
          >
            {t('Start Mock Test', 'मॉक टेस्ट दें')} →
          </button>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
            03
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            {t('Verified Previous Year Papers', 'सत्यापित पिछले वर्षों के प्रश्न-पत्र')}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {t(
              'Original JEECUP 2024, 2023, 2022 and Bihar PE papers. Solve online in interactive test mode or download full question sheets with answer keys.',
              'JEECUP 2024, 2023, 2022 और बिहार पॉलिटेक्निक के वास्तविक प्रश्न-पत्र। ऑनलाइन हल करें या उत्तर कुंजी सहित डाउनलोड करें।'
            )}
          </p>
          <button
            onClick={() => setActiveTab('pyq')}
            className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline cursor-pointer"
          >
            {t('Browse Papers', 'प्रश्न-पत्र देखें')} →
          </button>
        </div>
      </section>
    </div>
  );
};
