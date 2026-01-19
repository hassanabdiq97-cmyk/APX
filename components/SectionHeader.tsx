import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  alignment?: 'left' | 'center';
  dark?: boolean; // Kept for API compatibility, but usually redundant in dark theme
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  subtitle, 
  alignment = 'center',
}) => {
  const alignClass = alignment === 'left' ? 'text-left' : 'text-center';
  const mxClass = alignment === 'center' ? 'mx-auto' : '';

  return (
    <div className={`mb-16 ${alignClass} max-w-4xl ${mxClass}`}>
      <div className={`flex flex-col ${alignment === 'center' ? 'items-center' : 'items-start'}`}>
        <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-safety rounded-none"></div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-safety font-mono">
            {subtitle}
            </span>
            <div className="w-20 h-[1px] bg-gradient-to-r from-safety to-transparent"></div>
        </div>
        
        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight leading-none mb-2">
            {title}
        </h2>
        
        {/* Decorative elements under title */}
        <div className="flex gap-1 mt-2">
            <div className="w-2 h-1 bg-slate-700"></div>
            <div className="w-2 h-1 bg-slate-700"></div>
            <div className="w-12 h-1 bg-slate-800"></div>
        </div>
      </div>
    </div>
  );
};