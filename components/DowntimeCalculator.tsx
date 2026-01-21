'use client';

import React, { useState } from 'react';
import { Activity, TrendingUp, Users, Clock, Zap, Minus, Plus } from 'lucide-react';
import { Button } from './Button';
import { useSettings } from '../contexts/SettingsContext';

export const DowntimeCalculator: React.FC = () => {
  const { t, setInquiryDraft } = useSettings();

  // Industrial Defaults
  const [machineRate, setMachineRate] = useState(300); // CHF/h (High-end CNC)
  const [employees, setEmployees] = useState(4);
  const [duration, setDuration] = useState(8); // One shift
  
  // Calculations
  const EMPLOYEE_HOURLY_COST = 140; // Fully loaded cost (CHF)
  const RESTART_PENALTY = 500; // Fixed cost for setup/scrap after crash
  
  const personnelCost = employees * EMPLOYEE_HOURLY_COST * duration;
  const machineLoss = machineRate * duration;
  const totalCost = personnelCost + machineLoss + RESTART_PENALTY;

  // Dynamic Severity Visuals
  const getSeverity = () => {
    if (totalCost < 2000) return { color: 'text-emerald-500', bg: 'bg-emerald-500', label: t.calculator.severity.low };
    if (totalCost < 8000) return { color: 'text-orange-500', bg: 'bg-orange-500', label: t.calculator.severity.mid };
    return { color: 'text-safety', bg: 'bg-safety', label: t.calculator.severity.high };
  };

  const severity = getSeverity();
  const maintenanceMonths = Math.round(totalCost / 450); // Assume 450 CHF/month base contract

  // Lead Gen Hook
  const handleConversion = () => {
    const message = `[AUTO-GENERATED RISK ANALYSIS]\nPotenzieller Ausfallschaden: CHF ${totalCost.toLocaleString('de-CH')}\nSzenario: ${duration}h Stillstand, ${employees} MA, Rate ${machineRate} CHF/h.\nBitte um Beratung zur Risikominimierung.`;
    setInquiryDraft(message);
    document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Helper for gradient background (The "Fill" Effect)
  const getSliderStyle = (value: number, min: number, max: number) => {
    const percent = ((value - min) / (max - min)) * 100;
    return {
      background: `linear-gradient(to right, #FF3300 0%, #FF3300 ${percent}%, #1e293b ${percent}%, #1e293b 100%)`,
      backgroundSize: '100% 12px',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      borderRadius: '4px'
    };
  };

  // Helper for controls
  const ControlButton = ({ onClick, icon: Icon }: { onClick: () => void, icon: any }) => (
    <button 
      onClick={onClick}
      className="w-12 h-12 flex items-center justify-center bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-safety hover:text-white hover:border-safety transition-all active:scale-95 shadow-sm text-slate-500 dark:text-slate-400 group"
      aria-label="Wert ändern"
    >
      <Icon size={20} className="group-hover:scale-110 transition-transform" />
    </button>
  );

  return (
    <section className="py-32 bg-slate-50 dark:bg-slate-950 border-y border-slate-200 dark:border-white/5 relative overflow-hidden transition-colors duration-300">
      
      {/* Background Tech Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-slate-200 dark:bg-slate-900 rounded-full blur-[100px] opacity-20 pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 mb-6">
              <Activity size={14} className="text-safety" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{t.calculator.badge}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4">
              {t.calculator.title}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-light">
              {t.calculator.description}
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* INPUT PANEL */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 p-8 md:p-10 rounded-xl shadow-xl relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-1 h-full bg-slate-200 dark:bg-slate-800 group-hover:bg-safety transition-colors duration-300"></div>
               
               <div className="space-y-12">
                 
                 {/* Input 1: Duration */}
                 <div>
                   <div className="flex justify-between items-end mb-4">
                      <label className="flex items-center gap-3 text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                        <Clock size={18} className="text-safety" />
                        {t.calculator.inputs.duration}
                      </label>
                      <span className="font-mono text-xl font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-4 py-1.5 rounded border border-slate-200 dark:border-slate-700 min-w-[80px] text-center">
                        {duration} h
                      </span>
                   </div>
                   
                   <div className="flex items-center gap-4">
                      <ControlButton icon={Minus} onClick={() => setDuration(Math.max(1, duration - 1))} />
                      <div className="flex-grow py-2 relative">
                         <div className="absolute top-1/2 -translate-y-1/2 w-full h-1 bg-transparent flex justify-between px-1 pointer-events-none opacity-20 z-20">
                            {[...Array(12)].map((_, i) => <div key={i} className="w-[1px] h-3 bg-white mix-blend-overlay"></div>)}
                         </div>
                         <input 
                            type="range" min="1" max="48" step="1" 
                            value={duration} onChange={(e) => setDuration(Number(e.target.value))}
                            className="w-full relative z-10"
                            style={getSliderStyle(duration, 1, 48)}
                         />
                      </div>
                      <ControlButton icon={Plus} onClick={() => setDuration(Math.min(48, duration + 1))} />
                   </div>
                 </div>

                 {/* Input 2: Machine Rate */}
                 <div>
                   <div className="flex justify-between items-end mb-4">
                      <label className="flex items-center gap-3 text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                        <Zap size={18} className="text-safety" />
                        {t.calculator.inputs.rate}
                      </label>
                      <span className="font-mono text-xl font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-4 py-1.5 rounded border border-slate-200 dark:border-slate-700 min-w-[120px] text-center">
                        {machineRate}.-
                      </span>
                   </div>
                   
                   <div className="flex items-center gap-4">
                      <ControlButton icon={Minus} onClick={() => setMachineRate(Math.max(100, machineRate - 50))} />
                      <div className="flex-grow py-2">
                        <input 
                            type="range" min="100" max="1000" step="50" 
                            value={machineRate} onChange={(e) => setMachineRate(Number(e.target.value))}
                            className="w-full"
                            style={getSliderStyle(machineRate, 100, 1000)}
                        />
                      </div>
                      <ControlButton icon={Plus} onClick={() => setMachineRate(Math.min(1000, machineRate + 50))} />
                   </div>

                   <p className="text-[10px] text-slate-500 mt-3 text-center">
                      {t.calculator.inputs.rate_hint}
                   </p>
                 </div>

                 {/* Input 3: Employees */}
                 <div>
                   <div className="flex justify-between items-end mb-4">
                      <label className="flex items-center gap-3 text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                        <Users size={18} className="text-safety" />
                        {t.calculator.inputs.employees}
                      </label>
                      <span className="font-mono text-xl font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-4 py-1.5 rounded border border-slate-200 dark:border-slate-700 min-w-[80px] text-center">
                        {employees}
                      </span>
                   </div>
                   
                   <div className="flex items-center gap-4">
                      <ControlButton icon={Minus} onClick={() => setEmployees(Math.max(0, employees - 1))} />
                      <div className="flex-grow py-2">
                         <input 
                            type="range" min="0" max="20" step="1" 
                            value={employees} onChange={(e) => setEmployees(Number(e.target.value))}
                            className="w-full"
                            style={getSliderStyle(employees, 0, 20)}
                         />
                      </div>
                      <ControlButton icon={Plus} onClick={() => setEmployees(Math.min(20, employees + 1))} />
                   </div>
                 </div>

               </div>
            </div>

            {/* RESULTS PANEL */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              {/* Main Total Card */}
              <div className="bg-slate-900 text-white p-8 md:p-10 rounded-xl shadow-2xl relative overflow-hidden border border-white/10">
                 {/* Grid BG */}
                 <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                 
                 <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                       <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.calculator.results.risk}</span>
                       <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${severity.bg} text-white`}>
                          {severity.label}
                       </div>
                    </div>

                    <div className="flex items-baseline gap-2 mb-2">
                       <span className="text-4xl md:text-6xl font-black tracking-tighter font-mono">
                         CHF {totalCost.toLocaleString('de-CH')}
                       </span>
                    </div>
                    <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden mb-8">
                       <div className={`h-full ${severity.bg} transition-all duration-500`} style={{ width: `${Math.min((totalCost / 25000) * 100, 100)}%` }}></div>
                    </div>

                    {/* Breakdown Mini Bars */}
                    <div className="space-y-3 mb-8">
                       <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>{t.calculator.results.production}</span>
                          <span>{Math.round((machineLoss / totalCost) * 100)}%</span>
                       </div>
                       <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                           <div className="h-full bg-blue-500" style={{ width: `${(machineLoss / totalCost) * 100}%` }}></div>
                       </div>
                       
                       <div className="flex justify-between text-xs text-slate-400 mb-1 mt-3">
                          <span>{t.calculator.results.personnel}</span>
                          <span>{Math.round((personnelCost / totalCost) * 100)}%</span>
                       </div>
                       <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                           <div className="h-full bg-purple-500" style={{ width: `${(personnelCost / totalCost) * 100}%` }}></div>
                       </div>
                    </div>

                    <Button fullWidth onClick={handleConversion}>
                       {t.calculator.results.cta}
                    </Button>
                 </div>
              </div>

              {/* Context Card */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 p-6 rounded-xl shadow-lg flex items-start gap-4">
                 <div className="p-3 bg-emerald-500/10 rounded-full shrink-0">
                    <TrendingUp size={20} className="text-emerald-500" />
                 </div>
                 <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wide mb-2">{t.calculator.results.roi_title}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                       {t.calculator.results.roi_desc(maintenanceMonths)}
                    </p>
                 </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};