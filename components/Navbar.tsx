import React, { useState, useEffect } from 'react';
import { Menu, X, AlertTriangle } from 'lucide-react';
import { Button } from './Button';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Status Bar */}
      <div className="bg-slate-950 border-b border-white/5 py-1 px-4 text-[10px] font-mono text-slate-500 flex justify-between items-center backdrop-blur-sm z-50 relative hidden md:flex">
        <div className="flex gap-4">
           <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> SYSTEM STATUS: ONLINE</span>
           <span className="text-slate-600">|</span>
           <span>ISO 9001 ZERTIFIZIERT</span>
        </div>
        <div className="flex gap-4">
           <span>GRENCHEN // BIEL // SOLOTHURN</span>
           <a href="tel:+41321234567" className="text-safety hover:text-white transition-colors cursor-pointer font-bold">PIKETT: +41 32 123 45 67</a>
        </div>
      </div>

      {/* Main Navigation */}
      <header className={`sticky top-0 z-40 transition-all duration-500 border-b ${isScrolled ? 'bg-slate-950/95 backdrop-blur-md border-white/10 shadow-2xl' : 'bg-transparent border-transparent'}`}>
        <div className="container mx-auto px-4 md:px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => scrollTo('hero')}>
             <div className="relative w-10 h-10 flex items-center justify-center bg-slate-900 border border-slate-700 group-hover:border-safety transition-colors overflow-hidden">
               <div className="absolute inset-0 bg-safety/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
               <span className="font-black text-white relative z-10 text-xl tracking-tighter">APX</span>
             </div>
             <div>
               <div className="font-bold text-white tracking-widest uppercase text-sm leading-none mb-1">Apex Industrial</div>
               <div className="text-[9px] text-safety font-mono tracking-[0.3em] uppercase leading-none">Swiss Precision</div>
             </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {['Leistungen', 'Branchen', 'Expertise'].map((item) => (
              <button key={item} onClick={() => scrollTo(item.toLowerCase())} className="text-xs font-bold text-slate-400 hover:text-white uppercase tracking-widest transition-colors relative group py-2">
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-safety transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
            <Button variant="primary" size="sm" onClick={() => scrollTo('kontakt')}>
              <AlertTriangle size={14} className="mr-2" />
              Notfall-Pikett
            </Button>
          </nav>

          <button className="md:hidden text-white p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-20 left-0 w-full bg-slate-950 border-b border-white/10 p-6 flex flex-col gap-6 md:hidden shadow-2xl">
            {['Leistungen', 'Branchen', 'Expertise'].map((item) => (
              <button key={item} onClick={() => scrollTo(item.toLowerCase())} className="text-left text-sm font-bold text-slate-300 uppercase tracking-widest border-b border-white/5 pb-4">
                {item}
              </button>
            ))}
            <Button fullWidth variant="primary" onClick={() => scrollTo('kontakt')}>
              Pikett Rufen
            </Button>
          </div>
        )}
      </header>
    </>
  );
};