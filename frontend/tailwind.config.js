/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0C',
        cyan: {
          400: '#00F0FF',
        },
        purple: {
          500: '#8A2BE2',
        },
        obsidian: '#0A0A0C',
        graphite: '#1A1A1E',
      },
      fontFamily: {
        header: ['Geist', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'neo-brutalist': '8px 8px 0px 0px #000000',
        'neo-brutalist-sm': '4px 4px 0px 0px #000000',
        'neon-cyan': '0 0 20px rgba(0, 240, 255, 0.4)',
        'neon-purple': '0 0 20px rgba(138, 43, 226, 0.4)',
      },
      borderWidth: {
        '4': '4px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
