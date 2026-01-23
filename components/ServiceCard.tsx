'use client';

import React, { useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceCardProps {
  service: ServiceItem;
  index: number;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  const divRef = useRef<HTMLDivElement>(null);

  // PROFESSOR OPTIMIZATION:
  // Instead of triggering a React State update (and re-render) on every pixel of mouse movement,
  // we update CSS variables directly on the DOM element. 
  // This keeps the JavaScript thread free and leaves the rendering to the GPU/Compositor.
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    divRef.current.style.setProperty('--mouse-x', `${x}px`);
    divRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div 
      ref={divRef}
      onMouseMove={handleMouseMove}
      className="group relative h-full bg-slate-900 border border-white/5 overflow-hidden transition-colors hover:border-white/10"
      style={{
        // Default values to prevent jumpiness before first interaction
        '--mouse-x': '0px',
        '--mouse-y': '0px',
      } as React.CSSProperties}
    >
      {/* Spotlight Effect Layer via CSS Variables */}
      <div 
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255, 51, 0, 0.08), transparent 40%)`
        }}
      />
      
      {/* Border Spotlight Layer via CSS Variables */}
      <div 
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(255, 51, 0, 0.4), transparent 40%)`,
          maskImage: 'linear-gradient(black, black), linear-gradient(black, black)',
          maskClip: 'content-box, border-box',
          padding: '1px',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor'
        }}
      />

      <div className="relative p-8 h-full flex flex-col z-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 bg-slate-800/50 border border-white/10 flex items-center justify-center text-safety group-hover:scale-110 group-hover:bg-safety group-hover:text-white transition-all duration-300">
            <service.icon size={24} strokeWidth={1.5} />
          </div>
          <span className="font-mono text-[10px] text-slate-600 group-hover:text-safety transition-colors border border-slate-800 px-2 py-1 rounded-sm">
            MOD_0{index + 1}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wide group-hover:text-safety transition-colors">
          {service.title}
        </h3>
        
        <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow border-l border-slate-800 pl-4 group-hover:border-safety/30 transition-colors">
          {service.description}
        </p>
        
        <div className="mt-auto flex items-center text-xs font-bold text-slate-500 uppercase tracking-widest group-hover:text-white transition-colors">
          <span className="mr-2">Details</span>
          <div className="h-[1px] w-4 bg-slate-700 group-hover:w-12 group-hover:bg-safety transition-all duration-300 mr-2"></div>
          <ChevronRight size={14} className="text-safety" />
        </div>
      </div>
    </div>
  );
};