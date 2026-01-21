'use client';

import React from 'react';
import { SettingsProvider } from '../contexts/SettingsContext';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SettingsProvider>
      {children}
    </SettingsProvider>
  );
}
