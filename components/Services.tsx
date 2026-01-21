'use client';

import React, { useState } from 'react';
import { FileText, Watch, Cpu, AlertTriangle, Settings, ArrowRight, ShieldCheck } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { Modal } from './Modal';
import { Button } from './Button';
import { useSettings } from '../contexts/SettingsContext';

// Map icons to IDs since we can't store functions in JSON translation files easily
const iconMap: Record<string, any> = {
  '1': ShieldCheck,
  '2': Watch,
  '3': Cpu,
  '4': FileText,
  '5': AlertTriangle,
  '6': Settings
};

export const Services: React.FC = () => {
  const { t } = useSettings();
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  const selectedService = selectedServiceId ? t.services.items.find(s => s.id === selectedServiceId) : null;
  const SelectedIcon = selectedService ? iconMap[selectedService.id] : null;

  return (
    <>
      <section id="leistungen" className="py-32 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 relative border-t border-slate-200 dark:border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeader title={t.services.title} subtitle={t.services.subtitle} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.services.items.map((service) => {
              const Icon = iconMap[service.id];
              return (
                <div 
                  key={service.id} 
                  className="group relative bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 p-8 hover:border-safety/50 dark:hover:border-white/20 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col rounded-sm"
                  onClick={() => setSelectedServiceId(service.id)}
                >
                    {/* Technical Corner Markers on Hover */}
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-safety opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-safety opacity-0 group-hover:opacity-100 transition-opacity"></div>

                    <div className="mb-8 flex justify-between items-start">
                      <div className="p-3 bg-slate-100 dark:bg-white/5 rounded-sm border border-slate-200 dark:border-white/5 text-slate-500 dark:text-slate-300 group-hover:text-safety group-hover:border-safety/30 transition-colors">
                        <Icon size={24} strokeWidth={1.5} />
                      </div>
                      <ArrowRight size={16} className="text-slate-400 group-hover:text-safety dark:group-hover:text-white -translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-safety transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 flex-grow font-light">
                      {service.description}
                    </p>
                    
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors border-t border-slate-100 dark:border-white/5 pt-4 group-hover:border-safety/30">
                      {t.services.more}
                    </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Modal 
        isOpen={!!selectedService} 
        onClose={() => setSelectedServiceId(null)} 
        title={selectedService?.title || ''}
      >
        {selectedService && SelectedIcon && (
          <div className="space-y-8">
            <div className="flex items-start gap-6">
               <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-sm border border-slate-200 dark:border-white/10 shrink-0">
                  <SelectedIcon size={32} className="text-safety" />
               </div>
               <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{t.services.modal_title}</h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {selectedService.description}
                  </p>
               </div>
            </div>

            {selectedService.details && (
              <div className="bg-slate-50 dark:bg-white/5 p-6 rounded-sm border border-slate-200 dark:border-white/5">
                 <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
                   {t.services.modal_features}
                 </h4>
                 <ul className="grid gap-3">
                    {selectedService.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                         <div className="w-1.5 h-1.5 bg-safety rounded-full"></div>
                         <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">{detail}</span>
                      </li>
                    ))}
                 </ul>
              </div>
            )}

            <div className="pt-4 flex justify-end">
              <Button onClick={() => {
                setSelectedServiceId(null);
                document.getElementById('kontakt')?.scrollIntoView({behavior: 'smooth'});
              }}>
                {t.services.modal_cta}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};