'use client';

import React, { useState } from 'react';
import { ArrowRight, MapPin, Clock, CheckCircle2, Heart, Plane, GraduationCap, Users } from 'lucide-react';
import { Button } from './Button';
import { Modal } from './Modal';
import { useSettings } from '../contexts/SettingsContext';

// Icon Map for Dynamic Values
const iconMap: Record<string, any> = {
  vacation: Plane,
  education: GraduationCap,
  team: Users,
  tolerance: Heart
};

export const CareerSection: React.FC = () => {
  const { t } = useSettings();
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const selectedJob = selectedJobId ? t.career.jobs.find(j => j.id === selectedJobId) : null;

  const handleApplyClick = () => {
    setSelectedJobId(null);
    setTimeout(() => {
        document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <>
      <section id="karriere" className="py-32 bg-slate-50 dark:bg-slate-900 border-y border-slate-200 dark:border-white/5 relative overflow-hidden transition-colors duration-300">
         {/* Background Accent */}
         <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-slate-200/20 dark:from-slate-800/20 to-transparent pointer-events-none"></div>

         <div className="container mx-auto px-6 relative z-10">
            
            {/* Header / Intro */}
            <div className="mb-20 max-w-4xl">
                <div className="flex items-center gap-2 mb-6">
                   <div className="w-2 h-2 bg-safety rounded-none"></div>
                   <span className="text-xs font-bold uppercase tracking-[0.2em] text-safety font-mono">
                      {t.career.badge}
                   </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tight leading-[0.9] mb-8">
                   {t.career.title} <br/>
                   <span className="text-slate-500">{t.career.subtitle}</span>
                </h2>
                
                <div className="bg-white/50 dark:bg-slate-950/50 border-l-2 border-safety/50 p-6 md:p-8 backdrop-blur-sm">
                   <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-4">{t.career.intro_title}</h3>
                   <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-light">
                      {t.career.intro_text}
                   </p>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-20">
               
               {/* Left Column: Values Grid */}
               <div className="lg:w-3/5">
                  <div className="grid md:grid-cols-2 gap-6">
                     {t.career.values.map((val) => {
                       const Icon = iconMap[val.id] || CheckCircle2;
                       return (
                         <div key={val.id} className="bg-white dark:bg-slate-950 p-6 border border-slate-200 dark:border-white/5 hover:border-safety/30 transition-all group flex flex-col h-full shadow-sm dark:shadow-none">
                            <div className="w-12 h-12 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-white/10 flex items-center justify-center shrink-0 mb-6 group-hover:bg-safety group-hover:text-white group-hover:border-safety transition-all duration-300">
                               <Icon size={24} strokeWidth={1.5} className="text-slate-400 group-hover:text-white" />
                            </div>
                            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3 uppercase tracking-wide">{val.title}</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-500 leading-relaxed font-light group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors">
                               {val.desc}
                            </p>
                         </div>
                       );
                     })}
                  </div>
                  
                  <div className="mt-10">
                     <Button variant="outline" onClick={() => document.getElementById('kontakt')?.scrollIntoView({behavior: 'smooth'})}>
                        {t.career.cta_init}
                     </Button>
                  </div>
               </div>

               {/* Right Column: Job Board */}
               <div className="lg:w-2/5 w-full">
                  <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 p-1 relative shadow-2xl rounded-sm sticky top-24">
                     {/* Job Board Header */}
                     <div className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-white/5 p-4 flex items-center justify-between">
                         <div className="flex items-center gap-2">
                             <div className="w-2 h-2 bg-safety rounded-full animate-pulse"></div>
                             <span className="text-[10px] font-bold text-slate-900 dark:text-white uppercase tracking-widest">{t.career.positions_title}</span>
                         </div>
                         <div className="text-[10px] font-mono text-slate-500">REC-202X</div>
                     </div>

                     <div className="bg-white dark:bg-slate-950 p-8">
                         <ul className="space-y-4">
                            {t.career.jobs.map((job) => (
                               <li 
                                 key={job.id}
                                 onClick={() => setSelectedJobId(job.id)}
                                 className="group relative border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-900/50 p-6 hover:bg-slate-100 dark:hover:bg-slate-900 hover:border-safety/50 cursor-pointer transition-all duration-300"
                               >
                                  <div className="flex justify-between items-start">
                                      <div>
                                         <div className="font-bold text-slate-900 dark:text-white text-lg group-hover:text-safety transition-colors mb-2">{job.title}</div>
                                         <div className="flex items-center gap-4 text-xs text-slate-500 font-mono">
                                            <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
                                            <span className="flex items-center gap-1"><Clock size={12} /> {job.workload}</span>
                                         </div>
                                      </div>
                                      <div className="w-8 h-8 rounded border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-safety group-hover:border-safety transition-all transform group-hover:rotate-[-45deg]">
                                         <ArrowRight size={14} />
                                      </div>
                                  </div>
                               </li>
                            ))}
                         </ul>
                         <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/5 text-center">
                            <p className="text-xs text-slate-500 mb-4 font-mono">{t.career.no_position}</p>
                            <a href="#kontakt" className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest hover:text-safety transition-colors border-b border-safety/30 pb-0.5 hover:border-safety">
                               {t.career.apply_cta}
                            </a>
                         </div>
                     </div>
                  </div>
               </div>

            </div>
         </div>
      </section>

      {/* Job Details Modal */}
      <Modal 
        isOpen={!!selectedJob} 
        onClose={() => setSelectedJobId(null)} 
        title={selectedJob?.title || ''}
      >
        {selectedJob && (
          <div className="space-y-8">
            <div className="flex flex-wrap gap-4 text-xs font-mono font-bold uppercase tracking-wide border-b border-slate-200 dark:border-white/10 pb-6">
                <div className="bg-slate-100 dark:bg-white/5 px-3 py-1 rounded text-slate-700 dark:text-slate-300">
                    <span className="text-slate-400 mr-2">{t.career.modal.location}:</span>
                    {selectedJob.location}
                </div>
                <div className="bg-slate-100 dark:bg-white/5 px-3 py-1 rounded text-slate-700 dark:text-slate-300">
                    <span className="text-slate-400 mr-2">{t.career.modal.workload}:</span>
                    {selectedJob.workload}
                </div>
            </div>

            <p className="text-lg text-slate-800 dark:text-white font-medium leading-relaxed">
                {selectedJob.description}
            </p>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-slate-50 dark:bg-slate-950/50 p-6 rounded border border-slate-100 dark:border-white/5">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-4">
                        {t.career.modal.requirements}
                    </h4>
                    <ul className="space-y-3">
                        {selectedJob.requirements.map((req, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                                <span className="text-safety mt-0.5">▸</span>
                                <span className="text-sm text-slate-600 dark:text-slate-400">{req}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-emerald-500/5 p-6 rounded border border-emerald-500/10">
                    <h4 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-4">
                        {t.career.modal.benefits}
                    </h4>
                    <ul className="space-y-3">
                        {selectedJob.benefits.map((ben, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                                <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                                <span className="text-sm text-slate-700 dark:text-slate-300">{ben}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="pt-4 flex justify-end items-center border-t border-slate-100 dark:border-white/10">
              <Button onClick={handleApplyClick}>
                {t.career.modal.apply_now}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};