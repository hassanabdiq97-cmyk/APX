'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'tech';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  className = '', 
  fullWidth = false,
  ...props 
}) => {
  const baseStyles = "group relative inline-flex items-center justify-center font-bold uppercase tracking-wider transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed font-mono rounded-sm";
  
  // Styles resembling machine controls
  const variants = {
    primary: "bg-safety text-white hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-safety border border-transparent hover:shadow-[0_0_20px_rgba(255,68,0,0.6)]",
    secondary: "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-300 dark:hover:bg-slate-700",
    outline: "bg-transparent border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-safety hover:text-safety dark:hover:text-safety",
    ghost: "bg-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5",
    tech: "bg-transparent border-y border-safety/30 text-safety hover:bg-safety/10 hover:border-safety",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-8 py-4 text-xs",
    lg: "px-10 py-5 text-sm",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      {...props}
    >
      {/* Technical corner markers for Primary */}
      {variant === 'primary' && (
        <>
          <span className="absolute top-0 left-0 w-1 h-1 bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="absolute bottom-0 right-0 w-1 h-1 bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
        </>
      )}
      
      <span className="relative z-10 flex items-center">
        {icon && <span className="mr-3">{icon}</span>}
        {children}
        {variant === 'primary' && <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />}
      </span>
    </button>
  );
};