import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f97316',  // orange-500
        secondary: '#1f2937', // gray-800
        background: '#f8fafc', // slate-50
      },
      backgroundImage: {
        'notebook-paper': "url('/notebook-paper-bg.jpg')",
      },
    },
  },
  plugins: [],
};
export default config;
