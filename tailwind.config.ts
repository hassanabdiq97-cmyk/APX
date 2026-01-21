import type { Config } from "tailwindcss";

// Tailwind CSS v4 configuration is handled via app/globals.css @theme block.
// This file is kept minimal to prevent conflicts.
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [],
};
export default config;