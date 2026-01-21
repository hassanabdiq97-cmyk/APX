'use client';

import React, { useEffect, useState, useRef } from 'react';
import { ShieldCheck, Activity, Cpu, Server, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Button } from './Button';
import { useSettings } from '../contexts/SettingsContext';

// Definition for the log entries
interface LogEntry {
  id: number;
  text: string;
  type: 'cmd' | 'info' | 'success' | 'warning' | 'error' | 'system';
  delay: number;
}

export const Hero: React.FC = () => {
  const { t } = useSettings();
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  // --- TERMINAL ANIMATION LOGIC ---
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [statusColor, setStatusColor] = useState<'emerald' | 'safety'>('emerald');

  // The script that runs in the terminal
  const bootSequence: Omit<LogEntry, 'id'>[] = [
    { text: "sys_init --verbose", type: 'cmd', delay: 600 },
    { text: "loading_modules... [OK]", type: 'info', delay: 200 },
    { text: "mounting_volumes... [OK]", type: 'info', delay: 200 },
    { text: "connecting_to_bus... [CONNECTED]", type: 'info', delay: 400 },
    { text: "✔ Drive X: Sync OK", type: 'success', delay: 300 },
    { text: "✔ Drive Y: Sync OK", type: 'success', delay: 300 },
    { text: "analyzing_drive_z_spectrum...", type: 'system', delay: 800 },
    { text: "⚠ WARN: Harmonic distortion > 0.4%", type: 'warning', delay: 600 },
    { text: "identifying_root_cause...", type: 'system', delay: 500 },
    { text: "[CRITICAL] VIBRATION THRESHOLD EXCEEDED", type: 'error', delay: 400 },
    { text: "ERROR CODE: E-504 (Bearing Wear)", type: 'error', delay: 600 },
    { text: "initiating_emergency_protocol...", type: 'cmd', delay: 400 },
    { text: "contacting_apex_hq... [ACK]", type: 'success', delay: 800 },
    { text: ">> TICKET #9942 CREATED", type: 'success', delay: 1500 },
    { text: ">> TECHNICIAN DISPATCHED", type: 'success', delay: 3000 },
  ];

  useEffect(() => {
    let timeoutIds: ReturnType<typeof setTimeout>[] = [];
    let isMounted = true;

    const runSequence = async () => {
      if (!isMounted) return;
      
      setLogs([]); // Clear logs
      setStatusColor('emerald'); // Reset status

      let accumulatedDelay = 0;

      for (let i = 0; i < bootSequence.length; i++) {
        const step = bootSequence[i];
        
        const timeoutId = setTimeout(() => {
          if (!isMounted) return;
          
          setLogs(prev => [...prev, { ...step, id: Date.now() + i }]);
          
          // Trigger visual changes based on log type
          if (step.type === 'error') setStatusColor('safety');
          
        }, accumulatedDelay);

        timeoutIds.push(timeoutId);
        accumulatedDelay += step.delay;
      }

      // Restart loop
      const restartId = setTimeout(() => {
        runSequence();
      }, accumulatedDelay + 2000);
      timeoutIds.push(restartId);
    };

    runSequence();

    return () => {
      isMounted = false;
      timeoutIds.forEach(clearTimeout);
    };
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  // Blinking cursor
  const [cursorVisible, setCursorVisible] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => setCursorVisible(v => !v), 500);
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

          {/* Visual: Animated Diagnostic Terminal */}
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
                      <div className={`text-[10px] font-bold transition-colors duration-300 ${statusColor === 'safety' ? 'text-safety animate-pulse' : 'text-emerald-500'}`}>
                         {statusColor === 'safety' ? 'ALERT' : 'ONLINE'}
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
                               <li className={`flex items-center justify-between -mx-2 px-2 py-1 rounded transition-colors duration-300 ${statusColor === 'safety' ? 'text-safety bg-safety/10 border border-safety/20' : 'text-emerald-500'}`}>
                                  <span className="flex items-center gap-2"><Activity size={12}/> Axis Z-Drive</span>
                                  <span className={`text-[9px] ${statusColor === 'safety' ? 'animate-pulse' : ''}`}>{statusColor === 'safety' ? 'ERR' : 'OK'}</span>
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
                                      className={`absolute bottom-0 w-full transition-all duration-300 ${statusColor === 'safety' && i > 3 ? 'bg-safety' : 'bg-emerald-500'}`}
                                      style={{ 
                                        height: `${statusColor === 'safety' && i > 3 ? 95 : Math.random() * 50 + 20}%`,
                                        opacity: 0.8 
                                      }}
                                    ></div>
                                 </div>
                               ))}
                            </div>
                            <div className="flex justify-between mt-1 text-[9px] font-bold">
                               <span className="text-slate-500">PEAK:</span>
                               <span className={statusColor === 'safety' ? 'text-safety' : 'text-emerald-500'}>
                                 {statusColor === 'safety' ? '4.8 mm/s' : '0.2 mm/s'}
                               </span>
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

                         {/* Dynamic Log Feed */}
                         <div className="flex-grow overflow-y-auto relative text-xs font-mono leading-relaxed font-light scrollbar-hide" ref={scrollRef}>
                            <div className="space-y-1 pb-2">
                               {logs.map((log) => (
                                 <div key={log.id} className={`animate-in fade-in slide-in-from-left-2 duration-300 ${
                                   log.type === 'cmd' ? 'text-slate-300 font-bold mt-2' :
                                   log.type === 'success' ? 'text-emerald-500' :
                                   log.type === 'warning' ? 'text-orange-400' :
                                   log.type === 'error' ? 'text-safety font-bold bg-safety/5 p-1' :
                                   log.type === 'system' ? 'text-slate-500 italic' :
                                   'text-slate-400'
                                 }`}>
                                    {log.type === 'cmd' && <span className="text-safety mr-2">root@apx:~#</span>}
                                    {log.type === 'error' && <AlertTriangle size={10} className="inline mr-2" />}
                                    {log.text}
                                 </div>
                               ))}
                               {/* Active Line Cursor */}
                               <div className="text-slate-300 mt-2">
                                  <span className="text-safety mr-2">root@apx:~#</span>
                                  <span className={`inline-block w-2 h-4 bg-slate-500 align-middle ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* Footer Status */}
                   <div className="bg-[#020617] border-t border-slate-800 p-2 px-4 flex justify-between items-center text-[10px]">
                      <div className="flex items-center gap-4 text-slate-500">
                         <span>MEM: {statusColor === 'safety' ? '89%' : '24%'}</span>
                         <span>CPU: {statusColor === 'safety' ? '12%' : '04%'}</span>
                         <span>TEMP: {statusColor === 'safety' ? '62°C' : '42°C'}</span>
                      </div>
                      <div className={`px-2 py-0.5 rounded font-bold transition-colors duration-300 ${statusColor === 'safety' ? 'bg-safety text-white animate-pulse' : 'bg-emerald-500/10 text-emerald-500'}`}>
                         {statusColor === 'safety' ? 'ACTION REQUIRED' : 'SYSTEM OPTIMAL'}
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