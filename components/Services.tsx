'use client';

import React, { useState } from 'react';
import { FileText, Watch, Cpu, AlertTriangle, Settings, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { ServiceItem } from '../types';
import { Modal } from './Modal';
import { Button } from './Button';

const servicesList: ServiceItem[] = [
  {
    id: '1',
    title: 'Wartungsverträge (Proaktiv)',
    description: 'Verhindern Sie Ausfälle, bevor sie passieren. Geplante Stillstände statt Notfall-Chaos. Inklusive Service-Level-Agreement (SLA).',
    icon: ShieldCheck,
    details: [
      'Individuelle SLA-Level (Bronze, Silber, Gold) für garantierte Reaktionszeiten.',
      'Jährliche präventive Inspektion inklusive geometrischer Laser-Vermessung.',
      'Priorisierter Zugriff auf unser lokales Ersatzteillager in Grenchen.',
      'Bis zu 20% Rabatt auf Stundenansätze bei zusätzlichen Interventionen.',
      'Zugriff auf digitales Maschinen-Logbuch und Wartungshistorie.'
    ]
  },
  {
    id: '2',
    title: 'Mikromechanik & CNC',
    description: 'Spezialisierter Support für Uhrenindustrie-Anlagen (Tornos, Bumotec, Willemin). Höchste Präzision bei Spindel- und Geometrie-Service.',
    icon: Watch,
    details: [
      'Spezialisiert auf Langdrehautomaten und 5-Achs-Bearbeitungszentren.',
      'Tiefes Know-how für Tornos (EvoDec, SwissNano), Bumotec und Willemin-Macodel.',
      'Geometrie-Korrektur im µ-Bereich mittels Laser-Interferometer.',
      'Optimierung von CNC-Parametern für Zykluszeit-Reduktion.',
      'Schulung Ihres Bedienpersonals für First-Level-Maintenance.'
    ]
  },
  {
    id: '3',
    title: 'Retrofit & Modernisierung',
    description: 'Machen Sie alte Anlagen bereit für Industrie 4.0. Kosteneffiziente Alternative zum Neukauf durch Steuerungs-Upgrades.',
    icon: Cpu,
    details: [
      'Austausch veralteter Steuerungen (Fanuc, Siemens, Heidenhain).',
      'Integration von IoT-Gateways zur Maschinendatenerfassung (MDE).',
      'Antriebs-Upgrade für höhere Dynamik und Energieeffizienz.',
      'Sicherheits-Update nach aktuellen SUVA/CE-Richtlinien.',
      'Verlängerung der Maschinen-Lebensdauer um 10-15 Jahre.'
    ]
  },
  {
    id: '4',
    title: 'Validierte Instandhaltung',
    description: 'Für Medtech & Pharma: GMP-konforme Dokumentation. Wir liefern den "Paper Trail" für Ihre Audits direkt mit.',
    icon: FileText,
    details: [
      'Lückenlose Dokumentation gemäss GMP und ISO 13485 Standards.',
      'Kalibrier-Zertifikate für alle eingesetzten Messmittel.',
      'Validierungs-Unterstützung (IQ/OQ/PQ) nach Reparaturen.',
      'Reinraum-taugliches Equipment und geschultes Personal (ISO Klasse 7/8).',
      'Audit-Support: Wir stehen bei Ihren Kundenaudits Rede und Antwort.'
    ]
  },
  {
    id: '5',
    title: '24/7 Notfall-Pikett',
    description: 'Garantierte Interventionszeiten im Raum Jurasüdfuss. Wenn es brennt, sind wir in <30 Min im Auto.',
    icon: AlertTriangle,
    details: [
      '365 Tage / 24 Stunden Erreichbarkeit über exklusive Pikett-Nummer.',
      'Garantierte Reaktionszeit (Antritt) von < 2 Stunden im Espace Mittelland.',
      'Keine Callcenter: Sie sprechen direkt mit einem Techniker.',
      'Ersatzteil-Express: Zugriff auf kritisches Lager auch nachts und am Wochenende.',
      'Transparente Pikett-Pauschalen ohne versteckte Kosten.'
    ]
  },
  {
    id: '6',
    title: 'Spindel-Logistik',
    description: 'Lokales Austauschlager für Hochfrequenzspindeln. Kein Versand ins Ausland, kein Zoll-Warten. Plug & Play.',
    icon: Settings,
    details: [
      'Austausch-Pool für gängige Motorspindeln (Fischer, Kessler, IBAG).',
      'Express-Einbau und Einlauf-Routine vor Ort.',
      'Schwingungsanalyse nach Einbau zur Qualitätssicherung.',
      'Spindel-Revision in Partner-Werkstatt in der Schweiz (kein Export nötig).',
      'Leihspindeln zur Überbrückung der Revisionszeit.'
    ]
  }
];

export const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const handleOpenDetails = (service: ServiceItem) => {
    setSelectedService(service);
  };

  const handleCloseDetails = () => {
    setSelectedService(null);
  };

  return (
    <>
      <section id="leistungen" className="py-32 bg-slate-100 dark:bg-slate-900 relative border-t border-slate-200 dark:border-white/5 transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeader title="Leistungs-Spektrum" subtitle="Von Reaktiv zu Proaktiv" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 dark:bg-white/10 border border-slate-200 dark:border-white/10 shadow-2xl">
            {servicesList.map((service, index) => (
              <div 
                key={service.id} 
                className="bg-white dark:bg-slate-950 p-10 group hover:bg-slate-50 dark:hover:bg-slate-900 transition-all duration-500 relative overflow-hidden cursor-pointer"
                onClick={() => handleOpenDetails(service)}
              >
                  {/* Hover Glow */}
                  <div className="absolute inset-0 bg-radial-highlight opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 mb-8 group-hover:text-safety group-hover:border-safety transition-all duration-300">
                      <service.icon size={24} strokeWidth={1.5} />
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-safety transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-8 border-l border-slate-300 dark:border-slate-800 pl-4 group-hover:border-safety/30 transition-colors">
                      {service.description}
                    </p>
                    
                    <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-600 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                      Details ansehen <ArrowRight size={12} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      <Modal 
        isOpen={!!selectedService} 
        onClose={handleCloseDetails} 
        title={selectedService?.title || ''}
      >
        {selectedService && (
          <div className="space-y-8">
            <div className="flex items-start gap-6">
               <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-sm border border-slate-200 dark:border-white/10 shrink-0">
                  <selectedService.icon size={32} className="text-safety" />
               </div>
               <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Service Übersicht</h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {selectedService.description}
                  </p>
               </div>
            </div>

            {selectedService.details && (
              <div>
                 <h4 className="text-sm font-bold text-slate-500 dark:text-slate-500 uppercase tracking-widest mb-4 border-b border-slate-200 dark:border-white/10 pb-2">
                   Leistungs-Details
                 </h4>
                 <ul className="space-y-4">
                    {selectedService.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                         <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                         <span className="text-slate-700 dark:text-slate-300 text-sm">{detail}</span>
                      </li>
                    ))}
                 </ul>
              </div>
            )}

            <div className="pt-4 flex justify-end">
              <Button onClick={() => {
                handleCloseDetails();
                document.getElementById('kontakt')?.scrollIntoView({behavior: 'smooth'});
              }}>
                Unverbindliche Offerte anfragen
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};