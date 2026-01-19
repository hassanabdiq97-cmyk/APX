import React from 'react';
import { FileText, Watch, Cpu, AlertTriangle, Settings, Package, ArrowRight } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { ServiceItem } from '../types';

const servicesList: ServiceItem[] = [
  {
    id: '1',
    title: 'Validierte Instandhaltung',
    description: 'Für Medtech & Pharma: Dokumentation nach GMP/ISO-Standards. Reinraum-kompatibles Arbeiten und lückenlose Audit-Trails.',
    icon: FileText
  },
  {
    id: '2',
    title: 'Mikromechanik & CNC',
    description: 'Spezialisierter Support für Uhrenindustrie-Anlagen (Tornos, Bumotec, Willemin). Höchste Präzision bei Spindel- und Geometrie-Service.',
    icon: Watch
  },
  {
    id: '3',
    title: 'Retrofit & Digitalisierung',
    description: 'Verlängerung des Lebenszyklus durch Steuerungs-Upgrades und IoT-Integration. Machen Sie alte Anlagen bereit für Industrie 4.0.',
    icon: Cpu
  },
  {
    id: '4',
    title: '24/7 Notfall-Pikett',
    description: 'Garantierte Interventionszeiten für Vertragskunden im Raum Jurasüdfuss. Minimierung von unbegründeten Stillständen.',
    icon: AlertTriangle
  },
  {
    id: '5',
    title: 'Spindel-Service Express',
    description: 'Lokales Austauschlager für Hochfrequenzspindeln. Logistik und Einbau aus einer Hand für minimale Rüstzeiten.',
    icon: Settings
  },
  {
    id: '6',
    title: 'Werks-Verlagerungen',
    description: 'Präzise De- und Remontage ganzer Produktionslinien inklusive Neu-Nivellierung und geometrischer Abnahme.',
    icon: Package
  }
];

export const Services: React.FC = () => {
  return (
    <section id="leistungen" className="py-32 bg-slate-900 relative border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader title="Core Competencies" subtitle="Leistungs-Triade" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10 shadow-2xl">
          {servicesList.map((service, index) => (
             <div key={service.id} className="bg-slate-950 p-10 group hover:bg-slate-900 transition-all duration-500 relative overflow-hidden">
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-radial-highlight opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <div className="relative z-10">
                  <div className="w-12 h-12 bg-slate-900 border border-white/10 flex items-center justify-center text-slate-500 mb-8 group-hover:text-safety group-hover:border-safety transition-all duration-300">
                     <service.icon size={24} strokeWidth={1.5} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-safety transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-sm text-slate-400 leading-relaxed mb-8 border-l border-slate-800 pl-4 group-hover:border-safety/30 transition-colors">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-slate-600 group-hover:text-white transition-colors cursor-pointer">
                     Mehr Erfahren <ArrowRight size={12} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
};