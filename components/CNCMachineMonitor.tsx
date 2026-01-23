
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion';
import { AlertTriangle, Activity, Settings, Folder, FileText } from 'lucide-react';

// Proper Typing for Motion Div instead of 'any'
type MotionDivProps = HTMLMotionProps<"div">;
const MotionDiv = motion.div;

type MachineState = 'RUNNING' | 'ALARM' | 'DIAGNOSTIC' | 'REBOOT';

const ALARM_CODES = [
  { code: "SV0411", msg: "Z-AXIS EXCESS ERR (MOV)", type: "SERVO ALARM" },
  { code: "SP9012", msg: "SPINDLE 1 OVERCURRENT", type: "SPINDLE ALARM" },
  { code: "OT0506", msg: "OVERTRAVEL +Z (HARD)", type: "OT ALARM" }
];

export const CNCMachineMonitor = () => {
  const [phase, setPhase] = useState<MachineState>('RUNNING');
  
  // Realistische Koordinaten-Simulation
  const [coords, setCoords] = useState({ x: 124.500, y: -45.200, z: -12.440 });
  const [distToGo, setDistToGo] = useState({ x: 0.000, y: 0.000, z: 0.000 });
  
  const [spindleLoad, setSpindleLoad] = useState(42);
  const [rpm, setRpm] = useState(12000);
  const [feed, setFeed] = useState(2500);
  
  const [activeAlarm, setActiveAlarm] = useState(ALARM_CODES[0]);
  const [programLine, setProgramLine] = useState(1040);

  // Simulation Loop Logic (18s Cycle) - Cleaned up to use refs for timers if needed, but setState is required for UI updates here.
  useEffect(() => {
    let timer = 0;
    const interval = setInterval(() => {
        timer += 0.1;
        const nextTime = timer; // local var to avoid closure staleness if we used state for timer
        
        // --- STATE MACHINE ---
        if (nextTime < 8) {
           // NORMAL BETRIEB
           setPhase((p) => p !== 'RUNNING' ? 'RUNNING' : p);
           
           // Koordinaten bewegen sich leicht ("Working")
           setCoords(prev => ({
             x: prev.x + (Math.random() - 0.5) * 0.1,
             y: prev.y + (Math.random() - 0.5) * 0.1,
             z: prev.z + (Math.random() - 0.5) * 0.05
           }));

           // Distance to Go flackert
           setDistToGo({
             x: Math.abs(Math.sin(nextTime) * 10),
             y: Math.abs(Math.cos(nextTime) * 5),
             z: Math.abs(Math.sin(nextTime * 2))
           });

           // Load schwankt realistisch
           setSpindleLoad(45 + Math.random() * 10);
           setRpm(12000 + Math.random() * 50);
           
           // Programmlauf
           if (Math.floor(nextTime * 10) % 5 === 0) {
              setProgramLine(prev => prev + 1);
           }
        } 
        else if (nextTime >= 8 && nextTime < 8.5) {
           // CRASH MOMENT
           setPhase((p) => {
               if (p !== 'ALARM') {
                   setActiveAlarm(ALARM_CODES[Math.floor(Math.random() * ALARM_CODES.length)]);
                   return 'ALARM';
               }
               return p;
           });
           setSpindleLoad(210); // Overload Spike
           setRpm(0);
           setFeed(0);
        }
        else if (nextTime >= 8.5 && nextTime < 14) {
           // ALARM ZUSTAND (Stillstand)
           setSpindleLoad(0);
           setDistToGo({ x: 0, y: 0, z: 0 });
        } 
        else if (nextTime >= 14 && nextTime < 16) {
           // DIAGNOSE / RESET
           setPhase(p => p !== 'DIAGNOSTIC' ? 'DIAGNOSTIC' : p);
        } 
        else if (nextTime >= 16 && nextTime < 18) {
           // REBOOT
           setPhase(p => p !== 'REBOOT' ? 'REBOOT' : p);
        } 
        else {
           timer = 0; // Reset
        }
    }, 100);

    return () => clearInterval(interval);
  }, []); // Empty deps because we use functional updates or local vars

  // aria-hidden="true" is crucial here because this entire component is visual decoration
  return (
    <div className="w-full mx-auto select-none perspective-[1000px]" aria-hidden="true">
      
      {/* MONITOR BEZEL (Plastic Frame) */}
      <div className="relative bg-[#2a2a2a] p-3 rounded-lg shadow-2xl border-b-4 border-r-4 border-[#1a1a1a]">
        
        {/* BRANDING */}
        <div className="absolute top-4 right-6 text-gray-500 font-bold italic text-xs tracking-widest opacity-50">
           APEX CONTROL i-Series
        </div>

        {/* --- THE SCREEN (LCD) --- */}
        <div className="relative bg-[#000000] aspect-[16/10] overflow-hidden border-2 border-[#444] shadow-inner font-mono text-sm text-gray-100 flex flex-col">
            
            {/* STATUS BAR (Top) */}
            <div className={`flex justify-between items-center px-2 py-1 text-xs font-bold border-b border-gray-700 ${phase === 'ALARM' ? 'bg-red-700 text-white' : 'bg-[#e0e0e0] text-black'}`}>
                <div className="flex gap-4">
                    <span className="bg-black text-white px-1">{phase === 'ALARM' ? 'EMG' : 'MEM'}</span>
                    <span>{phase === 'ALARM' ? '*** ALARM ***' : 'STOP **** ***'}</span>
                </div>
                <div>O0001 N{programLine}</div>
                <div>{new Date().toLocaleTimeString()}</div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="flex-grow flex relative">
                
                {/* LEFT COLUMN: COORDINATES */}
                <div className="w-2/3 border-r border-gray-700 p-2 flex flex-col gap-4">
                    
                    {/* Position Display */}
                    <div className="bg-[#000022] border border-gray-600 p-1">
                        <div className="text-[#00ffff] text-xs border-b border-gray-700 mb-1 px-1">ABSOLUTE</div>
                        <div className="grid grid-cols-[30px_1fr] gap-y-1 text-xl md:text-2xl font-bold px-2 py-2">
                            <span className="text-gray-400">X</span>
                            <span className="text-right">{coords.x.toFixed(3)}</span>
                            
                            <span className="text-gray-400">Y</span>
                            <span className="text-right">{coords.y.toFixed(3)}</span>
                            
                            <span className={`text-gray-400 ${phase === 'ALARM' ? 'text-red-500 animate-pulse' : ''}`}>Z</span>
                            <span className={`text-right ${phase === 'ALARM' ? 'text-red-500 bg-red-900/20' : ''}`}>
                                {coords.z.toFixed(3)}
                            </span>
                        </div>
                    </div>

                    {/* Distance to Go */}
                    <div className="bg-[#000022] border border-gray-600 p-1 flex-grow">
                        <div className="text-[#00ff00] text-xs border-b border-gray-700 mb-1 px-1">DIST TO GO</div>
                        <div className="grid grid-cols-[30px_1fr] gap-y-1 text-lg px-2 py-1 text-gray-300">
                             <span>X</span><span className="text-right">{distToGo.x.toFixed(3)}</span>
                             <span>Y</span><span className="text-right">{distToGo.y.toFixed(3)}</span>
                             <span>Z</span><span className="text-right">{distToGo.z.toFixed(3)}</span>
                        </div>
                    </div>

                </div>

                {/* RIGHT COLUMN: METERS & CODE */}
                <div className="w-1/3 p-2 flex flex-col gap-2">
                    
                    {/* Load Meter */}
                    <div className="bg-[#111] border border-gray-700 p-2">
                        <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                            <span>LOAD</span><span>{Math.round(spindleLoad)}%</span>
                        </div>
                        <div className="w-full h-3 bg-gray-800 relative">
                            <div 
                                className={`h-full transition-all duration-100 ${spindleLoad > 100 ? 'bg-red-500' : 'bg-green-500'}`} 
                                style={{ width: `${Math.min(100, spindleLoad)}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* RPM / FEED */}
                    <div className="bg-[#111] border border-gray-700 p-2 text-xs">
                        <div className="flex justify-between mb-1">
                            <span className="text-cyan-400">S</span>
                            <span>{Math.round(rpm)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-cyan-400">F</span>
                            <span>{Math.round(feed)}</span>
                        </div>
                    </div>

                    {/* G-Code Preview */}
                    <div className="bg-blue-900/20 border border-blue-900/50 flex-grow p-1 text-[10px] text-gray-400 font-mono overflow-hidden">
                        <div className="text-yellow-500 border-b border-blue-900/30 mb-1">ACTIVE BLOCK</div>
                        <div className="opacity-50">N{programLine-1} G01 X{coords.x.toFixed(2)}</div>
                        <div className="text-white bg-white/10 font-bold">N{programLine} G01 Z{coords.z.toFixed(2)}</div>
                        <div className="opacity-50">N{programLine+1} M08</div>
                        <div className="opacity-50">N{programLine+2} X120.0</div>
                    </div>
                </div>

            </div>

            {/* ALARM WINDOW OVERLAY (Realism) */}
            <AnimatePresence>
            {phase === 'ALARM' && (
                <MotionDiv 
                   initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                   className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 bg-red-700 border-2 border-white shadow-2xl z-50 text-white p-1"
                >
                    <div className="bg-red-800 border-b border-red-600 px-2 py-1 text-xs font-bold flex justify-between">
                        <span>{activeAlarm.type}</span>
                        <span>ALM</span>
                    </div>
                    <div className="p-4 flex gap-4 items-center">
                        <AlertTriangle size={32} className="text-yellow-300 animate-pulse" />
                        <div>
                            <div className="text-2xl font-black tracking-widest">{activeAlarm.code}</div>
                            <div className="text-sm font-bold">{activeAlarm.msg}</div>
                        </div>
                    </div>
                    <div className="bg-black/20 p-1 text-[10px] text-right">
                        PRESS RESET TO CLEAR
                    </div>
                </MotionDiv>
            )}
            </AnimatePresence>
            
            {/* DIAGNOSTIC OVERLAY */}
            <AnimatePresence>
            {phase === 'DIAGNOSTIC' && (
                <MotionDiv 
                   initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                   className="absolute inset-0 bg-blue-900/90 z-40 flex flex-col items-center justify-center font-mono text-xs"
                >
                    <div className="border border-white p-4 w-2/3 bg-blue-800 shadow-xl">
                        <div className="mb-2 text-yellow-300 font-bold border-b border-white/20 pb-1">REMOTE DIAGNOSTICS</div>
                        <div className="space-y-1 text-white">
                            <div className="flex justify-between"><span>LINK STATUS:</span><span className="text-green-400">ONLINE</span></div>
                            <div className="flex justify-between"><span>UPLOADING LOGS:</span><span>100%</span></div>
                            <div className="flex justify-between"><span>ANALYSIS:</span><span className="animate-pulse">PROCESSING...</span></div>
                        </div>
                    </div>
                </MotionDiv>
            )}
            </AnimatePresence>

            {/* SOFTKEYS (Footer) */}
            <div className="bg-[#222] border-t border-gray-600 p-1 flex gap-1 h-8">
                {['POS', 'PROG', 'OFFSET', 'SYSTEM', 'MSG'].map((label, i) => (
                    <div key={i} className="bg-[#444] flex-1 rounded-[2px] border-b-2 border-[#111] flex items-center justify-center text-[9px] font-bold text-gray-300 shadow-sm cursor-pointer hover:bg-[#555]">
                        {label}
                    </div>
                ))}
            </div>

        </div>

        {/* PHYSICAL BUTTONS (Decor) */}
        <div className="mt-2 flex justify-between px-2">
            <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-green-700 shadow-lg border-2 border-green-900 flex items-center justify-center text-[8px] font-bold text-green-200">ON</div>
                <div className="w-8 h-8 rounded-full bg-red-700 shadow-lg border-2 border-red-900 flex items-center justify-center text-[8px] font-bold text-red-200">OFF</div>
            </div>
            <div className="flex gap-1 items-center">
                 <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
                 <span className="text-[9px] text-gray-500 font-bold uppercase">Data Link</span>
            </div>
        </div>

      </div>
    </div>
  );
};
