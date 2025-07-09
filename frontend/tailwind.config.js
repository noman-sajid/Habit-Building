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
