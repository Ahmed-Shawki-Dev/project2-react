/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,html}", // غيّر حسب مكان ملفاتك
    "./public/index.html", // لو بتستخدم HTML في public
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1e3a8a",
        darkBg: "#0d0d0d",
        softWhite: "#f9f9fb",
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "4rem",
        "2xl": "6rem",
      },
    },
  },
  plugins: [],
};
