'use client';

import React, { useState } from 'react';
import { Activity, TrendingUp, Users, Clock, Zap, Minus, Plus } from 'lucide-react';
import { Button } from './Button';
import { useSettings } from '../contexts/SettingsContext';

export const DowntimeCalculator: React.FC = () => {
  const { t, setInquiryDraft } = useSettings();

  const [machineRate, setMachineRate] = useState(300);
  const [employees, setEmployees] = useState(4);
  const [duration, setDuration] = useState(8);
  
  const EMPLOYEE_HOURLY_COST = 140;
  const RESTART_PENALTY = 500;
  
  const personnelCost = employees * EMPLOYEE_HOURLY_COST * duration;
  const machineLoss = machineRate * duration;
  const totalCost = personnelCost + machineLoss + RESTART_PENALTY;

  const getSeverity = () => {
    if (totalCost < 2000) return { color: 'text-emerald-500', bg: 'bg-emerald-500', label: t.calculator.severity.low };
    if (totalCost < 8000) return { color: 'text-orange-500', bg: 'bg-orange-500', label: t.calculator.severity.mid };
    return { color: 'text-safety', bg: 'bg-safety', label: t.calculator.severity.high };
  };

  const severity = getSeverity();
  const maintenanceMonths = Math.round(totalCost / 450);

  const handleConversion = () => {
    const message = `[RISIKOPROFIL]\nPotenzieller Schaden: CHF ${totalCost.toLocaleString('de-CH')}\nAusfall: ${duration}h, ${employees} MA, ${machineRate} CHF/h.`;
    setInquiryDraft(message);
    document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' });
  };

  const ControlButton = ({ onClick, icon: Icon }: { onClick: () => void, icon: any }) => (
    <button 
      onClick={onClick}
      className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded hover:bg-safety hover:text-white transition-all active:scale-90"
    >
      <Icon size={18} />
    </button>
  );

  return (
    <section className="py-20 md:py-32 bg-slate-50 dark:bg-slate-950 border-y border-slate-200 dark:border-white/5 relative overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          
          <div className="mb-12 md:mb-16 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-200/50 dark:bg-white/5 mb-6">
              <Activity size={14} className="text-safety" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">{t.calculator.badge}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4">
              {t.calculator.title}
            </h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 p-6 md:p-10 rounded-xl shadow-xl">
               <div className="space-y-10 md:space-y-12">
                 
                 {/* Duration */}
                 <div>
                   <div className="flex justify-between items-center mb-3">
                      <label className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-500">
                        <Clock size={14} /> {t.calculator.inputs.duration}
                      </label>
                      <span className="font-mono font-bold text-slate-900 dark:text-white">{duration} h</span>
                   </div>
                   <div className="flex items-center gap-3">
                      <ControlButton icon={Minus} onClick={() => setDuration(Math.max(1, duration - 1))} />
                      <input type="range" min="1" max="48" step="1" value={duration} onChange={e => setDuration(Number(e.target.value))} className="flex-grow" />
                      <ControlButton icon={Plus} onClick={() => setDuration(Math.min(48, duration + 1))} />
                   </div>
                 </div>

                 {/* Machine Rate */}
                 <div>
                   <div className="flex justify-between items-center mb-3">
                      <label className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-500">
                        <Zap size={14} /> {t.calculator.inputs.rate}
                      </label>
                      <span className="font-mono font-bold text-slate-900 dark:text-white">{machineRate} CHF</span>
                   </div>
                   <div className="flex items-center gap-3">
                      <ControlButton icon={Minus} onClick={() => setMachineRate(Math.max(100, machineRate - 50))} />
                      <input type="range" min="100" max="1000" step="50" value={machineRate} onChange={e => setMachineRate(Number(e.target.value))} className="flex-grow" />
                      <ControlButton icon={Plus} onClick={() => setMachineRate(Math.min(1000, machineRate + 50))} />
                   </div>
                 </div>

                 {/* Employees */}
                 <div>
                   <div className="flex justify-between items-center mb-3">
                      <label className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-500">
                        <Users size={14} /> {t.calculator.inputs.employees}
                      </label>
                      <span className="font-mono font-bold text-slate-900 dark:text-white">{employees}</span>
                   </div>
                   <div className="flex items-center gap-3">
                      <ControlButton icon={Minus} onClick={() => setEmployees(Math.max(0, employees - 1))} />
                      <input type="range" min="0" max="20" step="1" value={employees} onChange={e => setEmployees(Number(e.target.value))} className="flex-grow" />
                      <ControlButton icon={Plus} onClick={() => setEmployees(Math.min(20, employees + 1))} />
                   </div>
                 </div>

               </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-slate-900 text-white p-6 md:p-10 rounded-xl shadow-2xl relative border border-white/10 overflow-hidden">
                 <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.calculator.results.risk}</span>
                       <div className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest ${severity.bg} text-white animate-pulse`}>
                          {severity.label}
                       </div>
                    </div>
                    <div className="text-4xl md:text-5xl font-black font-mono mb-8">
                       CHF {totalCost.toLocaleString('de-CH')}
                    </div>
                    <Button fullWidth onClick={handleConversion}>
                       {t.calculator.results.cta}
                    </Button>
                 </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-white/5 flex gap-4">
                 <TrendingUp size={24} className="text-emerald-500 shrink-0" />
                 <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic">
                   {t.calculator.results.roi_desc(maintenanceMonths)}
                 </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};