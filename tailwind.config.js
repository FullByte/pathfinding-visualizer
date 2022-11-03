/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '400px',
      sm: '640px',
      mds: '652px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        primary: {
          black: "#0C0C0D",
          white: "#FFFFFF",
          blue: "#3377FF",
          green: "#3DB958",
          yellow: "#F5C237",
          red: "#E13251",
          purple: "#884FF2",
        },
        system: {
          grey1: "#F8F8F8",
          grey2: "#ECEDED",
          grey3: "#C3C4C8",
          grey4: "#969BA5",
          grey5: "#6E717A",
          grey6: "#292A2D",
          grey7: "#131416",
        },
        dark: {
          blue1: "#122FC8",
          blue2: "#080E8A",
          green1: "#1A7047",
          green2: "#043E22",
          yellow1: "#D1963C",
          yellow2: "#945901",
          red1: "#AB1035",
          red2: "#6D001A",
          purple1: "#5E0CC6",
          purple2: "#330371",
        },
        light: {
          blue1: "#6F9FFF",
          blue2: "#D3E1FC",
          green1: "#80E0A5",
          green2: "#DAFBE7",
          yellow1: "#F1E18F",
          yellow2: "#FFF9DA",
          red1: "#EF7C98",
          red2: "#FED0DB",
          purple1: "#B57AFF",
          purple2: "#D9D3FD",
        },
      },
      textColor: (theme) => theme("colors"),
      caretColor: (theme) => theme("colors"),
      divideColor: (theme) => theme("colors"),
      backgroundColor: (theme) => theme("colors"),
      keyframes: {
        toggleOff: {
          "0%": { transform: "scale(1) rotate(0deg)" },
          "100%": { transform: "scale(0.5) rotate(-360deg)", opacity: 50 },
        },
        toggleOn: {
          "0%": { transform: "scale(0.5) rotate(-180deg)", opacity: 50 },
          "60%": { transform: "scale(1) rotate(-380deg)" },
          "80%": { transform: "rotate(25deg)" },
          "100%": { transform: "rotate(-5deg)" },
        },
        traversed: {
          "0%": {
            transform: "scale(0.3)",
            backgroundColor: "rgba(147, 51, 234, 0.75)",
            borderRadius: "100%",
          },
          "50%": {
            backgroundColor: "rgba(79, 70, 229, 0.75)",
          },
          "75%": {
            transform: "scale(1.2)",
            backgroundColor: "rgba(59, 130, 246, 0.75)",
          },
          "100%": {
            transform: "scale(1)",
            backgroundColor: "rgba(34, 211, 238, 1)",
          },
        },
        path: {
          "0%": {
            transform: "scale(0.3)",
            backgroundColor: "rgba(225, 29, 72, 0.75)",
            borderRadius: "100%",
          },
          "50%": {
            backgroundColor: "rgba(234, 88, 12, 0.75)",
          },
          "75%": {
            transform: "scale(1.2)",
            backgroundColor: "rgba(251, 146, 60, 0.75)",
          },
          "90%": {
            transform: "scale(0.8)",
            backgroundColor: "rgba(253, 230, 138, 1)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
        wall: {
          "0%": {
            transform: "scale(0.7)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
      },
      animation: {
        traversed: "traversed 1.5s cubic-bezier(0, 0, 0.2, 1)",
        path: "path 1.5s cubic-bezier(0, 0, 0.2, 1)",
        wall: "wall 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};
