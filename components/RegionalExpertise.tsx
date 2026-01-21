'use client';

import React from 'react';
import { Timer, MapPin } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { useSettings } from '../contexts/SettingsContext';

export const RegionalExpertise: React.FC = () => {
  const { t } = useSettings();

  return (
    <section id="expertise" className="py-32 bg-slate-100 dark:bg-slate-900 border-y border-slate-200 dark:border-white/5 relative overflow-hidden transition-colors duration-300">
         {/* Background Map Abstract */}
         <div className="absolute inset-0 opacity-10 pointer-events-none">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-slate-900 dark:border-white/5 rounded-full"></div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-slate-900 dark:border-white/10 border-dashed rounded-full"></div>
         </div>

         <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-16">
               
               {/* Text Content */}
               <div className="md:w-1/2">
                  <SectionHeader title={t.expertise.title} subtitle={t.expertise.subtitle} alignment="left" />
                  
                  <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mt-2 mb-8 tracking-tight uppercase leading-none">
                        {t.expertise.headline_part1} <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-safety to-slate-500">{t.expertise.headline_part2}</span>
                  </h3>

                  <div className="pl-6 border-l-2 border-safety/50 mb-10">
                      <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed font-light">
                         {t.expertise.description}
                      </p>
                  </div>
                  
                  <div className="space-y-4">
                     <div className="flex gap-4 p-5 bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-white/5 rounded-xl hover:border-safety/30 dark:hover:bg-slate-900/60 transition-colors group shadow-sm dark:shadow-none">
                        <div className="shrink-0 pt-1 text-safety group-hover:scale-110 transition-transform">
                           <Timer size={24} strokeWidth={1.5} />
                        </div>
                        <div>
                           <strong className="text-slate-900 dark:text-white block text-sm mb-1 uppercase tracking-wide">{t.expertise.stat_time.title}</strong>
                           <span className="text-xs text-slate-500">{t.expertise.stat_time.desc}</span>
                        </div>
                     </div>
                     
                     <div className="flex gap-4 p-5 bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-white/5 rounded-xl hover:border-safety/30 dark:hover:bg-slate-900/60 transition-colors group shadow-sm dark:shadow-none">
                        <div className="shrink-0 pt-1 text-safety group-hover:scale-110 transition-transform">
                           <MapPin size={24} strokeWidth={1.5} />
                        </div>
                        <div>
                           <strong className="text-slate-900 dark:text-white block text-sm mb-1 uppercase tracking-wide">{t.expertise.stat_stock.title}</strong>
                           <span className="text-xs text-slate-500">{t.expertise.stat_stock.desc}</span>
                        </div>
                     </div>
                  </div>
               </div>
               
               {/* Visual Radar Map Representation - Always dark/technical even in light mode for contrast */}
               <div className="md:w-1/2 flex justify-center w-full perspective-[1000px]">
                  <div className="relative w-80 h-80 md:w-96 md:h-96 bg-slate-950/90 rounded-full border border-white/10 shadow-2xl flex items-center justify-center backdrop-blur-sm transform md:rotate-y-12 transition-transform duration-700 hover:rotate-0">
                     
                     {/* Radar Sweep Effect */}
                     <div className="absolute inset-0 rounded-full overflow-hidden opacity-50">
                        <div className="w-full h-1/2 bg-gradient-to-t from-safety/30 to-transparent absolute top-0 origin-bottom animate-[spin_4s_linear_infinite]"></div>
                     </div>

                     {/* Center Point (Lengnau) */}
                     <div className="absolute flex flex-col items-center z-20">
                        <div className="relative">
                            <div className="w-4 h-4 bg-safety rounded-full shadow-[0_0_20px_#FF3300] relative z-10"></div>
                            <div className="absolute inset-0 bg-safety rounded-full animate-ping opacity-75"></div>
                        </div>
                        <span className="mt-4 bg-slate-900/90 px-3 py-1 text-[10px] font-bold text-white border border-safety/50 rounded shadow-lg uppercase tracking-wider backdrop-blur-md">Lengnau HQ</span>
                     </div>

                     {/* Satellites */}
                     <div className="absolute top-[20%] left-[20%] flex flex-col items-center group cursor-pointer">
                        <div className="w-3 h-3 bg-slate-700 border border-slate-500 rounded-full group-hover:bg-white group-hover:shadow-[0_0_10px_white] transition-all"></div>
                        <span className="mt-2 text-[9px] font-mono text-slate-500 group-hover:text-white uppercase transition-colors">Grenchen (6km)</span>
                     </div>
                     <div className="absolute bottom-[20%] left-[30%] flex flex-col items-center group cursor-pointer">
                        <div className="w-3 h-3 bg-slate-700 border border-slate-500 rounded-full group-hover:bg-white group-hover:shadow-[0_0_10px_white] transition-all"></div>
                        <span className="mt-2 text-[9px] font-mono text-slate-500 group-hover:text-white uppercase transition-colors">Biel (11km)</span>
                     </div>
                     <div className="absolute top-[30%] right-[20%] flex flex-col items-center group cursor-pointer">
                         <div className="w-3 h-3 bg-slate-700 border border-slate-500 rounded-full group-hover:bg-white group-hover:shadow-[0_0_10px_white] transition-all"></div>
                        <span className="mt-2 text-[9px] font-mono text-slate-500 group-hover:text-white uppercase transition-colors">Solothurn (14km)</span>
                     </div>
                     
                     {/* HUD Rings */}
                     <div className="absolute inset-0 border border-white/5 rounded-full scale-75"></div>
                     <div className="absolute inset-0 border border-white/5 rounded-full scale-50"></div>
                     <div className="absolute w-full h-[1px] bg-white/5 top-1/2 left-0"></div>
                     <div className="absolute h-full w-[1px] bg-white/5 left-1/2 top-0"></div>

                  </div>
               </div>
            </div>
         </div>
    </section>
  );
};