'use client';

import React from 'react';
import { Watch, Stethoscope, Factory, Flame } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { useSettings } from '../contexts/SettingsContext';

const icons = [Watch, Stethoscope, Factory, Flame];

export const Industries: React.FC = () => {
  const { t } = useSettings();

  return (
    <section id="branchen" className="py-24 bg-slate-900 border-y border-white/5 relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader title={t.industries.title} subtitle={t.industries.subtitle} />

        {/* 4 Items -> 2x2 Grid on md, 4 cols on xl */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {t.industries.items.map((item, i) => {
            const Icon = icons[i] || Factory;
            return (
              <div key={i} className="bg-slate-950 p-8 border border-white/5 hover:border-safety/30 transition-all duration-300 group rounded-sm hover:-translate-y-1 hover:shadow-2xl relative overflow-hidden flex flex-col">
                
                {/* Hover Glow */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-safety/5 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="p-3 bg-slate-900 border border-white/10 rounded-sm text-slate-300 group-hover:text-safety group-hover:border-safety/30 transition-colors">
                    <Icon size={28} strokeWidth={1.5} />
                  </div>
                  <span className="text-[10px] font-mono text-slate-600 border border-slate-800 px-2 py-0.5 rounded uppercase">
                     SEC_0{i + 1}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wide group-hover:text-safety transition-colors relative z-10">
                   {item.title}
                </h3>
                
                <p className="text-sm text-slate-400 leading-relaxed mb-6 min-h-[5rem] relative z-10">
                   {item.desc}
                </p>

                <div className="space-y-3 mb-8 relative z-10 flex-grow">
                   {item.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                         <div className="w-1 h-1 bg-emerald-500 rounded-full"></div>
                         <span className="text-xs text-slate-300 font-medium">{feat}</span>
                      </div>
                   ))}
                </div>

                <div className="border-t border-white/5 pt-4 relative z-10 mt-auto">
                   <span className="text-[9px] text-slate-500 uppercase tracking-widest block mb-2">Systems Expertise</span>
                   <p className="text-xs text-slate-400 font-mono">
                      {item.brands}
                   </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};