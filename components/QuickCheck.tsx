'use client';

import React from 'react';
import { AlertTriangle, ArrowRight, Camera, FileText, ClipboardList } from 'lucide-react';
import { Button } from './Button';
import { useSettings } from '../contexts/SettingsContext';

const icons = [ClipboardList, FileText, Camera];

export const QuickCheck: React.FC = () => {
  const { t } = useSettings();

  return (
    <section id="quickcheck" className="bg-slate-100 dark:bg-[#0B1120] py-16 md:py-24 relative overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 bg-tech-grid opacity-10"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-stretch">
          
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
             <div className="flex items-center gap-4 mb-6 md:mb-8">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-safety/10 border border-safety/20 flex items-center justify-center shrink-0">
                   <AlertTriangle className="text-safety" size={24} />
                </div>
                <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                   {t.quickcheck.title}
                </h2>
             </div>
             
             <p className="text-sm md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8 md:mb-10 pl-4 border-l-2 border-safety/50">
               {t.quickcheck.description}
             </p>

             <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3 md:gap-4">
                {t.quickcheck.items.map((item, i) => {
                  const Icon = icons[i];
                  return (
                    <div key={item.id} className="flex flex-row lg:flex-row items-center p-4 bg-white dark:bg-[#141b2d] border border-slate-200 dark:border-white/5 rounded shadow-sm touch-card">
                       <div className="flex items-center justify-center w-12 h-12 bg-slate-50 dark:bg-slate-900 rounded border border-slate-100 dark:border-white/10 text-safety mr-4 shrink-0">
                          <Icon size={20} />
                       </div>
                       <div>
                          <h4 className="text-slate-900 dark:text-white font-bold uppercase tracking-wider text-[10px] md:text-xs mb-0.5">{item.title}</h4>
                          <p className="text-slate-500 text-[9px] md:text-[10px] font-mono leading-none">{item.desc}</p>
                       </div>
                       <div className="ml-auto text-[10px] font-black text-slate-200 dark:text-slate-800 hidden sm:block">0{i+1}</div>
                    </div>
                  );
                })}
             </div>
          </div>

          <div className="w-full lg:w-1/2">
             <div className="h-full bg-white dark:bg-[#050912] border border-slate-200 dark:border-white/10 rounded-lg p-6 md:p-12 flex flex-col items-center justify-center text-center relative shadow-xl">
                <div className="absolute top-4 right-4 flex gap-1"><div className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full"></div><div className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full"></div></div>

                <div className="w-10 h-16 md:w-12 md:h-20 border-2 border-slate-200 dark:border-slate-800 rounded-lg mb-4 flex justify-center pt-2">
                   <div className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
                </div>

                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-4">
                   {t.quickcheck.call_cta}
                </span>

                <a href="tel:+41321234567" className="text-4xl sm:text-5xl md:text-6xl font-black text-safety tracking-tighter mb-8 block active:scale-110 transition-transform">
                   032 123 45 67
                </a>

                <Button fullWidth size="lg" onClick={() => document.getElementById('kontakt')?.scrollIntoView({behavior: 'smooth'})}>
                   {t.quickcheck.digital_cta} <ArrowRight size={18} className="ml-2" />
                </Button>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};