'use client';

import React from 'react';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { Button } from './Button';
import { useSettings } from '../contexts/SettingsContext';

export const QuickCheck: React.FC = () => {
  const { t } = useSettings();

  return (
    <section id="quickcheck" className="bg-[#0B1120] py-24 relative overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-stretch">
          
          {/* Left Column: Instructions */}
          <div className="lg:w-1/2 flex flex-col justify-center">
             <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-lg bg-safety/10 border border-safety/20 flex items-center justify-center shrink-0">
                   <AlertTriangle className="text-safety" size={24} />
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-none">
                   {t.quickcheck.title}
                </h2>
             </div>
             
             <div className="pl-2 border-l-2 border-slate-800 mb-10">
                <p className="text-slate-400 text-base md:text-lg leading-relaxed pl-6">
                   {t.quickcheck.description}
                </p>
             </div>

             <div className="space-y-4">
                {t.quickcheck.items.map((item) => (
                  <div key={item.id} className="flex items-center p-5 bg-[#141b2d] border border-white/5 rounded-sm hover:border-white/20 transition-all group">
                     <span className="text-4xl font-black text-slate-800 mr-6 group-hover:text-slate-700 transition-colors select-none font-mono tracking-tighter w-16 text-center">{item.id}</span>
                     <div>
                        <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-1 group-hover:text-safety transition-colors">{item.title}</h4>
                        <p className="text-slate-500 text-xs font-mono">{item.desc}</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>

          {/* Right Column: Emergency Card (Matching Image) */}
          <div className="lg:w-1/2">
             <div className="h-full bg-[#050912] border border-white/10 rounded-lg p-8 md:p-12 flex flex-col items-center justify-center text-center relative shadow-2xl">
                
                {/* Decoration Dots */}
                <div className="absolute top-6 right-6 flex gap-1">
                   <div className="w-1 h-1 bg-slate-700 rounded-full"></div>
                   <div className="w-1 h-1 bg-slate-700 rounded-full"></div>
                   <div className="w-1 h-1 bg-slate-700 rounded-full"></div>
                </div>

                {/* Phone Icon */}
                <div className="mb-6 opacity-80">
                   <div className="w-12 h-20 border-2 border-slate-700 rounded-lg flex justify-center pt-2">
                      <div className="w-1 h-1 bg-slate-700 rounded-full"></div>
                   </div>
                </div>

                <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-[0.3em] mb-4">
                   {t.quickcheck.call_cta}
                </span>

                <a href="tel:+41321234567" className="text-5xl md:text-6xl font-black text-safety tracking-tighter hover:text-white transition-colors mb-10 block">
                   032 123 45 67
                </a>

                <Button 
                   fullWidth 
                   size="lg" 
                   onClick={() => document.getElementById('kontakt')?.scrollIntoView({behavior: 'smooth'})}
                   className="!bg-safety !text-white hover:!bg-white hover:!text-safety border-none !uppercase !font-black !tracking-widest"
                >
                   {t.quickcheck.digital_cta} <ArrowRight size={18} className="ml-2" />
                </Button>

             </div>
          </div>

        </div>
      </div>
    </section>
  );
};