/** @type {import('tailwindcss').Config} */
import tailwindScrollbar from "tailwind-scrollbar";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      zIndex: {
        100: "100",
        1002: "1002",
        1003: "1003",
      },
    },
  },
  plugins: [tailwindScrollbar],
};
