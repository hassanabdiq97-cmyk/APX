
import React from 'react';
import { CNCMachineMonitor } from '../components/CNCMachineMonitor';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function Page() {
  return (
    <main className="min-h-screen bg-apex-bg relative flex flex-col justify-center overflow-hidden selection:bg-safety selection:text-white">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-safety/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center pt-20 pb-20">
        
        {/* Left: Text Content */}
        <div className="text-left space-y-8">
          <div className="inline-flex items-center gap-2 border border-safety/30 bg-safety/5 px-3 py-1 rounded-sm">
            <div className="w-2 h-2 bg-safety rounded-full animate-pulse shadow-[0_0_8px_#FF3300]" />
            <span className="text-xs font-mono text-safety uppercase tracking-widest">
              Live aus Lengnau HQ
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.9]">
            SCHWEIZER <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">PRÄZISION</span> <br />
            <span className="text-safety drop-shadow-[0_0_20px_rgba(255,51,0,0.5)]">BESCHÜTZEN.</span>
          </h1>

          <p className="text-lg text-gray-400 font-light max-w-xl leading-relaxed">
            Instandhaltung für die Uhrenindustrie und Medizintechnik. 
            Wir minimieren Ausfallzeiten in der Region <span className="text-white font-medium">Biel-Grenchen-Solothurn</span> durch prädiktive Wartung und 24/7 Pikett.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="group relative bg-safety text-white px-8 py-4 font-bold uppercase tracking-wider text-sm overflow-hidden rounded-sm hover:bg-white hover:text-safety transition-colors duration-300">
               <span className="relative z-10 flex items-center">
                 Expertise Anfordern <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </span>
            </button>
            
            <button className="flex items-center justify-center gap-2 px-8 py-4 border border-white/10 text-white font-mono text-sm uppercase tracking-wider hover:bg-white/5 transition-colors rounded-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              SUVA Konform
            </button>
          </div>
        </div>

        {/* Right: The CNC Simulator */}
        <div className="w-full perspective-1000">
          <CNCMachineMonitor />
        </div>

      </div>

      {/* Bottom Ticker */}
      <div className="absolute bottom-0 w-full border-t border-white/5 bg-black/50 py-3 overflow-hidden">
         <div className="flex whitespace-nowrap gap-12 text-xs font-mono text-gray-600 uppercase tracking-[0.2em] animate-marquee">
            <span>+++ System Status: Operational +++</span>
            <span>Tornos Support Active</span>
            <span>Bumotec Diagnostics Ready</span>
            <span>Willemin-Macodel Maintenance Standby</span>
            <span>+++ System Status: Operational +++</span>
         </div>
      </div>
      
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .clip-triangle { clip-path: polygon(50% 100%, 0 0, 100% 0); }
        .animate-marquee { animation: marquee 30s linear infinite; }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </main>
  );
}
