'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, AlertTriangle, Moon, Sun } from 'lucide-react';
import { Button } from './Button';
import { useSettings } from '../contexts/SettingsContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, theme, toggleTheme, t } = useSettings();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Status Bar */}
      <div className="bg-slate-200 dark:bg-slate-950 border-b border-slate-300 dark:border-white/5 py-1 px-4 text-[10px] font-mono text-slate-600 dark:text-slate-500 flex justify-between items-center backdrop-blur-sm z-50 relative hidden md:flex transition-colors duration-300">
        <div className="flex gap-4">
           <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> {t.nav.status}</span>
        </div>
        <div className="flex gap-4">
           <span>{t.nav.location}</span>
           <a href="tel:+41321234567" className="text-safety hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer font-bold">PIKETT: +41 32 123 45 67</a>
        </div>
      </div>

      {/* Main Navigation */}
      <header className={`sticky top-0 z-40 transition-all duration-500 border-b ${isScrolled ? 'bg-white/90 dark:bg-slate-950/95 backdrop-blur-md border-slate-200 dark:border-white/10 shadow-lg dark:shadow-2xl' : 'bg-transparent border-transparent'}`}>
        <div className="container mx-auto px-4 md:px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => scrollTo('hero')}>
             <div className="relative w-10 h-10 flex items-center justify-center bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 group-hover:border-safety transition-colors overflow-hidden">
               <div className="absolute inset-0 bg-safety/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
               <span className="font-black text-slate-900 dark:text-white relative z-10 text-xl tracking-tighter">APX</span>
             </div>
             <div>
               <div className="font-bold text-slate-900 dark:text-white tracking-widest uppercase text-sm leading-none mb-1 transition-colors">Apex Industrial</div>
               <div className="text-[9px] text-safety font-mono tracking-[0.3em] uppercase leading-none">Swiss Precision</div>
             </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {/* Nav Links */}
            {[
              { id: 'leistungen', label: t.nav.services }, 
              { id: 'branchen', label: t.nav.industries }, 
              { id: 'expertise', label: t.nav.expertise }
            ].map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white uppercase tracking-widest transition-colors relative group py-2">
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-safety transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}

            <div className="w-[1px] h-6 bg-slate-300 dark:bg-slate-700 mx-2"></div>

            {/* Language Switch */}
            <div className="flex items-center gap-1 text-[10px] font-bold font-mono">
              <button 
                onClick={() => setLanguage('de')} 
                className={`px-1.5 py-1 ${language === 'de' ? 'text-white bg-safety' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
              >
                DE
              </button>
              <button 
                onClick={() => setLanguage('fr')} 
                className={`px-1.5 py-1 ${language === 'fr' ? 'text-white bg-safety' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
              >
                FR
              </button>
            </div>

            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="text-slate-500 hover:text-safety transition-colors"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Pikett Button */}
            <Button variant="primary" size="sm" onClick={() => scrollTo('kontakt')}>
              <AlertTriangle size={14} className="mr-2" />
              {t.nav.emergency}
            </Button>
          </nav>

          <button className="md:hidden text-slate-900 dark:text-white p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-20 left-0 w-full bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-white/10 p-6 flex flex-col gap-6 md:hidden shadow-2xl transition-colors duration-300">
            {[
              { id: 'leistungen', label: t.nav.services }, 
              { id: 'branchen', label: t.nav.industries }, 
              { id: 'expertise', label: t.nav.expertise }
            ].map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="text-left text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest border-b border-slate-100 dark:border-white/5 pb-4">
                {item.label}
              </button>
            ))}
            
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-white/5 pb-4">
               <span className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest">Sprache / Langue</span>
               <div className="flex gap-2">
                 <button onClick={() => setLanguage('de')} className={`px-2 py-1 text-xs font-bold ${language === 'de' ? 'bg-safety text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>DE</button>
                 <button onClick={() => setLanguage('fr')} className={`px-2 py-1 text-xs font-bold ${language === 'fr' ? 'bg-safety text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>FR</button>
               </div>
            </div>

            <div className="flex justify-between items-center border-b border-slate-100 dark:border-white/5 pb-4">
               <span className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest">Modus / Mode</span>
               <button onClick={toggleTheme} className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  {theme === 'dark' ? <><Sun size={16}/> Light</> : <><Moon size={16}/> Dark</>}
               </button>
            </div>

            <Button fullWidth variant="primary" onClick={() => scrollTo('kontakt')}>
              {t.nav.emergency}
            </Button>
          </div>
        )}
      </header>
    </>
  );
};