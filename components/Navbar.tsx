'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, Phone, Home, Layers, UserCheck, AlertTriangle, Mail } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { ContactReason } from '../types';

// --- HOLIDAY LOGIC (CANTON BERN) ---

// 1. Calculate Easter Sunday (Meeus/Jones/Butcher's Algorithm)
const getEasterDate = (year: number): Date => {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
};

// 2. Configurable Company Vacations (Betriebsferien)
// Format: 'YYYY-MM-DD'. These override everything else.
const COMPANY_HOLIDAYS = [
  { start: '2025-12-24', end: '2026-01-02', label: 'BETRIEBSFERIEN' }, // Christmas Break
  { start: '2025-07-21', end: '2025-08-01', label: 'SOMMERPAUSE' },   // Summer Break (Example)
];

// 3. Check for Holidays
const getBernStatus = (date: Date, lang: string) => {
  const year = date.getFullYear();
  const month = date.getMonth(); // 0-11
  const day = date.getDate();
  const weekDay = date.getDay(); // 0 = Sun
  const hour = date.getHours();
  const minute = date.getMinutes();

  // A. Check Company Holidays (Betriebsferien)
  const dateStr = date.toISOString().split('T')[0];
  for (const holiday of COMPANY_HOLIDAYS) {
    if (dateStr >= holiday.start && dateStr <= holiday.end) {
       return { 
         status: lang === 'de' ? `${holiday.label} // PIKETT` : 'VACANCES // URGENCE', 
         color: 'text-orange-500', 
         bg: 'bg-orange-500', 
         glow: 'shadow-[0_0_8px_#f97316]' 
       };
    }
  }

  // B. Fixed Bernese Holidays
  const isJan1 = month === 0 && day === 1;  // Neujahr
  const isJan2 = month === 0 && day === 2;  // Berchtoldstag (Bern specific)
  const isAug1 = month === 7 && day === 1;  // Bundesfeier
  const isDec25 = month === 11 && day === 25; // Weihnachten
  const isDec26 = month === 11 && day === 26; // Stephanstag

  if (isJan1 || isJan2 || isAug1 || isDec25 || isDec26) {
    return { 
      status: lang === 'de' ? 'FEIERTAG // PIKETT' : 'JOUR FÉRIÉ // URGENCE', 
      color: 'text-safety', 
      bg: 'bg-safety', 
      glow: 'shadow-[0_0_12px_#FF3300]' 
    };
  }

  // C. Variable Holidays (Easter based)
  const easter = getEasterDate(year);
  
  // Helper to compare dates ignoring time
  const isSameDate = (d1: Date, d2: Date) => 
    d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth();

  const goodFriday = new Date(easter); goodFriday.setDate(easter.getDate() - 2);
  const easterMonday = new Date(easter); easterMonday.setDate(easter.getDate() + 1);
  const ascension = new Date(easter); ascension.setDate(easter.getDate() + 39); // Auffahrt
  const whitMonday = new Date(easter); whitMonday.setDate(easter.getDate() + 50); // Pfingstmontag

  if (isSameDate(date, goodFriday) || isSameDate(date, easterMonday) || isSameDate(date, ascension) || isSameDate(date, whitMonday)) {
    return { 
        status: lang === 'de' ? 'FEIERTAG // PIKETT' : 'JOUR FÉRIÉ // URGENCE', 
        color: 'text-safety', 
        bg: 'bg-safety', 
        glow: 'shadow-[0_0_12px_#FF3300]' 
    };
  }

  // D. Standard Weekend
  if (weekDay === 0 || weekDay === 6) {
    return { 
      status: lang === 'de' ? 'WOCHENENDE // PIKETT' : 'WEEK-END // URGENCE', 
      color: 'text-safety', 
      bg: 'bg-safety', 
      glow: 'shadow-[0_0_12px_#FF3300]' 
    };
  }

  // E. Office Hours (Mon-Fri, 07:30 - 12:00 & 13:00 - 17:00)
  // Simplified to 07:30 - 17:00 continuous for display simplicity, or split if needed.
  const isMorning = (hour > 7 || (hour === 7 && minute >= 30)) && hour < 12;
  const isAfternoon = hour >= 13 && hour < 17;
  const isLunch = hour === 12;

  if (isMorning || isAfternoon) {
    return { 
      status: lang === 'de' ? 'BÜRO BESETZT' : 'BUREAU OUVERT', 
      color: 'text-emerald-500', 
      bg: 'bg-emerald-500', 
      glow: 'shadow-[0_0_8px_rgba(16,185,129,0.5)]'
    };
  }
  
  if (isLunch) {
     return { 
      status: lang === 'de' ? 'MITTAGSPAUSE' : 'PAUSE MIDI', 
      color: 'text-yellow-500', 
      bg: 'bg-yellow-500', 
      glow: 'shadow-[0_0_8px_rgba(234,179,8,0.5)]'
    };
  }

  // F. Night / Off-Hours
  return { 
      status: lang === 'de' ? '24/7 PIKETT AKTIV' : 'URGENCE 24/7 ACTIVE', 
      color: 'text-safety', 
      bg: 'bg-safety', 
      glow: 'shadow-[0_0_12px_#FF3300]' 
  };
};


export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const { language, setLanguage, theme, toggleTheme, t, setActiveReason } = useSettings();

  const [status, setStatus] = useState({ 
    label: 'SYSTEM CHECK...', 
    color: 'text-slate-400', 
    bg: 'bg-slate-400',
    glow: 'shadow-[0_0_5px_currentColor]'
  });

  // Scroll Listener
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 20;
          setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));

          const sections = ['hero', 'leistungen', 'branchen', 'expertise', 'karriere', 'kontakt'];
          for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
              const rect = element.getBoundingClientRect();
              if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                 setActiveSection(section);
                 break; 
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update Status Interval
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const currentStatus = getBernStatus(now, language);
      setStatus({
        label: currentStatus.status,
        color: currentStatus.color,
        bg: currentStatus.bg,
        glow: currentStatus.glow
      });
    };
    
    update();
    const interval = setInterval(update, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [language]);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if(el) {
        el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEmergencyClick = (e: React.MouseEvent) => {
      e.preventDefault();
      setActiveReason(ContactReason.EMERGENCY);
      scrollTo('kontakt');
  };

  const navItems = [
    { id: 'leistungen', label: t.nav.services },
    { id: 'branchen', label: t.nav.industries },
    { id: 'karriere', label: t.nav.career },
    { id: 'kontakt', label: t.nav.contact }
  ];

  return (
    <>
      {/* --- DESKTOP HEADER (Standard Navigation) --- */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${isScrolled ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-md h-16 shadow-lg border-slate-200 dark:border-white/10' : 'bg-transparent border-transparent h-24'}`}>
        <div className="container mx-auto px-4 md:px-6 h-full flex justify-between items-center">
          
          {/* Logo Block */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => scrollTo('hero')}
            role="button"
            tabIndex={0}
            aria-label="Zur Startseite"
          >
             <div className="w-10 h-10 flex items-center justify-center bg-slate-900 border border-white/10 rounded-sm group-hover:border-safety transition-colors relative overflow-hidden">
               <div className="absolute inset-0 bg-safety/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
               <span className="font-black text-white text-xl tracking-tighter relative z-10">APX</span>
             </div>
             <div className="flex flex-col">
               <span className="font-bold text-slate-900 dark:text-white uppercase text-xs leading-none tracking-tight">Apex Industrial</span>
               <div className="flex items-center gap-2 mt-1">
                 <span className={`w-1.5 h-1.5 rounded-full ${status.bg} ${status.glow} animate-pulse`}></span>
                 <span className={`text-[8px] font-mono tracking-[0.1em] uppercase ${status.color} font-bold`}>
                   {status.label}
                 </span>
               </div>
             </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Desktop Navigation">
            {navItems.map(item => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className={`text-[11px] font-black uppercase tracking-[0.15em] transition-all relative group ${activeSection === item.id ? 'text-safety' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>
                {item.label}
                <span className={`absolute -bottom-2 left-0 h-[2px] bg-safety transition-all duration-300 ${activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </button>
            ))}

            {/* EMERGENCY BUTTON (GLOWING RED) - NOW SCROLLS TO CONTACT WITH STATE */}
            <button 
              onClick={handleEmergencyClick}
              className="flex items-center gap-2 px-4 py-2 bg-safety/5 border border-safety/50 text-safety font-bold text-[11px] uppercase tracking-widest rounded-sm hover:bg-safety hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(255,51,0,0.2)] hover:shadow-[0_0_20px_rgba(255,51,0,0.6)] ml-4"
            >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-safety opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-safety"></span>
                </span>
                {t.nav.emergency}
            </button>
            
            {/* Language & Theme Switcher */}
            <div className="flex items-center gap-2 text-[10px] font-bold font-mono ml-2 bg-slate-100 dark:bg-white/5 p-1 rounded-sm border border-slate-200 dark:border-white/5">
              <button onClick={() => setLanguage('de')} className={`px-3 py-1.5 transition-all rounded-sm ${language === 'de' ? 'bg-white dark:bg-slate-800 text-safety shadow-sm' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}>DE</button>
              <button onClick={() => setLanguage('fr')} className={`px-3 py-1.5 transition-all rounded-sm ${language === 'fr' ? 'bg-white dark:bg-slate-800 text-safety shadow-sm' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}>FR</button>
            </div>
            <button 
              onClick={toggleTheme} 
              className="p-2.5 bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-safety transition-colors rounded-sm border border-slate-200 dark:border-white/5"
            >
               {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </nav>

          {/* Mobile Right Controls (Settings only, Menu handled by bottom bar) */}
          <div className="flex lg:hidden items-center gap-3">
             <div className="flex items-center gap-1 text-[10px] font-bold font-mono bg-slate-100 dark:bg-white/5 p-1 rounded-sm border border-slate-200 dark:border-white/5 mr-2">
                 <button onClick={() => setLanguage('de')} className={`px-2 py-1 ${language === 'de' ? 'text-safety' : 'text-slate-400'}`}>DE</button>
                 <button onClick={() => setLanguage('fr')} className={`px-2 py-1 ${language === 'fr' ? 'text-safety' : 'text-slate-400'}`}>FR</button>
             </div>
             <button onClick={toggleTheme} className="p-2 text-slate-600 dark:text-slate-400 touch-card active:scale-95 transition-transform">
               {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
             </button>
          </div>
        </div>
      </header>

      {/* --- MOBILE BOTTOM NAVIGATION (Thumb-Centric / Fitts's Law Optimized) --- */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-white/95 dark:bg-[#0b0c10]/95 backdrop-blur-xl border-t border-slate-200 dark:border-white/10 z-[60] pb-safe shadow-[0_-10px_30px_rgba(0,0,0,0.1)] transition-all" aria-label="Mobile Bottom Navigation">
        <div className="flex justify-around items-end px-2 h-[4.5rem] relative">
          
          {/* Left Group */}
          <div className="flex gap-1 w-[40%] justify-around pb-2">
            <button onClick={() => scrollTo('hero')} className={`flex flex-col items-center justify-center w-14 h-14 rounded-full transition-all active:scale-95 active:bg-slate-100 dark:active:bg-white/5 ${activeSection === 'hero' ? 'text-safety' : 'text-slate-400 dark:text-slate-500'}`}>
              <Home size={24} strokeWidth={activeSection === 'hero' ? 2.5 : 1.5} />
              <span className="text-[9px] font-bold uppercase tracking-wider mt-1 opacity-80">Home</span>
            </button>
            
            <button onClick={() => scrollTo('leistungen')} className={`flex flex-col items-center justify-center w-14 h-14 rounded-full transition-all active:scale-95 active:bg-slate-100 dark:active:bg-white/5 ${activeSection === 'leistungen' ? 'text-safety' : 'text-slate-400 dark:text-slate-500'}`}>
              <Layers size={24} strokeWidth={activeSection === 'leistungen' ? 2.5 : 1.5} />
              <span className="text-[9px] font-bold uppercase tracking-wider mt-1 opacity-80">Service</span>
            </button>
          </div>
          
          {/* CENTER FAB - BREAKING OUT (The "Red Button") - DIRECT CALL ON MOBILE */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-6">
             <a 
               href="tel:+41321234567" 
               aria-label="Notfall Anruf" 
               className="flex flex-col items-center justify-center w-20 h-20 bg-safety rounded-full shadow-[0_8px_25px_rgba(217,43,0,0.5)] border-[6px] border-slate-50 dark:border-slate-950 active:scale-90 transition-all duration-200 group relative overflow-hidden"
             >
               {/* Pulse Animation */}
               <div className="absolute inset-0 bg-white/20 rounded-full animate-ping opacity-0 group-active:opacity-100"></div>
               <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent"></div>
               
               <Phone size={32} className="text-white relative z-10 drop-shadow-md" fill="currentColor" />
               <span className="text-[9px] font-black text-white uppercase tracking-widest relative z-10 mt-0.5">SOS</span>
             </a>
          </div>

          {/* Right Group */}
          <div className="flex gap-1 w-[40%] justify-around pb-2">
            <button onClick={() => scrollTo('karriere')} className={`flex flex-col items-center justify-center w-14 h-14 rounded-full transition-all active:scale-95 active:bg-slate-100 dark:active:bg-white/5 ${activeSection === 'karriere' ? 'text-safety' : 'text-slate-400 dark:text-slate-500'}`}>
              <UserCheck size={24} strokeWidth={activeSection === 'karriere' ? 2.5 : 1.5} />
              <span className="text-[9px] font-bold uppercase tracking-wider mt-1 opacity-80">Jobs</span>
            </button>
            
            {/* Contact Button (Standard) */}
            <button onClick={() => scrollTo('kontakt')} className={`flex flex-col items-center justify-center w-14 h-14 rounded-full transition-all active:scale-95 active:bg-slate-100 dark:active:bg-white/5 ${activeSection === 'kontakt' ? 'text-safety' : 'text-slate-400 dark:text-slate-500'}`}>
              <Mail size={24} strokeWidth={activeSection === 'kontakt' ? 2.5 : 1.5} />
              <span className="text-[9px] font-bold uppercase tracking-wider mt-1 opacity-80">{t.nav.contact}</span>
            </button>
          </div>

        </div>
      </nav>
    </>
  );
};