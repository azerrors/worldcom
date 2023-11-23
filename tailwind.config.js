/* eslint-disable import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      keyframes: {
        moveInLeft: {
          "0%": { transform: "translateX(-50%)", opacity: "0" },
          "80%": { transform: "translateX(5px)" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        moveInRight: {
          "0%": { transform: "translateX(50%)", opacity: "0" },
          "80%": { transform: "translateX(-5px)" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        moveInTop: {
          "0%": { transform: "translateY(-50%)", opacity: "0" },
          "80%": { transform: "translateY(5px)" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        moveInBottom: {
          "0%": { transform: "translateY(150%)", opacity: "0" },
          "80%": { transform: "translateY(5px)" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        rotate: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: " rotate(360deg)",
          },
        },
      },
      animation: {
        moveInLeft: "moveInLeft 2s",
        moveInTop: "moveInTop 2s",
        rotate: "rotate 2s infinite 2.2s , moveInRight 2s",
        moveInRight: "moveInRight 2s",
        moveInBottom: "moveInBottom 2s",
      },
      colors: {
        // primary_light: "#d2d3db",
        // secondary_light: "#484b6a",

        // primary_light: "#77ABB7",
        // secondary_light: "#1D3E53",

        // primary_light: "#D2E3C8",
        // secondary_light: "#86A789",

        // primary_light: "#C2DEDC",
        // secondary_light: "#116A7B",

        // primary_light: "#C2DEDC",

        primary_dark: "#244240 ",
        secondary_dark: "#040D12",
        triatary_dark: "#000102",

        primary_light: "#93B1A6",
        triatary_light: "#122f2f  ",
        secondary_light: "#183D3D",

        // primary_dark: "#2C74B3",
        // secondary_dark: "#0A2647",
      },
    },

    fontFamily: {
      sans: ["Quicksand", "sans-serif"],
    },
  },
  plugins: [],
};
