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
    <div className="w-full bg-slate-50 dark:bg-slate-950 border-y border-slate-200 dark:border-white/5 overflow-hidden relative py-0 transition-colors duration-300">
      
      <div className="flex flex-col md:flex-row items-center">
         {/* Static Authority Label (The "Nameplate" Effect) */}
         <div className="z-20 bg-slate-200 dark:bg-slate-900 px-6 py-4 md:py-6 flex items-center gap-3 border-b md:border-b-0 md:border-r border-slate-300 dark:border-white/10 w-full md:w-auto justify-center shadow-lg md:shadow-none relative">
            <div className="absolute left-0 top-0 w-1 h-full bg-safety md:hidden"></div>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-700 dark:text-slate-200 font-mono whitespace-nowrap">
               {t.trust.label}
            </span>
         </div>

         {/* Scrolling Area */}
         <div className="relative flex-grow overflow-hidden py-6 md:py-0 w-full">
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>
            
            <div className="flex whitespace-nowrap">
              <div className="flex animate-scroll-left items-center">
                {[...brands, ...brands, ...brands].map((brand, i) => (
                  <div key={i} className="mx-8 flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity cursor-default group">
                     <span className="w-1.5 h-1.5 bg-safety rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                     <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-b from-slate-900 to-slate-400 dark:from-white dark:to-slate-500 font-sans tracking-tight">
                       {brand}
                     </span>
                  </div>
                ))}
              </div>
            </div>
         </div>
      </div>
      
      <style>{`
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