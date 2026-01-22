'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, AlertTriangle, Moon, Sun, Phone, Home, Layers, Briefcase } from 'lucide-react';
import { Button } from './Button';
import { useSettings } from '../contexts/SettingsContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, theme, toggleTheme, t } = useSettings();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const sections = ['hero', 'leistungen', 'branchen', 'expertise', 'karriere', 'kontakt'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) setActiveSection(section);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Status Bar Desktop */}
      <div className="hidden lg:flex justify-between items-center px-6 py-1.5 bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-white/5 text-[10px] font-mono text-slate-500 z-50 relative">
        <div className="flex items-center gap-4">
           <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> {t.nav.status}</span>
        </div>
        <div className="flex gap-6">
           <span className="opacity-70">{t.nav.location}</span>
           <a href="tel:+41321234567" className="text-safety font-bold">PIKETT: +41 32 123 45 67</a>
        </div>
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 z-40 transition-all duration-300 border-b ${isScrolled ? 'glass-morphism h-16' : 'bg-transparent border-transparent h-20'}`}>
        <div className="container mx-auto px-4 md:px-6 h-full flex justify-between items-center">
          
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo('hero')}>
             <div className="w-9 h-9 flex items-center justify-center bg-slate-900 border border-white/10">
               <span className="font-black text-white text-lg tracking-tighter">APX</span>
             </div>
             <div className="flex flex-col">
               <span className="font-bold text-slate-900 dark:text-white uppercase text-xs leading-none">Apex Industrial</span>
               <span className="text-[8px] text-safety font-mono tracking-widest uppercase mt-0.5">Swiss Precision</span>
             </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {[{ id: 'leistungen', label: t.nav.services }, { id: 'branchen', label: t.nav.industries }, { id: 'karriere', label: t.nav.career }].map(item => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className={`text-[11px] font-bold uppercase tracking-widest transition-colors relative group ${activeSection === item.id ? 'text-safety' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>
                {item.label}
                <span className={`absolute -bottom-1 left-0 h-[1px] bg-safety transition-all ${activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </button>
            ))}
            <div className="flex items-center gap-2 text-[10px] font-bold font-mono ml-4">
              <button onClick={() => setLanguage('de')} className={`px-2 py-1 ${language === 'de' ? 'text-safety' : 'text-slate-400'}`}>DE</button>
              <button onClick={() => setLanguage('fr')} className={`px-2 py-1 ${language === 'fr' ? 'text-safety' : 'text-slate-400'}`}>FR</button>
              <button onClick={toggleTheme} className="p-2 ml-2 text-slate-400 hover:text-safety transition-colors">
                {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
              </button>
            </div>
          </nav>

          {/* Mobile Right Icons */}
          <div className="flex lg:hidden items-center gap-3">
             <button onClick={toggleTheme} className="p-2 text-slate-600 dark:text-slate-400">
               {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
             </button>
             <button className="p-2 text-slate-900 dark:text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
               {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
             </button>
          </div>
        </div>

        {/* Fullscreen Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 top-0 left-0 w-full h-screen bg-white dark:bg-slate-950 z-[100] p-8 flex flex-col justify-center animate-in fade-in zoom-in-95 duration-200">
            <button className="absolute top-6 right-6 text-slate-900 dark:text-white" onClick={() => setMobileMenuOpen(false)}>
              <X size={32} />
            </button>
            <div className="space-y-8 text-center">
              {[{ id: 'leistungen', label: t.nav.services }, { id: 'branchen', label: t.nav.industries }, { id: 'expertise', label: t.nav.expertise }, { id: 'karriere', label: t.nav.career }, { id: 'kontakt', label: 'Kontakt' }].map(item => (
                <button key={item.id} onClick={() => scrollTo(item.id)} className="block w-full text-3xl font-black uppercase tracking-tighter text-slate-900 dark:text-white hover:text-safety transition-colors">
                  {item.label}
                </button>
              ))}
              <div className="flex justify-center gap-8 pt-8 border-t border-slate-200 dark:border-white/10 mt-8">
                 <button onClick={() => {setLanguage('de'); setMobileMenuOpen(false)}} className={`text-xl font-bold ${language === 'de' ? 'text-safety' : 'text-slate-400'}`}>DEUTSCH</button>
                 <button onClick={() => {setLanguage('fr'); setMobileMenuOpen(false)}} className={`text-xl font-bold ${language === 'fr' ? 'text-safety' : 'text-slate-400'}`}>FRANÇAIS</button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* MOBILE BOTTOM ACTION BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-white/10 z-[60] pb-safe px-4 py-2 shadow-[0_-10px_30px_rgba(0,0,0,0.1)] transition-colors duration-300">
        <div className="flex justify-around items-center">
          <button onClick={() => scrollTo('hero')} className={`flex flex-col items-center gap-1 p-2 ${activeSection === 'hero' ? 'text-safety' : 'text-slate-400'}`}>
            <Home size={20} /><span className="text-[9px] font-bold uppercase">Home</span>
          </button>
          <button onClick={() => scrollTo('leistungen')} className={`flex flex-col items-center gap-1 p-2 ${activeSection === 'leistungen' ? 'text-safety' : 'text-slate-400'}`}>
            <Layers size={20} /><span className="text-[9px] font-bold uppercase">Leistungen</span>
          </button>
          
          <a href="tel:+41321234567" className="relative -top-6 flex flex-col items-center justify-center w-16 h-16 bg-safety rounded-full shadow-[0_10px_20px_rgba(255,51,0,0.4)] border-4 border-white dark:border-slate-950 transition-transform active:scale-90">
            <Phone size={24} className="text-white" />
          </a>

          <button onClick={() => scrollTo('branchen')} className={`flex flex-col items-center gap-1 p-2 ${activeSection === 'branchen' ? 'text-safety' : 'text-slate-400'}`}>
            <Briefcase size={20} /><span className="text-[9px] font-bold uppercase">Sektoren</span>
          </button>
          <button onClick={() => scrollTo('kontakt')} className={`flex flex-col items-center gap-1 p-2 ${activeSection === 'kontakt' ? 'text-safety' : 'text-slate-400'}`}>
            <AlertTriangle size={20} /><span className="text-[9px] font-bold uppercase">Notfall</span>
          </button>
        </div>
      </div>
    </>
  );
};