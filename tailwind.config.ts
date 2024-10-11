import type { Config } from "tailwindcss";

const config: Config = {
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
        encSky: '#C3EBFA',
        encSkyLight: '#EDF9FD',
        encPurple: '#CFCEFF',
        encPurpleLight: '#F1F0FF',
        encYellow: '#FAE27C',
        encYellowLight: '#FEFCEB',
      },
    },
  },
  plugins: [],
};
export default config;
