import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      sm0: { max: "530px" },
      sm1: { min: "531px", max: "640px" },
      sm2: { max: "850px" },
    },
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        popUp: {
          "0%": { transform: "translateY(40px)" },
          "100%": { transform: "translateY(0px)" },
        },
        visibleDownList: {
          "0%": {
            "max-height": "0",
            padding: "4px 8px 4px 0px",
          },
          "50%": {
            "box-shadow": "0 1.5px 4px 0px rgba(100, 100, 100, .1)",
            "padding-left": "2px",
          },
          "100%": {
            "max-height": "120px",
            "box-shadow": "0 1.5px 4px 0px rgba(100, 100, 100, .6)",
            padding: "4px 8px 4px 8px",
          },
        },
        unVisibleList: {
          "0%": {
            "max-height": "120px",
            padding: "4px 8px 4px 8px",
            "box-shadow": "0 1.5px 4px 0px rgba(100, 100, 100, .1)",
          },
          "90%": {
            "padding-left": "4px",
          },
          "100%": {
            "max-height": "0",
            ppadding: "0px",
            "box-shadow": "0 1.5px 4px 0px rgba(100, 100, 100, .6)",
          },
        },
        visibleDownReason: {
          "0%": {
            height: "0px",
            padding: "0px",
            opacity: "0",
          },
          "100%": {
            height: "5rem",
            padding: "4px 8px 4px 8px",
            opacity: "1",
          },
        },
        unVisibleDownReason: {
          "0%": {
            height: "5rem",
            padding: "4px 8px 4px 8px",
            opacity: "1",
          },
          "90%": {
            "padding-left": "2px",
          },
          "100%": {
            height: "0px",
            padding: "0px",
            opacity: "0",
          },
        },
      },
      animation: {
        "bounce-fast": "bounce .8s ease-in-out infinite alternate",
        fadeIn: "fadeIn .3s ease-in-out forwards",
        fadeOut: "fadeOut .3s ease-in-out forwards",
        popUp: "popUp .5s ease-out forwards",
        visibleDownList: "visibleDownList .3s ease-out forwards",
        unVisibleList: "unVisibleList .3s ease-out forwards",
        visibleDownReason: "visibleDownReason .3s ease-out forwards",
        unVisibleDownReason: "unVisibleDownReason .3s ease-out forwards",
        fadeInLoop: "fadeIn .5s ease-in-out infinite alternate",
        fadeInLoop2: "fadeIn .5s ease-in-out infinite alternate .1s",
        fadeInLoop3: "fadeIn .5s ease-in-out infinite alternate .2s",
      },
      colors: {
        primary: "#7cb855",
        secondary: "#469b4c",
        light: "#bbe06c",
        dark: "#222831",
        dark2: "#313944",
        bright: "#eee",
        gray: "#686868",
        blackCustom: "rgba(0,0,0,0.4)",
      },
    },
    boxShadow: {
      custom: "0px 1px 5px 0px rgba(100, 100, 100, .4)",
      custom2: "0 0 8px 0px #7cb855",
      thin: "0 1.5px 4px 0px rgba(100, 100, 100, .6)",
      inset: "0 0 0px 2px inset #7cb855",
      "inset-darkMode": "0 0 8px 0px inset #222831",
      "inset-whiteMode":
        "2px 2px 4px 0px inset #9ea1a7, 0px 0px 4px 0px #9ea1a7",
    },
  },
  plugins: [],
};
export default config;
