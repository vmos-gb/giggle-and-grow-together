
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    fontFamily: {
      nunito: ["Nunito", "sans-serif"],
    },
    extend: {
      colors: {
        blush: "#fff0ee",
        peach: "#ffe2de",
        pink: "#fccde2",
        sky: "#e2f4fd",
        mint: "#d7fbe8",
        lavender: "#ece3fc",
        yellow: "#fff7d1",
        primary: {
          DEFAULT: "#ed75a3"
        },
        accent: "#7ee2e0",
        card: "#fff",
      },
      boxShadow: {
        card: "0 4px 24px 0 rgba(238,119,164,0.13)",
      },
      borderRadius: {
        card: "2rem"
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease',
        'fade-out': 'fade-out 0.3s ease',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0, transform: 'scale(0.96) translateY(10px)' },
          '100%': { opacity: 1, transform: 'scale(1) translateY(0)' }
        },
        'fade-out': {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 }
        }
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
