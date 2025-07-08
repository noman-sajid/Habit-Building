/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], 
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: "#10B981",    // Emerald Green
        secondary: "#38BDF8",  // Sky Blue
        accent: "#FACC15",     // Warm Yellow
        neutral: "#F3F4F6",    // Light Gray
        dark: "#1F2937",       // Dark Gray
        danger: "#F87171",     // Soft Red
      },
    },
  },
  plugins: [],
};
