'use client';

import React from 'react';
import { useSettings } from '../contexts/SettingsContext';

export const TrustBar: React.FC = () => {
  const { t } = useSettings();
  const brands = [
    "TORNOS", "BUMOTEC", "WILLEMIN-MACODEL", "INDEX", "TRAUB", // Machines
    "FANUC", "SIEMENS SINUMERIK", "HEIDENHAIN", "BECKHOFF", // Controls
    "SCHAUBLIN", "MIKRON", "STAR" // More Machines
  ];

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 border-y border-slate-200 dark:border-white/5 overflow-hidden relative py-6 transition-colors duration-300">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-50 dark:from-slate-950 to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-50 dark:from-slate-950 to-transparent z-10"></div>
      
      <div className="flex items-center gap-4 mb-4 justify-center">
         <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-mono">{t.trust.label}</span>
      </div>

      <div className="flex whitespace-nowrap overflow-hidden">
        <div className="flex animate-scroll-left">
          {[...brands, ...brands, ...brands].map((brand, i) => (
            <div key={i} className="mx-8 flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity cursor-default group">
               <span className="w-1.5 h-1.5 bg-safety rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
               <span className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-b from-slate-900 to-slate-400 dark:from-white dark:to-slate-500 font-sans tracking-tight">
                 {brand}
               </span>
            </div>
          ))}
        </div>
        {/* Duplicate for seamless loop */}
        <div className="flex animate-scroll-left" aria-hidden="true">
          {[...brands, ...brands, ...brands].map((brand, i) => (
            <div key={i} className="mx-8 flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity cursor-default group">
               <span className="w-1.5 h-1.5 bg-safety rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
               <span className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-b from-slate-900 to-slate-400 dark:from-white dark:to-slate-500 font-sans tracking-tight">
                 {brand}
               </span>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .animate-scroll-left {
          animation: scroll 40s linear infinite;
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};