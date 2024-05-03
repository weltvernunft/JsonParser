/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        default: "#D9D9D9",
        "hover-default": "#d9d9d9",
        disabled: "#E3DAF9",
        primary: "#6E41E2",
        hover: "#5835B0",
        active: "#472C8A",
        "white-s": "rgba(255, 255, 255, .88)",
        "gray-m": "#fafafa",
        "gray-l": "#f1f1f1",
        "gray-s": "#d4d4d4",
        gray: "rgba(17, 17, 17, 0.48)",
        "gray-k": "#6b6b6b",
        black: "#111",
        "red-girl": "#F9E3E3",
        "red-boy": "#F2CACA",
        red: "#DB524E",
        "super-red": "#C7302B",
        green: "#27AE60",
        blue: "#428BF9",
      },
      screens: {
        xs: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};
