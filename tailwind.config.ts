import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f4f9",
          100: "#dbe5f2",
          200: "#bbceea",
          300: "#8fafe0",
          400: "#5f8ad3",
          500: "#3b6bc6",
          600: "#2850a9",
          700: "#1f3e89",
          800: "#0F2C59", // Primary Engineering Blue
          900: "#0A1E3F", // Dark Corporate Blue
          950: "#061227",
        },
        accent: {
          DEFAULT: "#E59B24", // Industrial Amber Gold
          hover: "#C88316",
          light: "#FFF6E5",
          dark: "#B0700B",
        },
        engineering: {
          dark: "#0b1528",
          card: "#122240",
          border: "#1E3A6E",
          subtle: "#F4F7FA",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-montserrat)", "sans-serif"],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(15, 44, 89, 0.15)',
        'card-hover': '0 20px 40px -15px rgba(15, 44, 89, 0.12)',
        'cta': '0 10px 25px -5px rgba(229, 155, 36, 0.4)',
      },
    },
  },
  plugins: [],
};

export default config;
