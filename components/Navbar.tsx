'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, Phone, Home, Layers, UserCheck, AlertTriangle } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [status, setStatus] = useState({ label: 'SYSTEM CHECK...', color: 'text-slate-400', bg: 'bg-slate-400' });
  const { language, setLanguage, theme, toggleTheme, t } = useSettings();

  // Scroll Listener for Navbar appearance and Active Section detection
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
              // Logic: Section is active if it covers the middle of the screen
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

  // Logic: Real-time Availability (Office vs Pikett)
  useEffect(() => {
    const updateStatus = () => {
      const now = new Date();
      const day = now.getDay();
      const hour = now.getHours();
      
      const isOfficeHours = day >= 1 && day <= 5 && hour >= 7 && hour < 17;

      if (isOfficeHours) {
        setStatus({ 
          label: language === 'de' ? 'BÜRO BESETZT' : 'BUREAU OUVERT', 
          color: 'text-emerald-500', 
          bg: 'bg-emerald-500' 
        });
      } else {
        setStatus({ 
          label: language === 'de' ? '24/7 PIKETT AKTIV' : 'URGENCE 24/7 ACTIVE', 
          color: 'text-safety', 
          bg: 'bg-safety' 
        });
      }
    };
    
    updateStatus();
    const interval = setInterval(updateStatus, 60000);

    return () => clearInterval(interval);
  }, [language]);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if(el) {
        el.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
                 <span className={`w-1.5 h-1.5 rounded-full ${status.bg} animate-pulse shadow-[0_0_5px_currentColor]`}></span>
                 <span className={`text-[8px] font-mono tracking-[0.1em] uppercase ${status.color} font-bold`}>
                   {status.label}
                 </span>
               </div>
             </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-10" aria-label="Desktop Navigation">
            {[{ id: 'leistungen', label: t.nav.services }, { id: 'branchen', label: t.nav.industries }, { id: 'karriere', label: t.nav.career }].map(item => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className={`text-[11px] font-black uppercase tracking-[0.15em] transition-all relative group ${activeSection === item.id ? 'text-safety' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>
                {item.label}
                <span className={`absolute -bottom-2 left-0 h-[2px] bg-safety transition-all duration-300 ${activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </button>
            ))}
            
            {/* Language & Theme Switcher */}
            <div className="flex items-center gap-2 text-[10px] font-bold font-mono ml-6 bg-slate-100 dark:bg-white/5 p-1 rounded-sm border border-slate-200 dark:border-white/5">
              <button onClick={() => setLanguage('de')} className={`px-3 py-1.5 transition-all rounded-sm ${language === 'de' ? 'bg-white dark:bg-slate-800 text-safety shadow-sm' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}>DE</button>
              <button onClick={() => setLanguage('fr')} className={`px-3 py-1.5 transition-all rounded-sm ${language === 'fr' ? 'bg-white dark:bg-slate-800 text-safety shadow-sm' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}>FR</button>
            </div>
            <button 
              onClick={toggleTheme} 
              className="p-2.5 bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-safety transition-colors rounded-sm ml-2 border border-slate-200 dark:border-white/5"
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
          
          {/* CENTER FAB - BREAKING OUT (The "Red Button") */}
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
            
            <button onClick={() => scrollTo('kontakt')} className={`flex flex-col items-center justify-center w-14 h-14 rounded-full transition-all active:scale-95 active:bg-slate-100 dark:active:bg-white/5 ${activeSection === 'kontakt' ? 'text-safety' : 'text-slate-400 dark:text-slate-500'}`}>
              <AlertTriangle size={24} strokeWidth={activeSection === 'kontakt' ? 2.5 : 1.5} />
              <span className="text-[9px] font-bold uppercase tracking-wider mt-1 opacity-80">Alarm</span>
            </button>
          </div>

        </div>
      </nav>
    </>
  );
};