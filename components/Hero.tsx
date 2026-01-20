'use client';

import React from 'react';
import { Map, ArrowRight, ShieldCheck, Activity, Wifi, CheckCircle, Cpu } from 'lucide-react';
import { Button } from './Button';
import { useSettings } from '../contexts/SettingsContext';

export const Hero: React.FC = () => {
  const { t } = useSettings();
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="relative pt-24 pb-32 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="absolute inset-0 bg-grid-pattern-light dark:bg-grid-pattern opacity-10"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/50 dark:from-slate-900/50 to-transparent"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-20">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="lg:w-3/5">
            <div className="inline-flex items-center gap-3 border border-safety/30 bg-safety/5 px-3 py-1 mb-8 backdrop-blur-sm">
               <Map size={14} className="text-safety animate-pulse" />
               <span className="text-safety font-mono text-[10px] font-bold uppercase tracking-widest">
                 {t.hero.region}
               </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-[0.95] mb-8 tracking-tighter transition-colors">
              {t.hero.headline} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-600 via-slate-500 to-slate-400 dark:from-white dark:via-slate-400 dark:to-slate-600">
                {t.hero.subheadline}
              </span>
            </h1>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-xl leading-relaxed pl-6 border-l-2 border-safety font-light transition-colors">
              {t.hero.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={() => scrollTo('quickcheck')}>
                 {t.hero.cta_check}
              </Button>
              <div className="flex items-center gap-4 px-6 text-xs font-mono text-slate-500">
                 <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-emerald-600 dark:text-emerald-500" />
                    <span className="font-bold text-slate-700 dark:text-white">{t.hero.cta_suva}</span>
                 </div>
              </div>
            </div>
          </div>

          {/* New Diagnostic Response Console Visual */}
          <div className="lg:w-2/5 w-full hidden lg:block">
             <div className="bg-slate-900/90 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 rounded-sm overflow-hidden shadow-2xl relative backdrop-blur-md group select-none transition-all duration-300">
                {/* Header */}
                <div className="bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-white/5 p-3 flex justify-between items-center transition-colors">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                      <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">Remote Connection // Secure</span>
                   </div>
                   <Wifi size={14} className="text-slate-400 dark:text-slate-600" />
                </div>

                {/* Main Body - Force Dark Mode look for the "Console" part even in Light Mode for contrast */}
                <div className="p-6 space-y-6 bg-slate-900">
                   {/* Machine Identity */}
                   <div className="flex justify-between items-start">
                      <div>
                         <h3 className="text-white font-bold text-lg font-sans tracking-tight">Willemin-Macodel 508MT</h3>
                         <div className="text-xs text-slate-500 font-mono mt-1">ID: WM-202X // LOC: Lengnau</div>
                      </div>
                      <div className="border border-safety/30 bg-safety/5 px-2 py-1 rounded">
                         <span className="text-safety font-mono text-[10px] font-bold animate-pulse">ATTENTION REQUIRED</span>
                      </div>
                   </div>

                   {/* Telemetry Grid */}
                   <div className="grid grid-cols-3 gap-2">
                      <div className="bg-slate-950 p-3 border border-white/5 rounded">
                         <div className="text-[9px] text-slate-500 uppercase mb-1 flex items-center gap-1"><Cpu size={10}/> RPM</div>
                         <div className="text-white font-mono font-bold text-sm">42,000</div>
                      </div>
                      <div className="bg-slate-950 p-3 border border-safety/30 rounded relative overflow-hidden">
                         <div className="absolute inset-0 bg-safety/5 animate-pulse"></div>
                         <div className="text-[9px] text-safety uppercase mb-1 flex items-center gap-1 relative z-10"><Activity size={10}/> Vibration</div>
                         <div className="text-safety font-mono font-bold text-sm relative z-10">4.8 mm/s</div>
                      </div>
                      <div className="bg-slate-950 p-3 border border-white/5 rounded">
                         <div className="text-[9px] text-slate-500 uppercase mb-1">Temp</div>
                         <div className="text-white font-mono font-bold text-sm">62°C</div>
                      </div>
                   </div>

                   {/* Timeline / Action Log */}
                   <div className="border-t border-white/5 pt-4">
                      <div className="text-[10px] font-mono text-slate-500 mb-4 uppercase tracking-widest flex justify-between">
                        <span>Incident Protocol</span>
                        <span>#8942-B</span>
                      </div>
                      <div className="space-y-4 relative">
                         {/* Connecting Line */}
                         <div className="absolute left-[3px] top-1 bottom-4 w-[1px] bg-slate-800"></div>

                         <div className="flex gap-3 items-center opacity-50">
                            <div className="w-2 h-2 bg-slate-700 rounded-full relative z-10"></div>
                            <div>
                               <div className="text-[9px] font-mono text-slate-500">14:02</div>
                               <div className="text-xs text-slate-400">Vibration anomaly detected (X-Axis)</div>
                            </div>
                         </div>
                         <div className="flex gap-3 items-center opacity-75">
                            <div className="w-2 h-2 bg-slate-600 rounded-full relative z-10"></div>
                            <div>
                               <div className="text-[9px] font-mono text-slate-500">14:03</div>
                               <div className="text-xs text-slate-300">Automated diagnostic report generated</div>
                            </div>
                         </div>
                         <div className="flex gap-3 items-center">
                            <div className="w-2 h-2 bg-safety rounded-full shadow-[0_0_8px_#FF3300] relative z-10"></div>
                            <div>
                               <div className="text-[9px] font-mono text-safety">14:05</div>
                               <div className="text-xs text-white font-bold">Technician dispatched from Grenchen</div>
                            </div>
                         </div>
                      </div>
                   </div>
                   
                   {/* ETA Footer */}
                   <div className="bg-emerald-500/5 border border-emerald-500/20 p-3 rounded flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                         <CheckCircle size={14} className="text-emerald-500" />
                         <span className="text-xs text-emerald-400 font-bold uppercase tracking-wide">Response Confirmed</span>
                      </div>
                      <div className="font-mono text-xs text-white">ETA: <span className="text-emerald-400 font-bold">12 MIN</span></div>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};