import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  Search,
  Moon,
  Sun,
  User as UserIcon,
  Menu,
  X,
  BookOpen,
  ClipboardCheck,
  FileText,
  Flame,
  LayoutDashboard,
  ShieldAlert
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    user,
    language,
    toggleLanguage,
    theme,
    toggleTheme,
    activeTab,
    setActiveTab,
    setIsAuthModalOpen,
    setIsSearchModalOpen,
    t
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    {
      id: 'subjects',
      labelEn: 'Study Materials',
      labelHi: 'अध्ययन सामग्री',
      icon: BookOpen
    },
    {
      id: 'mock-tests',
      labelEn: 'Online Mock Tests',
      labelHi: 'मॉक टेस्ट',
      icon: ClipboardCheck
    },
    {
      id: 'pyq',
      labelEn: 'Previous Papers',
      labelHi: 'पूर्व प्रश्न-पत्र',
      icon: FileText
    },
    {
      id: 'daily-quiz',
      labelEn: 'Daily Quiz',
      labelHi: 'दैनिक क्विज़',
      icon: Flame
    },
    {
      id: 'dashboard',
      labelEn: 'Dashboard',
      labelHi: 'डैशबोर्ड',
      icon: LayoutDashboard
    }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Zone 1: Single line Brand wordmark */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight tracking-tight text-slate-900 dark:text-white font-['Outfit'] whitespace-nowrap">
                  Polytechnic<span className="text-blue-600 dark:text-blue-400">Prep</span>
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">
                  JEECUP & State Entrance Hub
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: 4-5 single-line clean navigation links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{t(item.labelEn, item.labelHi)}</span>
                </button>
              );
            })}

            {user?.role === 'admin' && (
              <button
                onClick={() => setActiveTab('admin')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeTab === 'admin'
                    ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60'
                    : 'text-amber-700 dark:text-amber-400/90 hover:bg-amber-50/60 dark:hover:bg-amber-950/40'
                }`}
              >
                <ShieldAlert className="w-4 h-4" />
                <span>{t('Admin Console', 'व्यवस्थापक')}</span>
              </button>
            )}
          </nav>

          {/* Zone 3: Controls & CTA */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Search button */}
            <button
              onClick={() => setIsSearchModalOpen(true)}
              aria-label="Search study materials and questions"
              className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4 text-slate-400" />
              <span className="hidden sm:inline-block font-medium">
                {t('Search...', 'खोजें...')}
              </span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              title={language === 'en' ? 'Switch to Hindi (हिंदी)' : 'Switch to English'}
              className="px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-blue-400 dark:hover:border-blue-500 bg-white dark:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer"
            >
              {language === 'en' ? '🇮🇳 हिंदी' : '🇬🇧 English'}
            </button>

            {/* Dark/Light mode toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>

            {/* User Profile / Login Button */}
            {user ? (
              <button
                onClick={() => setActiveTab('dashboard')}
                className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 hover:border-blue-500 bg-white dark:bg-slate-800 transition-all cursor-pointer group"
              >
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  referrerPolicy="no-referrer"
                  className="w-7 h-7 rounded-full object-cover border border-blue-500/30"
                  onError={(e) => {
                    // Fallback to placeholder avatar if image fails
                    (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80';
                  }}
                />
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate max-w-[100px]">
                    {user.name.split(' ')[0]}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">
                    {user.role}
                  </span>
                </div>
              </button>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors cursor-pointer whitespace-nowrap"
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span>{t('Sign In', 'लॉग इन')}</span>
              </button>
            )}

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as any);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 font-semibold'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-5 h-5 text-blue-500" />
                <span>{t(item.labelEn, item.labelHi)}</span>
              </button>
            );
          })}

          {user?.role === 'admin' && (
            <button
              onClick={() => {
                setActiveTab('admin');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40"
            >
              <ShieldAlert className="w-5 h-5 text-amber-500" />
              <span>{t('Admin Console', 'व्यवस्थापक पोर्टल')}</span>
            </button>
          )}

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {user ? `Logged in: ${user.name}` : 'Not logged in'}
            </span>
            {user ? (
              <button
                onClick={() => {
                  setActiveTab('dashboard');
                  setMobileMenuOpen(false);
                }}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400"
              >
                {t('View Dashboard', 'डैशबोर्ड देखें')} →
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsAuthModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400"
              >
                {t('Sign In / Register', 'लॉग इन / पंजीकरण')} →
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
