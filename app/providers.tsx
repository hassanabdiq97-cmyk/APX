'use client';

import React, { PropsWithChildren } from 'react';
import { SettingsProvider } from '../contexts/SettingsContext';

export function Providers({ children }: PropsWithChildren<{}>) {
  return (
    <SettingsProvider>
      {children}
    </SettingsProvider>
  );
}