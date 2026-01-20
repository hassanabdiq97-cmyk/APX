import React from 'react';
import { Timer, Package, MapPin, CheckCircle, FileCheck, Languages } from 'lucide-react';
import { SectionHeader } from './SectionHeader';

export const RegionalExpertise: React.FC = () => {
  return (
    <>
      {/* REGIONAL ADVANTAGE SECTION */}
      <section id="expertise" className="py-24 bg-slate-900 border-y border-white/5 relative overflow-hidden">
         {/* Background Map Abstract */}
         <div className="absolute inset-0 opacity-5 pointer-events-none">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white rounded-full"></div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white border-dashed rounded-full"></div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-safety rounded-full bg-safety/5"></div>
         </div>

         <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-12">
               <div className="md:w-1/2">
                  <SectionHeader title="Operational Radius" subtitle="Standort & Compliance" alignment="left" />
                  <h3 className="text-2xl font-bold text-white mb-6">WARUM UNSERE NÄHE IHR GEWINN IST.</h3>
                  <p className="text-slate-400 mb-8 leading-relaxed">
                     Wir sind im Herzen des <strong>Precision Clusters</strong> (Lengnau). 
                     Strategisch zwischen Grenchen, Biel und Solothurn gelegen, garantieren wir Reaktionszeiten, die für externe Anbieter unerreichbar sind.
                  </p>
                  
                  <div className="grid grid-cols-1 gap-6">
                     <div className="flex items-start gap-4">
                        <div className="shrink-0 pt-1">
                           <Timer size={20} className="text-safety" />
                        </div>
                        <div>
                           <strong className="text-white block text-sm mb-1 uppercase tracking-wide">Minimale Reaktionszeit</strong>
                           <span className="text-xs text-slate-500">Pikett-Einsatz in Grenchen/Biel in unter 30 Minuten.</span>
                        </div>
                     </div>
                     
                     <div className="flex items-start gap-4">
                        <div className="shrink-0 pt-1">
                           <Languages size={20} className="text-safety" />
                        </div>
                        <div>
                           <strong className="text-white block text-sm mb-1 uppercase tracking-wide">Bilinguale Kompetenz</strong>
                           <span className="text-xs text-slate-500">Wir sprechen Deutsch und Französisch. Keine Sprachbarrieren in Ihrer Produktion.</span>
                        </div>
                     </div>

                     <div className="flex items-start gap-4">
                        <div className="shrink-0 pt-1">
                           <FileCheck size={20} className="text-safety" />
                        </div>
                        <div>
                           <strong className="text-white block text-sm mb-1 uppercase tracking-wide">Schweizer Compliance</strong>
                           <span className="text-xs text-slate-500">
                             Arbeitssicherheit nach SUVA-Standards. Datenschutzkonform (nDSG) bei digitalen Rapporten.
                           </span>
                        </div>
                     </div>
                  </div>
               </div>
               
               {/* Visual Map Representation */}
               <div className="md:w-1/2 flex justify-center">
                  <div className="relative w-80 h-80 md:w-96 md:h-96 bg-slate-950 rounded-full border border-white/5 shadow-2xl flex items-center justify-center">
                     {/* Center Point */}
                     <div className="absolute flex flex-col items-center z-20">
                        <div className="w-4 h-4 bg-safety rounded-full shadow-[0_0_20px_#FF3300] animate-pulse"></div>
                        <span className="mt-2 bg-slate-900 px-2 py-1 text-[10px] font-bold text-white border border-safety">LENGNAU (HQ)</span>
                     </div>

                     {/* Satellites */}
                     <div className="absolute top-[20%] left-[20%] flex flex-col items-center">
                        <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                        <span className="mt-1 text-[9px] font-mono text-slate-500 uppercase">Grenchen</span>
                     </div>
                     <div className="absolute bottom-[20%] left-[30%] flex flex-col items-center">
                        <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                        <span className="mt-1 text-[9px] font-mono text-slate-500 uppercase">Biel/Bienne</span>
                     </div>
                     <div className="absolute top-[30%] right-[20%] flex flex-col items-center">
                        <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                        <span className="mt-1 text-[9px] font-mono text-slate-500 uppercase">Solothurn</span>
                     </div>

                     {/* Radar Sweep Effect */}
                     <div className="absolute inset-0 rounded-full border border-white/5 overflow-hidden">
                        <div className="w-full h-1/2 bg-gradient-to-t from-safety/10 to-transparent absolute top-0 origin-bottom animate-spin duration-[4s]"></div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
    </>
  );
};