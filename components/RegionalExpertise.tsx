import React from 'react';
import { Timer, Package, MapPin, Watch, Microscope, Cog, UtensilsCrossed, Factory, Gauge } from 'lucide-react';
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
                  <SectionHeader title="Operational Radius" subtitle="Standortvorteil" alignment="left" />
                  <h3 className="text-2xl font-bold text-white mb-6">WARUM UNSERE NÄHE IHR GEWINN IST.</h3>
                  <p className="text-slate-400 mb-8 leading-relaxed">
                     Wir sitzen nicht in Zürich oder Genf. Wir sind direkt im <strong>Precision Cluster</strong> in Lengnau. 
                     Diese strategische Lage zwischen Grenchen, Biel und Solothurn ermöglicht uns Reaktionszeiten, die für Konkurrenten unerreichbar sind.
                  </p>
                  <ul className="space-y-6">
                     <li className="flex items-start gap-4 p-4 bg-slate-950 border border-white/5 rounded hover:border-safety/30 transition-colors">
                        <div className="shrink-0">
                           <Timer size={20} className="text-safety" />
                        </div>
                        <div>
                           <strong className="text-white block text-sm mb-1 uppercase tracking-wide">Minimale Reaktionszeit</strong>
                           <span className="text-xs text-slate-500">Pikett-Einsatz in Grenchen/Biel in unter 30 Minuten garantiert.</span>
                        </div>
                     </li>
                     <li className="flex items-start gap-4 p-4 bg-slate-950 border border-white/5 rounded hover:border-safety/30 transition-colors">
                        <div className="shrink-0">
                           <Package size={20} className="text-safety" />
                        </div>
                        <div>
                           <strong className="text-white block text-sm mb-1 uppercase tracking-wide">Lokales Ersatzteillager</strong>
                           <span className="text-xs text-slate-500">Kritische Komponenten lagern wir zentral. Kein Zoll, keine Wartezeit.</span>
                        </div>
                     </li>
                  </ul>
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
                        <span className="mt-1 text-[9px] font-mono text-slate-500 uppercase">Biel</span>
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

      {/* Industries / Branchen */}
      <section id="branchen" className="py-24 bg-slate-950 relative">
        <div className="container mx-auto px-4 md:px-6">
           <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-start">
              <div className="sticky top-24">
                 <SectionHeader title="Industry Focus" subtitle="Spezialisierung" alignment="left" />
                 <p className="text-slate-400 mb-8 leading-relaxed">
                    Wir konzentrieren uns ausschliesslich auf Branchen, in denen Präzision und Verfügbarkeit keine Option, sondern Pflicht ist.
                 </p>
                 
                 {/* Visual Abstract */}
                 <div className="aspect-video bg-slate-900 border border-white/5 relative p-8 flex flex-col justify-between overflow-hidden mt-12">
                    <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
                    <div className="relative z-10">
                       <div className="text-[10px] font-mono text-safety mb-2">PRECISION LEVEL</div>
                       <div className="text-4xl font-black text-white mb-1">µ-Bereich</div>
                       <div className="text-sm text-slate-500">Standard Toleranz</div>
                    </div>
                    <div className="relative z-10 text-right">
                       <div className="text-4xl font-black text-white mb-1">100%</div>
                       <div className="text-sm text-slate-500">Audit-Konformität</div>
                    </div>
                 </div>
              </div>

              <div className="space-y-4">
                 {[
                    { icon: Watch, title: 'Horlogerie', text: 'Wartung von Mikrobearbeitungszentren. Umgang mit kleinsten Toleranzen und empfindlichen Materialien (Gold, Platin).' },
                    { icon: Microscope, title: 'Medtech & Pharma', text: 'Validierte Instandhaltung nach GMP. Sauberraum-Protokolle und lückenlose Dokumentation für Ihre Audits.' },
                    { icon: Cog, title: 'Maschinenindustrie', text: 'Unterhalt von Produktionsstrassen. Retrofit von älteren SPS-Steuerungen und Antriebstechnik.' },
                    { icon: UtensilsCrossed, title: 'Lebensmittelindustrie', text: 'Hygienic Design Compliance. Wartung unter Einhaltung strenger Hygienevorschriften (HACCP).' },
                    { icon: Gauge, title: 'Präzisionsmechanik', text: 'Unterhalt von CNC-Dreh- und Fräszentren. Geometrische Überprüfung und Spindel-Service.' },
                    { icon: Factory, title: 'Giessereien', text: 'Wartung unter Extrembedingungen. Hydraulik-Service und Revision von Druckgussmaschinen.' },
                 ].map((item, i) => (
                    <div key={i} className="group p-6 bg-slate-900 border border-white/5 hover:border-safety transition-all duration-300">
                       <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-3">
                          <item.icon size={20} className="text-slate-500 group-hover:text-safety transition-colors" /> 
                          {item.title}
                       </h3>
                       <p className="text-sm text-slate-400 leading-relaxed">
                          {item.text}
                       </p>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </section>
    </>
  );
};