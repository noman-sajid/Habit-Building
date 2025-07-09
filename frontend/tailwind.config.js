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

        // Optional: Mid steps (if you want 450 / 550-like shades)
        amber: {
          450: "#f8af1f", // Custom mid-tone between 400 & 500
          550: "#e89c00", // Custom mid-tone between 500 & 600
        },
        stone: {
          950: "#0c0a09", // Extra dark
        }
      },
    },
  },
  plugins: [],
};
