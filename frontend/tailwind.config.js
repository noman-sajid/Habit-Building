/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        light: '0 4px 6px rgba(0, 0, 0, 0.1)',     // default light shadow
        dark: '0 4px 6px rgba(255, 255, 255, 0.05)', // subtle light-ish shadow for dark bg
      },
      colors: {
        primary: "#f59e0b",   // Amber-500
        secondary: "#eab308", // Amber-400 or slightly deeper
        accent: "#fcd34d",    // Amber-300
        neutral: "#f5f5f4",   // Stone-100
        dark: "#1c1917",      // Stone-900
        danger: "#ef4444",    // Red-500
        amber: {
          450: "#f8af1f",     // Custom mid-tone between 400 & 500
          550: "#e89c00",     // Custom mid-tone between 500 & 600
        },
        stone: {
          950: "#0c0a09",     // Extra dark
        },
      },
      keyframes: {
        'zoom-fade-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'zoom-fade-out': {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.9)' },
        },
        fadeIn: {
          '0%': { opacity: 0, transform: 'scale(0.97)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        fadeOut: {
          '0%': { opacity: 1, transform: 'scale(1)' },
          '100%': { opacity: 0, transform: 'scale(0.95)' },
        },
      },
      animation: {
        'zoom-fade-in': 'zoom-fade-in 0.3s ease-out',
        'zoom-fade-out': 'zoom-fade-out 0.4s ease-in forwards',
        'fade-in': 'fadeIn 0.3s ease-out',
        'fade-out': 'fadeOut 0.3s ease-in forwards',
      },
    },
  },
  plugins: [],
};
