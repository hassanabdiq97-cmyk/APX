'use client';

import React, { useState } from 'react';
import { Activity, TrendingUp, Users, Clock, Zap, Minus, Plus, AlertCircle } from 'lucide-react';
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
    const message = `[MOBILE RISK ANALYSIS]\nEstimated Damage: CHF ${totalCost.toLocaleString('de-CH')}\nDowntime: ${duration}h\nStaff: ${employees}\nRate: ${machineRate} CHF/h.`;
    setInquiryDraft(message);
    document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' });
  };

  const ControlButton = ({ onClick, icon: Icon, disabled }: { onClick: () => void, icon: any, disabled?: boolean }) => (
    <button 
      onClick={onClick}
      disabled={disabled}
      className="w-14 h-14 flex items-center justify-center bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-sm hover:bg-safety hover:text-white active:scale-90 transition-all disabled:opacity-10 touch-card"
    >
      <Icon size={22} />
    </button>
  );

  return (
    <section id="calculator" className="py-24 md:py-32 bg-slate-50 dark:bg-slate-950 border-y border-slate-200 dark:border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          
          <div className="mb-16 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded bg-slate-200/50 dark:bg-white/5 mb-6">
              <Activity size={16} className="text-cyan-apex" />
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">{t.calculator.badge}</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-[0.9]">
              {t.calculator.title}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl text-lg font-light">
              {t.calculator.description}
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-7 space-y-8">
               <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 p-8 md:p-12 rounded-sm shadow-xl">
                  <div className="space-y-12">
                    
                    {/* Duration Input */}
                    <div>
                      <div className="flex justify-between items-center mb-6">
                         <label className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-slate-500">
                           <Clock size={16} className="text-cyan-apex" /> {t.calculator.inputs.duration}
                         </label>
                         <span className="font-mono font-black text-slate-900 dark:text-white text-2xl text-glow-cyan/20">{duration} H</span>
                      </div>
                      <div className="flex items-center gap-5">
                         <ControlButton icon={Minus} onClick={() => setDuration(Math.max(1, duration - 1))} disabled={duration <= 1} />
                         <input type="range" min="1" max="48" step="1" value={duration} onChange={e => setDuration(Number(e.target.value))} className="flex-grow" />
                         <ControlButton icon={Plus} onClick={() => setDuration(Math.min(48, duration + 1))} disabled={duration >= 48} />
                      </div>
                    </div>

                    {/* Rate Input */}
                    <div>
                      <div className="flex justify-between items-center mb-6">
                         <label className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-slate-500">
                           <Zap size={16} className="text-cyan-apex" /> {t.calculator.inputs.rate}
                         </label>
                         <span className="font-mono font-black text-slate-900 dark:text-white text-2xl text-glow-cyan/20">{machineRate} CHF/H</span>
                      </div>
                      <div className="flex items-center gap-5">
                         <ControlButton icon={Minus} onClick={() => setMachineRate(Math.max(50, machineRate - 50))} disabled={machineRate <= 50} />
                         <input type="range" min="50" max="1500" step="50" value={machineRate} onChange={e => setMachineRate(Number(e.target.value))} className="flex-grow" />
                         <ControlButton icon={Plus} onClick={() => setMachineRate(Math.min(1500, machineRate + 50))} disabled={machineRate >= 1500} />
                      </div>
                    </div>

                    {/* Personnel Input */}
                    <div>
                      <div className="flex justify-between items-center mb-6">
                         <label className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-slate-500">
                           <Users size={16} className="text-cyan-apex" /> {t.calculator.inputs.employees}
                         </label>
                         <span className="font-mono font-black text-slate-900 dark:text-white text-2xl text-glow-cyan/20">{employees} PERS.</span>
                      </div>
                      <div className="flex items-center gap-5">
                         <ControlButton icon={Minus} onClick={() => setEmployees(Math.max(0, employees - 1))} disabled={employees <= 0} />
                         <input type="range" min="0" max="50" step="1" value={employees} onChange={e => setEmployees(Number(e.target.value))} className="flex-grow" />
                         <ControlButton icon={Plus} onClick={() => setEmployees(Math.min(50, employees + 1))} disabled={employees >= 50} />
                      </div>
                    </div>
                  </div>
               </div>
               
               {/* Informational Panel */}
               <div className="bg-emerald-500/5 p-6 rounded-sm border border-emerald-500/10 flex gap-6 items-center group">
                  <div className="p-4 bg-emerald-500/10 rounded-full shrink-0 group-hover:scale-110 transition-transform">
                     <TrendingUp size={28} className="text-emerald-500" />
                  </div>
                  <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-mono italic">
                    {t.calculator.results.roi_desc(maintenanceMonths)}
                  </p>
               </div>
            </div>

            <div className="lg:col-span-5 sticky top-28">
              {/* Summary Result Panel */}
              <div className="bg-slate-900 text-white p-10 rounded-sm shadow-3xl relative border-t-4 border-safety overflow-hidden group">
                 {/* Cyan Glow Layer */}
                 <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-apex/10 blur-[100px] rounded-full group-hover:bg-cyan-apex/20 transition-all duration-1000"></div>
                 
                 <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8">
                       <span className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">{t.calculator.results.risk}</span>
                       <div className={`px-4 py-1.5 rounded-sm text-[11px] font-black uppercase tracking-widest ${severity.bg} text-white animate-pulse shadow-lg`}>
                          {severity.label}
                       </div>
                    </div>
                    
                    <div className="text-5xl md:text-7xl font-black font-mono mb-10 tracking-tighter text-glow-cyan">
                       <span className="text-slate-500 text-2xl block mb-2">CHF</span>
                       {totalCost.toLocaleString('de-CH')}
                    </div>

                    <div className="space-y-4 mb-10 border-y border-white/5 py-8">
                       <div className="flex justify-between text-xs font-mono uppercase tracking-widest text-slate-400">
                          <span>Production Loss</span>
                          <span className="text-white">CHF {machineLoss.toLocaleString('de-CH')}</span>
                       </div>
                       <div className="flex justify-between text-xs font-mono uppercase tracking-widest text-slate-400">
                          <span>Staff Costs</span>
                          <span className="text-white">CHF {personnelCost.toLocaleString('de-CH')}</span>
                       </div>
                       <div className="flex justify-between text-xs font-mono uppercase tracking-widest text-slate-400">
                          <span>Re-start Penalty</span>
                          <span className="text-white">CHF {RESTART_PENALTY}</span>
                       </div>
                    </div>

                    <Button fullWidth size="lg" onClick={handleConversion} className="py-6 text-base group">
                       <AlertCircle size={20} className="mr-3 group-hover:rotate-12 transition-transform" />
                       {t.calculator.results.cta}
                    </Button>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};