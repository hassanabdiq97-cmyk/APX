'use client';

import React from 'react';
import { Cpu, ArrowRight, Camera, FileCode, Activity, Info } from 'lucide-react';
import { Button } from './Button';
import { useSettings } from '../contexts/SettingsContext';

const icons = [FileCode, Activity, Camera];

export const QuickCheck: React.FC = () => {
  const { t } = useSettings();

  return (
    <section id="quickcheck" className="bg-slate-100 dark:bg-[#0B1120] py-20 lg:py-32 relative overflow-hidden group/section">
      {/* Background Grid - subtle and technical */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-stretch">
          
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
             <div className="flex items-center gap-5 mb-10 justify-center lg:justify-start">
                <div className="w-16 h-16 rounded bg-safety/10 border border-safety/30 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(255,51,0,0.15)] relative">
                   <div className="absolute inset-0 bg-safety/20 animate-ping rounded opacity-50"></div>
                   <Cpu className="text-safety relative z-10" size={32} />
                </div>
                <div>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-[0.9] uppercase tracking-tighter">
                    {t.quickcheck.title}
                    </h2>
                    <div className="h-1 w-20 bg-safety mt-2"></div>
                </div>
             </div>
             
             <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-10 text-center lg:text-left font-light max-w-2xl mx-auto lg:mx-0 border-l-4 border-slate-200 dark:border-slate-800 pl-6">
               {t.quickcheck.description}
             </p>

             {/* Focus-Interaction Group */}
             <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 mb-10 lg:mb-0 group/list">
                {t.quickcheck.items.map((item, i) => {
                  const Icon = icons[i];
                  return (
                    <div key={item.id} className="flex items-center p-6 bg-white dark:bg-[#141b2d] border border-slate-200 dark:border-white/5 rounded-sm shadow-lg hover:shadow-2xl touch-card group transition-all duration-300 group-hover/list:opacity-50 group-hover/list:blur-[1px] hover:!opacity-100 hover:!blur-0 hover:border-safety/50 hover:translate-x-2">
                       <div className="flex items-center justify-center w-12 h-12 bg-slate-50 dark:bg-slate-900/50 rounded-sm border border-slate-100 dark:border-white/10 text-slate-400 group-hover:text-white group-hover:bg-safety transition-all mr-6 shrink-0 relative overflow-hidden">
                          <Icon size={20} strokeWidth={2} />
                       </div>
                       <div className="text-left flex-grow">
                          <div className="flex justify-between items-center mb-1">
                             <h4 className="text-slate-900 dark:text-white font-black uppercase tracking-widest text-sm group-hover:text-safety transition-colors">{item.title}</h4>
                             <span className="text-2xl font-black text-slate-100 dark:text-slate-800 font-mono italic group-hover:text-safety/20 transition-colors">0{i+1}</span>
                          </div>
                          <p className="text-slate-500 dark:text-slate-400 text-xs font-mono leading-tight">{item.desc}</p>
                       </div>
                    </div>
                  );
                })}
             </div>
             
          </div>

          <div className="w-full lg:w-1/2">
             <div className="h-full bg-slate-900 border border-white/5 rounded-sm p-10 md:p-16 flex flex-col items-center justify-center text-center relative shadow-3xl group overflow-hidden">
                {/* Visual HUD Decoration */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,51,0,0.05),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-safety/50 to-transparent opacity-50"></div>
                
                <div className="absolute top-6 right-6 flex items-center gap-3">
                   <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]"></div>
                   <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-[0.2em]">SERVICE_DESK_ONLINE</span>
                </div>

                <div className="w-20 h-32 border-2 border-slate-700 rounded-lg mb-8 flex justify-center pt-4 relative bg-slate-800/50 backdrop-blur-sm shadow-inner">
                   <div className="w-3 h-3 bg-safety rounded-full shadow-[0_0_15px_#FF3300] animate-pulse"></div>
                   <div className="absolute bottom-4 w-1/2 h-1 bg-slate-700 rounded-full"></div>
                </div>

                <span className="text-[11px] font-mono font-black text-slate-500 uppercase tracking-[0.4em] mb-6">
                   {t.quickcheck.call_cta}
                </span>

                <a href="tel:+41321234567" className="text-5xl sm:text-6xl md:text-7xl font-black text-white hover:text-safety tracking-tighter mb-10 block transition-all active:scale-95 text-glow-safety/20 selection:bg-white selection:text-safety">
                   032 123 45 67
                </a>

                <Button fullWidth size="lg" className="py-6 text-base group overflow-hidden" onClick={() => document.getElementById('kontakt')?.scrollIntoView({behavior: 'smooth'})}>
                   <span className="relative z-10 flex items-center justify-center">
                     {t.quickcheck.digital_cta} <ArrowRight size={20} className="ml-3 group-hover:translate-x-2 transition-transform" />
                   </span>
                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </Button>
                
                <div className="mt-8 flex items-center gap-2 text-[10px] text-slate-500 font-mono uppercase tracking-widest">
                   <Info size={12} className="text-safety" />
                   <span>Avg. Response: &lt; 12 Seconds</span>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};
