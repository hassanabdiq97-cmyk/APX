'use client';

import React, { useState } from 'react';
import { Briefcase, Wrench, Truck, GraduationCap, ArrowRight, MapPin, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from './Button';
import { Modal } from './Modal';

interface JobOffer {
  id: string;
  title: string;
  location: string;
  workload: string;
  description: string;
  requirements: string[];
  benefits: string[];
}

const jobOffers: JobOffer[] = [
  {
    id: 'cnc-tech',
    title: 'Servicetechniker CNC (m/w/d)',
    location: 'Region Biel/Bienne',
    workload: '100%',
    description: 'Du bist die Feuerwehr für unsere Kunden in der Uhrenindustrie. Wenn eine Tornos oder Bumotec steht, sorgst du dafür, dass die Späne wieder fliegen.',
    requirements: [
      'Ausbildung als Polymechaniker, Automatiker oder vergleichbar.',
      'Erfahrung in der Instandhaltung von CNC-Werkzeugmaschinen.',
      'Kenntnisse in Fanuc oder Siemens Steuerungen.',
      'Fliessend Deutsch, Französisch von Vorteil.',
      'Keine Angst vor schmutzigen Händen und komplexer Fehlersuche.'
    ],
    benefits: [
      'Top ausgestattetes Service-Fahrzeug (VW Transporter) zur privaten Nutzung.',
      'Hochwertiges Werkzeug (Hilti, Festool) und iPad.',
      'Flexible Arbeitszeiten (Start von zu Hause).',
      'Bezahlte Weiterbildungen direkt bei den Maschinenherstellern.'
    ]
  },
  {
    id: 'retro-auto',
    title: 'Automatiker für Retrofit (m/w/d)',
    location: 'Region Solothurn',
    workload: '80-100%',
    description: 'Du hauchst alten Maschinen neues Leben ein. Statt nur Teile zu tauschen, entwickelst du neue Steuerungskonzepte und integrierst IoT-Lösungen.',
    requirements: [
      'Abgeschlossene Ausbildung als Automatiker EFZ.',
      'Sicherer Umgang mit Elektro-Schemata (EPLAN).',
      'Erfahrung im Schaltschrankbau und Maschinenverdrahtung.',
      'Grundkenntnisse in SPS-Programmierung (TIA Portal, Beckhoff).',
      'Freude an Tüftel-Arbeit und Problemlösung.'
    ],
    benefits: [
      'Arbeit in unserer modernen Werkstatt in Lengnau (wenig Reisetätigkeit).',
      'Mitgestaltung bei eigenen Steuerungsprojekten.',
      'Sehr kollegiales Team mit flachen Hierarchien.',
      '5 Wochen Ferien und gute Sozialleistungen.'
    ]
  }
];

export const CareerSection: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<JobOffer | null>(null);

  const handleApplyClick = () => {
    setSelectedJob(null);
    setTimeout(() => {
        document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <>
      <section id="karriere" className="py-24 bg-slate-900 relative overflow-hidden transition-colors duration-300 border-y border-white/5">
         {/* Background Accent */}
         <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-slate-800/20 to-transparent pointer-events-none"></div>

         <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col lg:flex-row items-center gap-16">
               
               <div className="lg:w-1/2">
                  <div className="flex items-center gap-2 mb-4">
                     <Briefcase className="text-safety" size={20} />
                     <span className="text-xs font-bold uppercase tracking-[0.2em] text-safety font-mono">
                        Für Profis
                     </span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight leading-none mb-6">
                     Kein Job für <br/>
                     Bastler.
                  </h2>
                  <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                     Gute Techniker sind Gold wert. Deshalb behandeln wir sie auch so. 
                     Bei Apex Industrial arbeitest du mit High-End Equipment an den anspruchsvollsten Maschinen der Schweiz.
                  </p>

                  <div className="space-y-6 mb-8">
                     <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-slate-950 border border-white/10 flex items-center justify-center shrink-0">
                           <Wrench size={20} className="text-white" />
                        </div>
                        <div>
                           <strong className="text-white block">Premium Werkzeug</strong>
                           <span className="text-sm text-slate-500">Volle Hilti & Festool Ausstattung. iPad für digitale Rapporte.</span>
                        </div>
                     </div>
                     <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-slate-950 border border-white/10 flex items-center justify-center shrink-0">
                           <Truck size={20} className="text-white" />
                        </div>
                        <div>
                           <strong className="text-white block">Eigenes Service-Fahrzeug</strong>
                           <span className="text-sm text-slate-500">Top ausgestatteter Bus, auch für den Arbeitsweg.</span>
                        </div>
                     </div>
                     <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-slate-950 border border-white/10 flex items-center justify-center shrink-0">
                           <GraduationCap size={20} className="text-white" />
                        </div>
                        <div>
                           <strong className="text-white block">Bezahlte Weiterbildung</strong>
                           <span className="text-sm text-slate-500">SPS-Kurse (Siemens/Fanuc) und Hersteller-Schulungen.</span>
                        </div>
                     </div>
                  </div>

                  <Button variant="outline" onClick={() => document.getElementById('kontakt')?.scrollIntoView({behavior: 'smooth'})}>
                     Initiativ bewerben
                  </Button>
               </div>

               {/* Visual Side */}
               <div className="lg:w-1/2 w-full">
                  <div className="bg-slate-950 border border-white/10 p-8 relative shadow-2xl">
                     <div className="absolute -top-4 -right-4 w-24 h-24 bg-safety/10 -z-10"></div>
                     <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <AlertCircle size={20} className="text-safety animate-pulse" />
                        Aktuell gesucht:
                     </h3>
                     <ul className="space-y-4">
                        {jobOffers.map((job) => (
                           <li 
                             key={job.id}
                             onClick={() => setSelectedJob(job)}
                             className="flex justify-between items-center border-b border-white/5 pb-4 group cursor-pointer hover:border-safety/50 transition-colors"
                           >
                              <div>
                                 <div className="font-bold text-white group-hover:text-safety transition-colors">{job.title}</div>
                                 <div className="text-xs text-slate-500 mt-1 flex items-center gap-2 font-mono">
                                    <span>{job.location}</span>
                                    <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                                    <span>{job.workload}</span>
                                 </div>
                              </div>
                              <div className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center group-hover:bg-safety group-hover:border-safety transition-all">
                                 <ArrowRight size={14} className="text-slate-500 group-hover:text-white transition-colors" />
                              </div>
                           </li>
                        ))}
                     </ul>
                     <div className="mt-6 text-xs text-slate-600 text-center font-mono">
                        Klicke auf einen Job für Details.
                     </div>
                  </div>
               </div>

            </div>
         </div>
      </section>

      {/* Job Details Modal */}
      <Modal 
        isOpen={!!selectedJob} 
        onClose={() => setSelectedJob(null)} 
        title={selectedJob?.title || ''}
      >
        {selectedJob && (
          <div className="space-y-8">
            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 text-sm font-mono border-b border-slate-200 dark:border-white/10 pb-6">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <MapPin size={16} className="text-safety" />
                    {selectedJob.location}
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <Clock size={16} className="text-safety" />
                    {selectedJob.workload}
                </div>
            </div>

            {/* Description */}
            <div>
                <p className="text-lg text-slate-800 dark:text-white font-medium leading-relaxed">
                    {selectedJob.description}
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Requirements */}
                <div className="bg-slate-50 dark:bg-slate-950/50 p-6 rounded border border-slate-100 dark:border-white/5">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-4">
                        Das bringst du mit
                    </h4>
                    <ul className="space-y-3">
                        {selectedJob.requirements.map((req, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                                <CheckCircle2 size={16} className="text-slate-400 shrink-0 mt-0.5" />
                                <span className="text-sm text-slate-600 dark:text-slate-400">{req}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Benefits */}
                <div className="bg-emerald-500/5 p-6 rounded border border-emerald-500/10">
                    <h4 className="text-sm font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-4">
                        Deine Benefits
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

            <div className="pt-4 flex justify-between items-center border-t border-slate-100 dark:border-white/10">
              <span className="text-xs text-slate-500 italic">Referenz-Nr: APX-HR-{selectedJob.id.toUpperCase()}</span>
              <Button onClick={handleApplyClick}>
                Jetzt bewerben
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};