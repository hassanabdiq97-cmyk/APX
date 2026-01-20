'use client';

import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/60 dark:bg-slate-950/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-slate-950">
          <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono pr-8">
             {title}
          </h3>
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 p-2 text-slate-400 hover:text-safety transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-white/5"
            aria-label="Schliessen"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Body */}
        <div className="p-6 md:p-8 overflow-y-auto bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300">
           {children}
        </div>
        
        {/* Footer Accent */}
        <div className="h-1 w-full bg-gradient-to-r from-safety to-transparent"></div>
      </div>
    </div>,
    document.body
  );
};