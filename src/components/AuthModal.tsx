import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StorageService } from '../services/storage';
import {
  X,
  User as UserIcon,
  Lock,
  Mail,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  KeyRound
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    setUser,
    t
  } = useApp();

  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [targetExam, setTargetExam] = useState('JEECUP Group A (UP Polytechnic)');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const users = StorageService.getAllUsers();
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!existing) {
      setErrorMsg('No registered account found with this email. Please register or use quick demo login.');
      return;
    }

    setUser(existing);
    setIsAuthModalOpen(false);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!fullName || !email) {
      setErrorMsg('Please enter your full name and valid email.');
      return;
    }

    const newUser = StorageService.registerUser({
      name: fullName,
      email,
      role: 'student',
      rollNumber: 'JEEC-' + Math.floor(1000 + Math.random() * 9000),
      targetExam,
      avatarUrl: '/assets/aistudio/ChatGPT_Image_Oct_13__2026__08_09_58_PM__1__11160beb.jpg'
    });

    setUser(newUser);
    setIsAuthModalOpen(false);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessNotice(`Password reset instructions and verification code sent to ${email}`);
    setTimeout(() => {
      setMode('login');
      setSuccessNotice(null);
    }, 2500);
  };

  const handleDemoStudent = () => {
    const users = StorageService.getAllUsers();
    const student = users.find(u => u.role === 'student') || users[0];
    setUser(student);
    setIsAuthModalOpen(false);
  };

  const handleDemoAdmin = () => {
    const users = StorageService.getAllUsers();
    const admin = users.find(u => u.role === 'admin') || users[1];
    setUser(admin);
    setIsAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in zoom-in-95">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute right-5 top-5 p-1 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-md">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-['Outfit'] text-slate-900 dark:text-white">
            {mode === 'login' && t('Student & Faculty Sign In', 'विद्यार्थी एवं शिक्षक लॉगिन')}
            {mode === 'register' && t('New Student Registration', 'नया विद्यार्थी पंजीकरण')}
            {mode === 'forgot' && t('Reset Your Password', 'पासवर्ड रीसेट करें')}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t('Polytechnic Entrance Preparation Hub 2026', 'पॉलिटेक्निक प्रवेश परीक्षा पोर्टल 2026')}
          </p>
        </div>

        {/* Quick Demo Logins banner */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{t('Instant Demo Access (One-Click)', 'त्वरित डेमो एक्सेस')}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleDemoStudent}
              className="py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-center transition-colors cursor-pointer"
            >
              Demo Student
            </button>
            <button
              onClick={handleDemoAdmin}
              className="py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-center transition-colors cursor-pointer"
            >
              Demo Admin
            </button>
          </div>
        </div>

        {/* Error / Success Feedback */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-300 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successNotice && (
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successNotice}</span>
          </div>
        )}

        {/* Form: Login */}
        {mode === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">
                {t('Email Address', 'ईमेल पता')}
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="student@polyhub.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-slate-600 dark:text-slate-400 font-medium">
                  {t('Password', 'पासवर्ड')}
                </label>
                <button
                  type="button"
                  onClick={() => setMode('forgot')}
                  className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  {t('Forgot password?', 'पासवर्ड भूल गए?')}
                </button>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              {t('Sign In to Account', 'खाते में लॉग इन करें')}
            </button>
          </form>
        )}

        {/* Form: Register */}
        {mode === 'register' && (
          <form onSubmit={handleRegister} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">
                {t('Candidate Full Name', 'विद्यार्थी का पूरा नाम')}
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Rahul Sharma"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">
                {t('Email Address', 'ईमेल पता')}
              </label>
              <input
                type="email"
                required
                placeholder="rahul@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">
                {t('Target Polytechnic Exam', 'लक्षित पॉलिटेक्निक परीक्षा')}
              </label>
              <select
                value={targetExam}
                onChange={(e) => setTargetExam(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
              >
                <option value="JEECUP Group A (UP Polytechnic)">JEECUP Group A (UP Polytechnic)</option>
                <option value="Bihar Polytechnic (DCECE/PE)">Bihar Polytechnic (DCECE/PE)</option>
                <option value="MP PPT (Madhya Pradesh)">MP PPT (Madhya Pradesh)</option>
                <option value="Delhi CET Polytechnic">Delhi CET Polytechnic</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">
                {t('Create Password', 'पासवर्ड बनाएं')}
              </label>
              <input
                type="password"
                required
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              {t('Create Free Account', 'निःशुल्क खाता बनाएं')}
            </button>
          </form>
        )}

        {/* Form: Forgot Password */}
        {mode === 'forgot' && (
          <form onSubmit={handleForgotPassword} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">
                {t('Registered Email Address', 'पंजीकृत ईमेल पता')}
              </label>
              <input
                type="email"
                required
                placeholder="student@polyhub.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              {t('Send Password Reset Link', 'पासवर्ड रीसेट लिंक भेजें')}
            </button>
          </form>
        )}

        {/* Mode Toggle Footer */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500">
          {mode === 'login' ? (
            <p>
              {t("Don't have an account?", 'खाता नहीं है?')}{' '}
              <button
                type="button"
                onClick={() => setMode('register')}
                className="font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                {t('Register here', 'यहाँ पंजीकरण करें')}
              </button>
            </p>
          ) : (
            <p>
              {t('Already registered?', 'पहले से पंजीकृत हैं?')}{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                {t('Sign in here', 'यहाँ लॉगिन करें')}
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
