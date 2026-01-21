'use client';

import React, { useEffect, useState } from 'react';
import { ShieldCheck, Activity, Cpu, Server, AlertTriangle } from 'lucide-react';
import { Button } from './Button';
import { useSettings } from '../contexts/SettingsContext';

export const Hero: React.FC = () => {
  const { t } = useSettings();
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  // Simple state to toggle a blinking cursor or status
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      
      {/* Unified Technical Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-70"></div>
      
      {/* Subtle Glow Effect */}
      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-gradient-to-b from-safety/5 to-transparent blur-[150px] rounded-full pointer-events-none"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Text Content */}
          <div className="lg:w-1/2 relative">
            <div className="inline-flex items-center gap-3 border-l-2 border-safety bg-gradient-to-r from-slate-200/50 to-transparent dark:from-white/5 px-4 py-2 mb-8">
               <span className="text-safety font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
                 {t.hero.region}
               </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-[0.9] mb-8 tracking-tighter">
              {t.hero.headline} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-600 via-slate-500 to-slate-400 dark:from-slate-400 dark:via-slate-500 dark:to-slate-600">
                {t.hero.subheadline}
              </span>
            </h1>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-xl leading-relaxed font-light border-l border-slate-300 dark:border-white/10 pl-6">
              {t.hero.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={() => scrollTo('quickcheck')}>
                 {t.hero.cta_check}
              </Button>
              <div className="flex items-center gap-3 px-6 py-4 border border-slate-200 dark:border-white/5 bg-white/50 dark:bg-white/[0.02] hover:bg-white/80 dark:hover:bg-white/5 transition-colors cursor-default rounded-sm">
                 <ShieldCheck size={18} className="text-emerald-500" />
                 <span className="font-bold text-xs text-slate-500 dark:text-slate-300 tracking-wide uppercase">{t.hero.cta_suva}</span>
              </div>
            </div>
          </div>

          {/* Visual: Diagnostic Terminal Interface */}
          <div className="lg:w-1/2 w-full hidden lg:block perspective-[2000px]">
             <div className="relative transform rotate-y-[-5deg] hover:rotate-0 transition-transform duration-700 ease-out">
                
                {/* Main Terminal Window - ALWAYS DARK for technical look */}
                <div className="relative bg-[#0F172A] border border-slate-700 rounded-lg overflow-hidden shadow-2xl font-mono text-xs">
                   
                   {/* Window Bar */}
                   <div className="bg-[#1E293B] p-2 flex items-center justify-between border-b border-slate-700">
                      <div className="flex gap-1.5">
                         <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
                         <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
                         <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
                      </div>
                      <div className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">
                         APX-DIAGNOSIS Tool v4.1
                      </div>
                      <div className="text-[10px] text-emerald-500 font-bold">
                         ONLINE
                      </div>
                   </div>

                   {/* Terminal Content Grid */}
                   <div className="grid grid-cols-3 h-[400px]">
                      
                      {/* Sidebar: System Status */}
                      <div className="col-span-1 bg-[#020617] border-r border-slate-800 p-4 flex flex-col gap-6">
                         
                         <div>
                            <span className="text-[9px] text-slate-500 uppercase tracking-widest block mb-2">Modules</span>
                            <ul className="space-y-2">
                               <li className="flex items-center justify-between text-emerald-500">
                                  <span className="flex items-center gap-2"><Cpu size={12}/> PLC-Core</span>
                                  <span className="text-[9px]">OK</span>
                               </li>
                               <li className="flex items-center justify-between text-emerald-500">
                                  <span className="flex items-center gap-2"><Server size={12}/> Network</span>
                                  <span className="text-[9px]">OK</span>
                               </li>
                               <li className="flex items-center justify-between text-safety bg-safety/10 -mx-2 px-2 py-1 rounded border border-safety/20">
                                  <span className="flex items-center gap-2"><Activity size={12}/> Axis Z-Drive</span>
                                  <span className="text-[9px] animate-pulse">ERR</span>
                               </li>
                               <li className="flex items-center justify-between text-slate-500">
                                  <span className="flex items-center gap-2"><Cpu size={12}/> Tool Changer</span>
                                  <span className="text-[9px]">IDLE</span>
                               </li>
                            </ul>
                         </div>

                         <div className="mt-auto">
                            <span className="text-[9px] text-slate-500 uppercase tracking-widest block mb-2">Live Sensor</span>
                            <div className="h-16 flex items-end justify-between gap-1 pb-2 border-b border-slate-800">
                               {/* Animated Bars Simulation */}
                               {[40, 60, 30, 80, 50, 90, 20, 45].map((h, i) => (
                                 <div key={i} className="w-full bg-slate-800 relative overflow-hidden rounded-sm">
                                    <div 
                                      className={`absolute bottom-0 w-full transition-all duration-300 ${i === 5 ? 'bg-safety' : 'bg-emerald-500'}`}
                                      style={{ 
                                        height: `${i === 5 ? 100 : Math.random() * 50 + 20}%`,
                                        opacity: i === 5 ? 1 : 0.6 
                                      }}
                                    ></div>
                                 </div>
                               ))}
                            </div>
                            <div className="flex justify-between mt-1 text-[9px] text-safety font-bold">
                               <span>PEAK:</span>
                               <span>4.8 mm/s</span>
                            </div>
                         </div>
                      </div>

                      {/* Main Console: Scrolling Logs */}
                      <div className="col-span-2 bg-[#0c0c0c] p-4 relative overflow-hidden flex flex-col">
                         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none"></div>
                         
                         {/* Header of Console */}
                         <div className="flex justify-between border-b border-white/10 pb-2 mb-2">
                            <span className="text-slate-500 text-[10px]">Target: MACHINE_ID_508</span>
                            <span className="text-slate-500 text-[10px]">Port: 8080 [Secure]</span>
                         </div>

                         {/* Scrolling Text Area */}
                         <div className="flex-grow overflow-hidden relative text-xs font-mono leading-relaxed font-light">
                            <div className="absolute bottom-0 left-0 w-full space-y-1">
                               <div className="text-slate-500 opacity-50">sys_init --verbose</div>
                               <div className="text-slate-500 opacity-60">loading_modules... [done]</div>
                               <div className="text-slate-500 opacity-70">connecting_to_bus... [connected]</div>
                               <div className="text-emerald-500 opacity-80">✔ Drive X: Sync OK</div>
                               <div className="text-emerald-500 opacity-90">✔ Drive Y: Sync OK</div>
                               <div className="text-safety font-bold flex items-center gap-2 bg-safety/5 p-1">
                                  <AlertTriangle size={10} /> 
                                  [CRITICAL] DRIVE Z: VIBRATION THRESHOLD EXCEEDED
                               </div>
                               <div className="text-slate-300 pl-4">> analzying_spectrum...</div>
                               <div className="text-slate-300 pl-4">> identifying_root_cause...</div>
                               <div className="text-safety pl-4">> ERROR CODE: E-504 (Bearing Wear)</div>
                               <div className="text-white mt-2 flex items-center gap-1">
                                  <span className="text-safety">root@apx:~#</span> initiating_emergency_protocol<span className={`inline-block w-2 h-4 bg-white ml-1 ${tick % 2 === 0 ? 'opacity-100' : 'opacity-0'}`}></span>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* Footer Status */}
                   <div className="bg-[#020617] border-t border-slate-800 p-2 px-4 flex justify-between items-center text-[10px]">
                      <div className="flex items-center gap-4 text-slate-500">
                         <span>MEM: 64%</span>
                         <span>CPU: 12%</span>
                         <span>TEMP: 42°C</span>
                      </div>
                      <div className="bg-safety text-white px-2 py-0.5 rounded animate-pulse font-bold">
                         ACTION REQUIRED
                      </div>
                   </div>
                </div>

                {/* Reflection/Glare */}
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/5 to-transparent pointer-events-none rounded-lg"></div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};