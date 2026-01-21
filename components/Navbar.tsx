'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, AlertTriangle, Moon, Sun } from 'lucide-react';
import { Button } from './Button';
import { useSettings } from '../contexts/SettingsContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, theme, toggleTheme, t } = useSettings();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Scroll Spy Logic
      const sections = ['hero', 'leistungen', 'branchen', 'expertise', 'karriere', 'kontakt'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
          }
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
      {/* Top Status Bar - Minimalist */}
      <div className="hidden md:flex justify-between items-center px-6 py-1.5 bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-white/5 text-[10px] font-mono text-slate-500 z-50 relative transition-colors duration-300">
        <div className="flex items-center gap-4">
           <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> {t.nav.status}</span>
        </div>
        <div className="flex gap-6">
           <span className="opacity-70">{t.nav.location}</span>
           <a href="tel:+41321234567" className="text-safety hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer font-bold tracking-wider" aria-label="Call emergency hotline">PIKETT: +41 32 123 45 67</a>
        </div>
      </div>

      {/* Main Navigation - Glassmorphism */}
      <header className={`sticky top-0 z-40 transition-all duration-500 border-b ${isScrolled ? 'glass-nav h-16' : 'bg-transparent border-transparent h-20'}`}>
        <div className="container mx-auto px-4 md:px-6 h-full flex justify-between items-center">
          
          {/* Logo Area */}
          <div 
            className="flex items-center gap-3 group cursor-pointer" 
            onClick={() => scrollTo('hero')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && scrollTo('hero')}
            aria-label="Go to Homepage"
          >
             <div className="relative w-10 h-10 flex items-center justify-center bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 group-hover:border-safety/50 transition-colors overflow-hidden">
               <div className="absolute inset-0 bg-safety/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
               <span className="font-black text-slate-900 dark:text-white relative z-10 text-xl tracking-tighter">APX</span>
             </div>
             <div className="flex flex-col">
               <span className="font-bold text-slate-900 dark:text-white tracking-widest uppercase text-xs leading-none mb-1">Apex Industrial</span>
               <span className="text-[9px] text-safety font-mono tracking-[0.3em] uppercase leading-none">Swiss Precision</span>
             </div>
          </div>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-8" role="navigation">
            {[
              { id: 'leistungen', label: t.nav.services }, 
              { id: 'branchen', label: t.nav.industries }, 
              { id: 'expertise', label: t.nav.expertise },
              { id: 'karriere', label: t.nav.career }
            ].map((item) => (
              <button 
                key={item.id} 
                onClick={() => scrollTo(item.id)} 
                className={`text-xs font-bold uppercase tracking-widest transition-colors relative group py-2 ${activeSection === item.id ? 'text-safety' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] bg-safety transition-all duration-300 ${activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </button>
            ))}

            <div className="w-[1px] h-4 bg-slate-300 dark:bg-white/10 mx-2" aria-hidden="true"></div>

            {/* Language Switch */}
            <div className="flex items-center gap-1 text-[10px] font-bold font-mono">
              <button 
                onClick={() => setLanguage('de')} 
                className={`px-2 py-1 rounded transition-colors ${language === 'de' ? 'text-white bg-safety' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
                aria-label="Switch to German"
              >
                DE
              </button>
              <button 
                onClick={() => setLanguage('fr')} 
                className={`px-2 py-1 rounded transition-colors ${language === 'fr' ? 'text-white bg-safety' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
                aria-label="Switch to French"
              >
                FR
              </button>
            </div>

            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 text-slate-600 dark:text-slate-400 hover:text-safety dark:hover:text-white transition-colors"
              aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <Button variant="primary" size="sm" onClick={() => scrollTo('kontakt')}>
              <AlertTriangle size={14} className="mr-2" />
              {t.nav.emergency}
            </Button>
          </nav>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-4 md:hidden">
             <button 
                onClick={toggleTheme}
                className="p-2 text-slate-600 dark:text-slate-400 hover:text-safety dark:hover:text-white transition-colors"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
             </button>
            <button 
                className="text-slate-900 dark:text-white p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-white/10 p-6 flex flex-col gap-6 md:hidden shadow-2xl animate-in slide-in-from-top-2 duration-200">
            {[
              { id: 'leistungen', label: t.nav.services }, 
              { id: 'branchen', label: t.nav.industries }, 
              { id: 'expertise', label: t.nav.expertise },
              { id: 'karriere', label: t.nav.career }
            ].map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="text-left text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-safety dark:hover:text-white hover:pl-2 transition-all uppercase tracking-widest border-b border-slate-200 dark:border-white/5 pb-4">
                {item.label}
              </button>
            ))}
            <div className="flex gap-4 border-b border-slate-200 dark:border-white/5 pb-4">
               <button onClick={() => setLanguage('de')} className={`flex-1 py-2 text-center text-xs font-bold rounded ${language === 'de' ? 'bg-safety text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>Deutsch</button>
               <button onClick={() => setLanguage('fr')} className={`flex-1 py-2 text-center text-xs font-bold rounded ${language === 'fr' ? 'bg-safety text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>Français</button>
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