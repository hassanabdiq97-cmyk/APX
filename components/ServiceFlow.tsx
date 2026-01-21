'use client';

import React from 'react';
import { Phone, Search, Wrench, CheckCircle2 } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { useSettings } from '../contexts/SettingsContext';

const icons = [Phone, Search, Wrench];

export const ServiceFlow: React.FC = () => {
  const { t } = useSettings();

  return (
    <section className="py-32 bg-slate-50 dark:bg-slate-950 relative border-t border-slate-200 dark:border-white/5 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <SectionHeader title={t.flow.title} subtitle={t.flow.subtitle} />
        
        <div className="grid md:grid-cols-3 gap-12 relative max-w-5xl mx-auto">
           {/* Connector Line (Desktop) */}
           <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[1px] bg-gradient-to-r from-slate-300 via-slate-200 to-slate-300 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 z-0"></div>

           {t.flow.steps.map((step, i) => {
             const Icon = icons[i];
             return (
               <div key={i} className="relative z-10 flex flex-col items-center text-center group">
                 <div className="w-24 h-24 rounded-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 flex items-center justify-center mb-8 group-hover:border-safety group-hover:text-safety transition-all duration-300 shadow-xl relative text-slate-700 dark:text-slate-300">
                    {/* Outer Ring Pulse on Hover */}
                    <div className="absolute -inset-1 rounded-full border border-safety/0 group-hover:border-safety/30 transition-all duration-500 scale-90 group-hover:scale-110"></div>
                    <Icon size={32} strokeWidth={1.5} />
                 </div>
                 <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wide group-hover:text-safety transition-colors">{step.title}</h3>
                 <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xs leading-relaxed font-light">{step.desc}</p>
               </div>
             );
           })}
        </div>

        <div className="mt-20 text-center">
           <div className="inline-flex items-center gap-3 px-6 py-3 bg-emerald-500/5 border border-emerald-500/20 rounded-full">
              <CheckCircle2 size={18} className="text-emerald-500" />
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">{t.flow.digital_report}</span>
           </div>
        </div>
      </div>
    </section>
  );
};