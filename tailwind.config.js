/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        darkblue: "#15253e",
        darkblue2: "#294a7d",
        midblue: "#009bc4",
        lightblue: "#18b8d4",
        filterblue: "#009cc5",
      },
      boxShadow: {
        dark: "rgba(6, 24, 44, 0.1) 0px 0px 0px 2px, rgba(6, 24, 44, 0.4) 0px 2px 4px -1px, rgba(255, 255, 255, 0.05) 0px 1px 0px inset",
        light:
          "rgba(255, 255, 255, 0.4) 0px 0px 0px 1px, rgba(255, 255, 255, 0.4) 0px 1px 2px -1px, rgba(0, 0, 0, 0.05) 0px 1px 0px inset",

        "hover-dark": "rgba(0, 0, 0, 0.2) 0px 12px 30px 2px",
        "hover-light":
          "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.7) 0px -3px 0px inset",
      },
      fontFamily: {
        quick: ["Quicksand", "sans-serif"],
      },
      fontWeight: {
        light: 300,
        normal: 400,
        bold: 600,
      },
    },
  },
  plugins: [],
};
