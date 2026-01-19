import React from 'react';
import { Map, ArrowRight } from 'lucide-react';
import { Button } from './Button';

export const Hero: React.FC = () => {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="relative pt-24 pb-32 overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-slate-900/50 to-transparent"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-20">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="lg:w-3/5">
            <div className="inline-flex items-center gap-3 border border-safety/30 bg-safety/5 px-3 py-1 mb-8 backdrop-blur-sm">
               <Map size={14} className="text-safety animate-pulse" />
               <span className="text-safety font-mono text-[10px] font-bold uppercase tracking-widest">
                 CLUSTER JURASÜDFUSS: GRENCHEN-BIEL
               </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white leading-[0.95] mb-8 tracking-tighter">
              SCHWEIZER PRÄZISION <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-400 to-slate-600">FÜR IHRE PRODUKTION.</span>
            </h1>
            
            <p className="text-lg text-slate-400 mb-10 max-w-xl leading-relaxed pl-6 border-l-2 border-safety font-light">
              Ihr strategischer Partner für Instandhaltung, Retrofit und Notfall-Support. Spezialisiert auf <strong>Uhrenindustrie, Medtech, Maschinenbau, Lebensmitteltechnik und Giessereien</strong>. Lokal verankert in der Region Grenchen-Biel-Solothurn.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={() => scrollTo('kontakt')}>
                 System-Audit Starten
              </Button>
              <div className="flex items-center gap-4 px-6 text-xs font-mono text-slate-500">
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="font-bold text-white"><span className="text-safety">&lt; 30 MIN</span> Anfahrt</span>
                 </div>
              </div>
            </div>
          </div>

          {/* Abstract Dashboard Visual */}
          <div className="lg:w-2/5 w-full hidden lg:block">
             <div className="bg-slate-900/80 border border-white/10 p-6 backdrop-blur-sm relative shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-safety via-transparent to-transparent"></div>
                
                {/* Status Header */}
                <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                   <span className="font-mono text-xs text-slate-500 uppercase">Flotten-Status</span>
                   <div className="flex items-center gap-2">
                     <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                     <span className="font-mono text-xs text-emerald-500 font-bold">READY TO DEPLOY</span>
                   </div>
                </div>

                {/* Logistics Stats */}
                <div className="space-y-6">
                   {[
                     { city: 'Grenchen', time: '08 MIN', progress: '90%' },
                     { city: 'Biel/Bienne', time: '15 MIN', progress: '80%' },
                     { city: 'Solothurn', time: '12 MIN', progress: '85%' }
                   ].map((item) => (
                     <div key={item.city}>
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-white font-bold">{item.city}</span>
                          <span className="text-sm font-mono text-safety">{item.time}</span>
                       </div>
                       <div className="w-full h-1 bg-slate-800 overflow-hidden relative">
                          <div className="h-full bg-safety absolute top-0 left-0" style={{width: item.progress}}></div>
                       </div>
                     </div>
                   ))}
                </div>

                {/* Active Ticket Simulation */}
                <div className="mt-8 p-4 bg-slate-950 border border-white/5 rounded">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-safety/20 text-safety p-1 rounded">
                      <ArrowRight size={12} />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Letzter Einsatz</span>
                  </div>
                  <div className="text-xs font-bold text-white">Spindel-Austausch Tornos EvoDec</div>
                  <div className="text-[10px] text-slate-500 mt-1">Lengnau • Vor 42 Minuten</div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};