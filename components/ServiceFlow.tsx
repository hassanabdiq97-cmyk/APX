import React from 'react';
import { Phone, Search, Wrench, CheckCircle2 } from 'lucide-react';
import { SectionHeader } from './SectionHeader';

export const ServiceFlow: React.FC = () => {
  const steps = [
    {
      icon: Phone,
      title: "1. Meldung",
      desc: "Sie melden die Störung (Tel/Online). Unser Dispatcher priorisiert sofort nach Dringlichkeit."
    },
    {
      icon: Search,
      title: "2. Diagnose",
      desc: "Remote-Erstanalyse oder Vor-Ort-Check. Wir identifizieren das Problem und beschaffen Teile."
    },
    {
      icon: Wrench,
      title: "3. Lösung",
      desc: "Fachgerechte Reparatur, Testlauf und digitale Dokumentation für Ihre Unterlagen."
    }
  ];

  return (
    <section className="py-24 bg-slate-950 relative border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader title="Service Ablauf" subtitle="Simpel & Effizient" />
        
        <div className="grid md:grid-cols-3 gap-8 relative">
           {/* Connector Line (Desktop) */}
           <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[2px] bg-slate-800 z-0"></div>

           {steps.map((step, i) => (
             <div key={i} className="relative z-10 flex flex-col items-center text-center group">
               <div className="w-24 h-24 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center mb-6 group-hover:border-safety group-hover:text-safety transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                 <step.icon size={32} />
               </div>
               <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
               <p className="text-sm text-slate-400 max-w-xs leading-relaxed">{step.desc}</p>
             </div>
           ))}
        </div>

        <div className="mt-16 text-center">
           <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <CheckCircle2 size={16} className="text-emerald-500" />
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Digitale Rapporte sofort verfügbar</span>
           </div>
        </div>
      </div>
    </section>
  );
};