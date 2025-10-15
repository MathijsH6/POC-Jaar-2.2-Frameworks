module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,html}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Helvetica', 'Arial'],
      },
    },
  },
  plugins: [], // voeg '@tailwindcss/typography' toe als je die hebt geïnstalleerd
};
