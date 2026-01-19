import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 py-12 border-t border-slate-900 text-[10px] font-mono text-slate-600">
       <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
             <div className="w-4 h-4 bg-safety"></div>
             <span className="text-white font-bold tracking-widest">APEX INDUSTRIAL SWISS</span>
          </div>
          <div className="flex gap-8 uppercase tracking-widest">
             <a href="#" className="hover:text-safety transition-colors">Impressum</a>
             <a href="#" className="hover:text-safety transition-colors">Datenschutz</a>
             <a href="#" className="hover:text-safety transition-colors">AGB</a>
          </div>
          <div>
             GRENCHEN // BIEL // SOLOTHURN
          </div>
       </div>
    </footer>
  );
};