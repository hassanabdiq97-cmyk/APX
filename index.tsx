import React from 'react';
import ReactDOM from 'react-dom/client';
import RootLayout from './layout';
import Page from './page';
import { SettingsProvider } from './contexts/SettingsContext';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <SettingsProvider>
      <RootLayout>
        <Page />
      </RootLayout>
    </SettingsProvider>
  </React.StrictMode>
);