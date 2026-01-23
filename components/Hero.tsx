'use client';

import React from 'react';
import { ArrowRight, ShieldCheck, Phone } from 'lucide-react';
import { Button } from './Button';
import { useSettings } from '../contexts/SettingsContext';
import { CNCMachineMonitor } from './CNCMachineMonitor';

export const Hero: React.FC = () => {
  const { t } = useSettings();

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="relative min-h-[90vh] lg:min-h-[95vh] flex flex-col justify-center pt-28 pb-10 lg:py-20 overflow-hidden bg-slate-50 dark:bg-[#0b0c10] text-slate-600 dark:text-gray-300 transition-colors duration-300">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
      
      {/* Light Mode Blob (Subtle) */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-safety/5 rounded-full blur-[120px] pointer-events-none mix-blend-multiply dark:mix-blend-normal" />
      
      {/* Mobile Top Ticker */}
      <div className="lg:hidden absolute top-16 left-0 w-full bg-slate-100 dark:bg-[#1f2833] border-b border-slate-200 dark:border-white/5 py-1 z-20 overflow-hidden">
        <div className="flex whitespace-nowrap animate-ticker">
           <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-500 uppercase tracking-[0.2em] px-6">
             +++ SYSTEM STATUS: NOMINAL +++ REGION: GRENCHEN-BIEL +++
           </span>
           <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-500 uppercase tracking-[0.2em] px-6">
             +++ SYSTEM STATUS: NOMINAL +++ REGION: GRENCHEN-BIEL +++
           </span>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          
          {/* Left: Text Content */}
          <div className="text-center lg:text-left order-1 lg:order-1 pt-6 lg:pt-0">
            <div className="inline-flex items-center gap-2 border border-safety/30 bg-safety/5 px-4 py-2 mb-6 mx-auto lg:mx-0 rounded-sm hover:bg-safety/10 transition-colors cursor-default backdrop-blur-sm">
               <div className="w-2 h-2 bg-safety rounded-full animate-pulse shadow-[0_0_8px_#FF3300]" />
               <span className="text-safety font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em]">
                 {t.hero.region}
               </span>
            </div>
            
            {/* Optimized Headline Size for better visibility */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-slate-900 dark:text-white leading-[0.95] mb-6 tracking-tighter">
              {t.hero.headline} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-safety to-orange-600 drop-shadow-sm dark:drop-shadow-[0_0_20px_rgba(255,51,0,0.2)]">
                {t.hero.subheadline}
              </span>
            </h1>
            
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light border-l-0 lg:border-l-4 border-slate-200 dark:border-slate-800 lg:pl-6">
              {t.hero.description}
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 px-2 sm:px-0 mb-8 lg:mb-0">
              <button 
                onClick={() => scrollTo('quickcheck')}
                className="group relative bg-safety text-white px-8 py-4 font-bold uppercase tracking-wider text-sm overflow-hidden rounded-sm hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-safety transition-all duration-300 shadow-[0_4px_20px_rgba(255,51,0,0.3)] hover:shadow-lg"
              >
                 <span className="relative z-10 flex items-center justify-center">
                   {t.hero.cta_check} <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                 </span>
              </button>

              <div className="flex items-center justify-center gap-3 px-6 py-4 border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/[0.02] rounded-sm backdrop-blur-md shadow-sm dark:shadow-none">
                 <ShieldCheck size={20} className="text-emerald-600 dark:text-emerald-500" />
                 <span className="font-bold text-xs text-slate-700 dark:text-slate-300 tracking-widest uppercase">{t.hero.cta_suva}</span>
              </div>
            </div>
          </div>

          {/* Right: 3D CNC Simulator */}
          <div className="w-full relative perspective-[1000px] order-2 lg:order-2 mb-4 lg:mb-0">
             {/* Glow Effect behind machine */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-safety/5 blur-3xl rounded-full -z-10 dark:opacity-100 opacity-50"></div>
             
             {/* The Machine */}
             <div className="transform scale-90 lg:scale-100 drop-shadow-2xl dark:drop-shadow-none">
                <CNCMachineMonitor />
             </div>
             
             {/* Mobile Only: Quick Status Badge Overlay */}
             <div className="lg:hidden absolute bottom-[-10px] left-1/2 -translate-x-1/2 bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 backdrop-blur px-4 py-2 rounded-full flex items-center gap-3 shadow-xl w-max">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-500 font-bold uppercase tracking-widest">SYSTEM ONLINE</span>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};