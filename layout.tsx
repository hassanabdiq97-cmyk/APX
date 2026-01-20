import React from 'react';
import './index.css'; // Assuming Tailwind is loaded via this or link in index.html in this preview env

// In a real Next.js app, import fonts like this:
// import { Inter, JetBrains_Mono } from 'next/font/google';
// const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
// const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata = {
  title: 'Apex Industrial | Schweizer Präzision für Instandhaltung',
  description: 'Ihr strategischer Partner für Instandhaltung, Retrofit und Notfall-Support in der Uhren- und Medizintechnik. Lokal verankert in Grenchen-Biel-Solothurn.',
  openGraph: {
    title: 'Apex Industrial | Future Maintenance Switzerland',
    description: 'CNC-Reparatur, Reinraum-Instandhaltung und Pikett-Service. 24/7 Support im Precision Cluster.',
    type: 'website',
    locale: 'de_CH',
  },
};

export default function RootLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    // In Next.js, <html> and <body> would be here. 
    // For this preview environment to work with the existing index.html, we render a fragment.
    // Copy this structure for your Vercel deployment:
    /*
    <html lang="de-CH" className="scroll-smooth">
      <body className="bg-slate-950 text-slate-100 antialiased selection:bg-safety selection:text-white overflow-x-hidden">
        <div className="bg-noise"></div>
        {children}
      </body>
    </html>
    */
    <>
      {children}
    </>
  );
}