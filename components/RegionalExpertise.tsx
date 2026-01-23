'use client';

import React from 'react';
import { Timer, MapPin, Navigation, Crosshair, Zap } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { useSettings } from '../contexts/SettingsContext';

export const RegionalExpertise: React.FC = () => {
  const { t } = useSettings();

  // Helper component for Map Dots
  // zone: 'rapid' (<15m), 'core' (<30m), 'extended' (<60m), 'peripheral' (Network)
  const MapDot = ({ label, top, left, zone = 'extended', align = 'center' }: { label: string, top: string, left: string, zone?: 'rapid' | 'core' | 'extended' | 'peripheral', align?: 'left' | 'right' | 'center' }) => {
    let dotColor = "bg-slate-600 border-slate-500";
    let textColor = "text-slate-500";
    let labelBg = "bg-slate-900/80";
    let zIndex = "z-10";

    if (zone === 'rapid') {
        dotColor = "bg-safety border-white shadow-[0_0_10px_#FF3300]";
        textColor = "text-white font-bold text-glow";
        labelBg = "bg-safety/90";
        zIndex = "z-30";
    } else if (zone === 'core') {
        dotColor = "bg-emerald-400 border-emerald-200 shadow-[0_0_8px_#34d399]";
        textColor = "text-emerald-300 font-bold";
        labelBg = "bg-slate-900/90 border border-emerald-500/30";
        zIndex = "z-20";
    } else if (zone === 'extended') {
        // Extended (1h) - BLUE
        dotColor = "bg-blue-500 border-blue-300 shadow-[0_0_8px_#3b82f6]";
        textColor = "text-blue-400 font-bold";
        labelBg = "bg-slate-900/90 border border-blue-500/30";
        zIndex = "z-15";
    } else {
        // Peripheral - GREY (Standard)
        dotColor = "bg-slate-600 border-slate-500";
        textColor = "text-slate-500";
        labelBg = "bg-slate-950/80 border border-white/10";
        zIndex = "z-10";
    }

    return (
        <div className={`absolute group cursor-pointer flex flex-col items-center hover:z-50 ${zIndex}`} style={{ top, left, transform: 'translate(-50%, -50%)' }}>
            <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full border transition-all duration-300 group-hover:scale-150 ${dotColor}`}></div>
            <span className={`mt-2 text-[8px] md:text-[9px] font-mono uppercase tracking-wider transition-all whitespace-nowrap px-1.5 py-0.5 rounded backdrop-blur-sm ${textColor} ${labelBg} ${align === 'left' ? '-translate-x-4' : align === 'right' ? 'translate-x-4' : ''} group-hover:scale-110 group-hover:text-white`}>
                {label}
            </span>
            {/* Zone Connection Line (Hover) */}
            <div className="absolute top-1/2 left-1/2 w-[100px] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none -z-10 transition-opacity"></div>
        </div>
    );
  };

  return (
    <section id="expertise" className="py-24 md:py-32 bg-slate-100 dark:bg-slate-900 border-y border-slate-200 dark:border-white/5 relative overflow-hidden transition-colors duration-300">
         {/* Background Map Abstract */}
         <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Karte_Gemeinde_Lengnau_%28BE%29_2013.png/1200px-Karte_Gemeinde_Lengnau_%28BE%29_2013.png')] bg-cover bg-center mix-blend-overlay grayscale"></div>

         <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">
               
               {/* Text Content */}
               <div className="lg:w-1/2 order-2 lg:order-1">
                  <SectionHeader title={t.expertise.title} subtitle={t.expertise.subtitle} alignment="left" />
                  
                  <h3 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mt-2 mb-8 tracking-tight uppercase leading-[0.9]">
                        {t.expertise.headline_part1} <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-safety to-slate-500">{t.expertise.headline_part2}</span>
                  </h3>

                  <div className="pl-6 border-l-4 border-safety mb-10 relative">
                      <div className="absolute -left-[5px] top-0 w-2 h-2 bg-safety rounded-full"></div>
                      <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed font-light">
                         {t.expertise.description}
                      </p>
                  </div>
                  
                  <div className="space-y-4">
                     {/* Value Prop 1 */}
                     <div className="flex items-center gap-5 p-4 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 rounded-sm shadow-sm hover:border-safety/30 transition-colors">
                        <div className="w-12 h-12 bg-safety/10 flex items-center justify-center text-safety rounded-sm shrink-0">
                           <Zap size={24} />
                        </div>
                        <div>
                           <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Response Time</div>
                           <div className="text-slate-900 dark:text-white font-black text-lg">
                              &lt; 30 Min <span className="text-sm font-normal text-slate-500 ml-1">(Biel/Solothurn)</span>
                           </div>
                        </div>
                     </div>
                     
                     {/* Value Prop 2 */}
                     <div className="flex items-center gap-5 p-4 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 rounded-sm shadow-sm hover:border-safety/30 transition-colors">
                        <div className="w-12 h-12 bg-emerald-500/10 flex items-center justify-center text-emerald-500 rounded-sm shrink-0">
                           <MapPin size={24} />
                        </div>
                        <div>
                           <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Hub Location</div>
                           <div className="text-slate-900 dark:text-white font-black text-lg">
                              Lengnau HQ <span className="text-sm font-normal text-slate-500 ml-1">(A5 Anschluss)</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               
               {/* Visual Radar Map Representation */}
               <div className="lg:w-1/2 order-1 lg:order-2 flex justify-center w-full perspective-[1000px]">
                  {/* Radar Container - Tilted 3D Effect */}
                  <div className="relative w-[360px] h-[360px] md:w-[550px] md:h-[550px] bg-[#0f1219] rounded-full border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-center transform md:rotate-x-12 transition-transform duration-700 hover:rotate-0 group/radar">
                     
                     {/* Radar Sweep Effect */}
                     <div className="absolute inset-0 rounded-full overflow-hidden opacity-30 pointer-events-none z-0">
                        <div className="w-full h-1/2 bg-gradient-to-t from-emerald-500/20 to-transparent absolute top-0 origin-bottom animate-[spin_4s_linear_infinite]"></div>
                     </div>

                     {/* Grid Lines */}
                     <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                        <div className="w-full h-[1px] bg-white"></div>
                        <div className="h-full w-[1px] bg-white absolute"></div>
                     </div>

                     {/* Center Point (Lengnau) */}
                     <div className="absolute flex flex-col items-center z-50 transform -translate-y-1">
                        <div className="relative">
                            <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_20px_white] relative z-10"></div>
                            <div className="absolute inset-0 bg-safety rounded-full animate-ping opacity-100"></div>
                        </div>
                        <span className="mt-2 bg-safety text-white px-2 py-0.5 text-[9px] font-black rounded uppercase tracking-widest shadow-lg whitespace-nowrap">Lengnau</span>
                     </div>

                     {/* --- ZONE 1: < 15 MIN (Inner Circle) --- */}
                     {/* Radius ~25% */}
                     <div className="absolute w-[25%] h-[25%] border-2 border-dashed border-safety/30 rounded-full flex items-center justify-center pointer-events-none bg-safety/5">
                        <div className="absolute -top-4 text-[7px] font-bold text-safety bg-slate-900 px-1 rounded border border-safety/20">&lt; 15 MIN</div>
                     </div>
                     
                     <MapDot label="Grenchen" top="50%" left="38%" zone="rapid" />       {/* West */}
                     <MapDot label="Pieterlen" top="58%" left="42%" zone="rapid" />      {/* SW */}
                     <MapDot label="Arch" top="52%" left="62%" zone="rapid" />           {/* East */}

                     {/* --- ZONE 2: < 30 MIN (Middle Circle) --- */}
                     {/* Radius ~55% */}
                     <div className="absolute w-[55%] h-[55%] border border-emerald-500/40 rounded-full flex items-center justify-center pointer-events-none">
                        <div className="absolute bottom-4 text-[7px] font-bold text-emerald-500 bg-slate-900 px-1 rounded border border-emerald-500/20">&lt; 30 MIN</div>
                     </div>

                     {/* Key Cities in 30 Min Zone */}
                     <MapDot label="Biel/Bienne" top="70%" left="30%" zone="core" />    {/* SW */}
                     <MapDot label="Solothurn" top="55%" left="75%" zone="core" />      {/* East */}
                     <MapDot label="Büren" top="65%" left="60%" zone="core" />          {/* SE */}
                     {/* LYSS MOVED TO EXTENDED (BLUE) as requested */}

                     {/* --- ZONE 3: < 1H (Outer Circle) --- */}
                     {/* Radius ~90% */}
                     <div className="absolute w-[90%] h-[90%] border border-dashed border-blue-500/40 rounded-full flex items-center justify-center pointer-events-none opacity-80">
                         <div className="absolute top-4 text-[7px] font-bold text-blue-400 bg-slate-900 px-1 rounded border border-blue-500/20">&lt; 1 STD</div>
                     </div>

                     {/* Major Hubs in 1H Zone (BLUE) */}
                     <MapDot label="Lyss" top="80%" left="40%" zone="extended" />           {/* Moved from Core to Extended */}
                     <MapDot label="Bern" top="92%" left="45%" zone="extended" />           {/* South */}
                     <MapDot label="Moutier" top="20%" left="50%" zone="extended" />        {/* North */}
                     <MapDot label="St-Imier" top="60%" left="10%" zone="extended" align="right" />  {/* West */}
                     <MapDot label="Langenthal" top="40%" left="92%" zone="extended" align="left" /> {/* East */}
                     <MapDot label="Oensingen" top="48%" left="85%" zone="extended" align="left" />  {/* East */}
                     <MapDot label="Murten" top="88%" left="25%" zone="extended" />         {/* SW */}

                     {/* Peripheral (GREY) - As requested */}
                     <MapDot label="Neuchâtel" top="82%" left="15%" zone="peripheral" align="right" /> {/* SW */}
                     <MapDot label="Delémont" top="5%" left="35%" zone="peripheral" />        {/* North */}


                     {/* Legend Overlay */}
                     <div className="absolute bottom-6 right-6 flex flex-col gap-1.5 bg-slate-900/90 p-3 rounded border border-white/10 backdrop-blur-md pointer-events-none z-50 shadow-xl">
                        <div className="flex items-center gap-2">
                             <div className="w-1.5 h-1.5 rounded-full bg-safety border border-safety shadow-[0_0_5px_#FF3300]"></div>
                             <span className="text-[7px] font-mono text-safety uppercase tracking-wider">Express (&lt;15m)</span>
                        </div>
                        <div className="flex items-center gap-2">
                             <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 border border-emerald-600 shadow-[0_0_5px_#34d399]"></div>
                             <span className="text-[7px] font-mono text-emerald-400 uppercase tracking-wider">Core (&lt;30m)</span>
                        </div>
                        <div className="flex items-center gap-2">
                             <div className="w-1.5 h-1.5 rounded-full bg-blue-500 border border-blue-400 shadow-[0_0_5px_#3b82f6]"></div>
                             <span className="text-[7px] font-mono text-blue-400 uppercase tracking-wider">Extended (&lt;1h)</span>
                        </div>
                        <div className="flex items-center gap-2">
                             <div className="w-1.5 h-1.5 rounded-full bg-slate-600 border border-slate-500"></div>
                             <span className="text-[7px] font-mono text-slate-500 uppercase tracking-wider">Network</span>
                        </div>
                     </div>

                  </div>
               </div>
            </div>
         </div>
    </section>
  );
};
