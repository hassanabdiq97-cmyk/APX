'use client';

import React, { useState } from 'react';
import { Calculator, Activity } from 'lucide-react';
import { Button } from './Button';

export const DowntimeCalculator: React.FC = () => {
  const [employees, setEmployees] = useState(15);
  const [hourlyRate, setHourlyRate] = useState(120);
  const [downtimeHours, setDowntimeHours] = useState(4);
  const [machineCost, setMachineCost] = useState(800);

  const totalCost = (employees * hourlyRate * downtimeHours) + (downtimeHours * machineCost);

  return (
    <section className="py-24 bg-slate-950 border-y border-white/5 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="w-full max-w-4xl mx-auto bg-slate-900 border border-white/10 p-8 md:p-12 relative overflow-hidden group hover:border-safety/30 transition-colors shadow-2xl">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <Calculator size={200} />
          </div>
          
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            {/* Input Section */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                 <Activity className="text-safety animate-pulse" size={20} />
                 <h3 className="text-xl font-bold text-white uppercase tracking-widest">Downtime Matrix</h3>
              </div>
              <h4 className="text-3xl font-black text-white mb-4">DER PREIS DES STILLSTANDS</h4>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                In der Hochpräzisionsfertigung kostet jede Minute Marge. Berechnen Sie hier das Risiko eines ungeplanten Ausfalls ohne Wartungsvertrag.
              </p>
              
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-500 mb-2 uppercase">
                    <span>Produktions-Team</span>
                    <span className="text-white font-bold">{employees} MA</span>
                  </div>
                  <input 
                    type="range" min="1" max="50" value={employees} onChange={(e) => setEmployees(Number(e.target.value))}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-safety hover:accent-white"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-500 mb-2 uppercase">
                    <span>Vollkosten / Std (CHF)</span>
                    <span className="text-white font-bold">CHF {hourlyRate}.-</span>
                  </div>
                  <input 
                    type="range" min="80" max="250" value={hourlyRate} onChange={(e) => setHourlyRate(Number(e.target.value))}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-safety hover:accent-white"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-500 mb-2 uppercase">
                    <span>Ausfallzeit (Std)</span>
                    <span className="text-white font-bold">{downtimeHours} h</span>
                  </div>
                  <input 
                    type="range" min="1" max="24" value={downtimeHours} onChange={(e) => setDowntimeHours(Number(e.target.value))}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-safety hover:accent-white"
                  />
                </div>
              </div>
            </div>

            {/* Result Section */}
            <div className="bg-slate-950 border border-white/5 p-8 flex flex-col items-center justify-center text-center relative h-full">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-safety to-transparent opacity-20"></div>
              
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Verlustrisiko pro Vorfall</div>
              <div className="text-5xl md:text-6xl font-black text-white font-mono mb-2 tracking-tight">
                CHF {totalCost.toLocaleString('de-CH')}
              </div>
              <div className="text-[10px] text-safety uppercase tracking-widest font-bold bg-safety/10 px-3 py-1 mb-8 border border-safety/20">
                Finanzieller Impact: Kritisch
              </div>
              <Button size="sm" onClick={() => document.getElementById('kontakt')?.scrollIntoView({behavior: 'smooth'})}>
                Risiko Minimieren
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};