'use client';

import React, { useEffect, useState, useRef } from 'react';
import { ShieldCheck, Activity, Cpu, Server, AlertTriangle } from 'lucide-react';
import { Button } from './Button';
import { useSettings } from '../contexts/SettingsContext';

interface LogEntry {
  id: number;
  text: string;
  type: 'cmd' | 'info' | 'success' | 'warning' | 'error' | 'system';
  delay: number;
}

export const Hero: React.FC = () => {
  const { t } = useSettings();
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const [logs, setLogs] = useState<LogEntry[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [statusColor, setStatusColor] = useState<'emerald' | 'safety'>('emerald');

  const bootSequence: Omit<LogEntry, 'id'>[] = [
    { text: "sys_init --verbose", type: 'cmd', delay: 600 },
    { text: "loading_modules... [OK]", type: 'info', delay: 200 },
    { text: "mounting_volumes... [OK]", type: 'info', delay: 200 },
    { text: "connecting_to_bus... [CONNECTED]", type: 'info', delay: 400 },
    { text: "✔ Drive X: Sync OK", type: 'success', delay: 300 },
    { text: "analyzing_spectrum...", type: 'system', delay: 800 },
    { text: "[CRITICAL] VIBRATION EXCEEDED", type: 'error', delay: 400 },
    { text: "ERROR CODE: E-504 (Bearing)", type: 'error', delay: 600 },
    { text: "initiating_emergency_protocol...", type: 'cmd', delay: 400 },
    { text: "contacting_apex_hq... [ACK]", type: 'success', delay: 800 },
  ];

  useEffect(() => {
    let timeoutIds: ReturnType<typeof setTimeout>[] = [];
    let isMounted = true;

    const runSequence = async () => {
      if (!isMounted) return;
      setLogs([]);
      setStatusColor('emerald');
      let accumulatedDelay = 0;

      for (let i = 0; i < bootSequence.length; i++) {
        const step = bootSequence[i];
        const timeoutId = setTimeout(() => {
          if (!isMounted) return;
          setLogs(prev => [...prev, { ...step, id: Date.now() + i }].slice(-10));
          if (step.type === 'error') setStatusColor('safety');
        }, accumulatedDelay);
        timeoutIds.push(timeoutId);
        accumulatedDelay += step.delay;
      }

      const restartId = setTimeout(() => runSequence(), accumulatedDelay + 5000);
      timeoutIds.push(restartId);
    };

    runSequence();
    return () => { isMounted = false; timeoutIds.forEach(clearTimeout); };
  }, []);

  return (
    <section id="hero" className="relative min-h-[85vh] md:min-h-[90vh] flex items-center pt-20 md:pt-32 pb-16 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="bg-tech-grid absolute inset-0 opacity-20"></div>
      
      {/* Mobile System Ticker */}
      <div className="lg:hidden absolute top-0 left-0 w-full bg-slate-900 border-b border-white/5 py-1.5 z-20 overflow-hidden">
        <div className="flex whitespace-nowrap animate-ticker">
           <span className="text-[9px] font-mono text-cyan-apex uppercase tracking-[0.2em] px-4">
             System Status: {statusColor === 'safety' ? 'ALARM / E-504' : 'Operational'} // Latency: 12ms // Location: Lengnau HQ // Tech Dispatch: Ready
           </span>
           <span className="text-[9px] font-mono text-cyan-apex uppercase tracking-[0.2em] px-4">
             System Status: {statusColor === 'safety' ? 'ALARM / E-504' : 'Operational'} // Latency: 12ms // Location: Lengnau HQ // Tech Dispatch: Ready
           </span>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 border-l-2 border-safety bg-slate-200/50 dark:bg-white/5 px-3 py-1.5 mb-6 md:mb-8">
               <span className="text-safety font-mono text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em]">
                 {t.hero.region}
               </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] md:leading-[0.9] mb-6 md:mb-8 tracking-tighter">
              {t.hero.headline} <br className="hidden sm:block"/>
              <span className="text-slate-500 dark:text-slate-400">
                {t.hero.subheadline}
              </span>
            </h1>
            
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 mb-8 md:mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light border-l-0 lg:border-l border-slate-300 dark:border-white/10 lg:pl-6">
              {t.hero.description}
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Button size="lg" fullWidth className="sm:w-auto" onClick={() => scrollTo('quickcheck')}>
                 {t.hero.cta_check}
              </Button>
              <div className="flex items-center justify-center gap-3 px-6 py-4 border border-slate-200 dark:border-white/5 bg-white/50 dark:bg-white/[0.02] rounded-sm">
                 <ShieldCheck size={18} className="text-emerald-500" />
                 <span className="font-bold text-[10px] text-slate-500 dark:text-slate-300 tracking-wide uppercase">{t.hero.cta_suva}</span>
              </div>
            </div>
          </div>

          {/* Desktop Terminal Visual */}
          <div className="lg:w-1/2 w-full hidden lg:block perspective-[2000px]">
             <div className="relative transform rotate-y-[-5deg] hover:rotate-0 transition-transform duration-700 ease-out">
                <div className="bg-[#0F172A] border border-slate-700 rounded-lg overflow-hidden shadow-2xl font-mono text-xs">
                   <div className="bg-[#1E293B] p-2 flex items-center justify-between border-b border-slate-700">
                      <div className="flex gap-1.5"><div className="w-2 h-2 rounded-full bg-slate-600"></div><div className="w-2 h-2 rounded-full bg-slate-600"></div><div className="w-2 h-2 rounded-full bg-slate-600"></div></div>
                      <div className="text-[9px] text-slate-400 font-bold uppercase">APX-DIAG v4.1</div>
                      <div className={`text-[9px] font-bold ${statusColor === 'safety' ? 'text-safety animate-pulse' : 'text-emerald-500'}`}>{statusColor === 'safety' ? 'ALERT' : 'ONLINE'}</div>
                   </div>
                   <div className="h-[350px] bg-[#0c0c0c] p-4 overflow-y-auto scrollbar-hide flex flex-col gap-1">
                      {logs.map(log => (
                        <div key={log.id} className={`${log.type === 'error' ? 'text-safety bg-safety/5' : 'text-slate-400'} p-0.5`}>
                          {log.type === 'cmd' && <span className="text-safety mr-2">root@apx:~#</span>}
                          {log.text}
                        </div>
                      ))}
                      <div className="text-slate-500 animate-pulse mt-1">_</div>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};