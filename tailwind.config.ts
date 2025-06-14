
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
        blush: "#FFF6F2",            // Background: whiter, more contrasty
        peach: "#FFD7CF",            // Button highlight (higher contrast)
        pink: {
          DEFAULT: "#F65199",        // Accent: deeper, more contrasty pink
          100: "#FED6E8",            // Light shade if needed
        },
        sky: "#e2f4fd",
        mint: {
          DEFAULT: "#24B47E",        // Make mint more vivid and readable
          100: "#D8FFF2",
        },
        lavender: "#6761A8",         // Higher contrast lavender
        yellow: "#FFD600",           // Brighter yellow for badges/icons
        primary: {
          DEFAULT: "#D72660",        // Main brand: vivid high-contrast pink-red
        },
        accent: "#0099E5",           // Accent blue
        card: "#fff",                // Cards/backgrounds
        contrast: "#22223B",         // Universal readable text
      },
      boxShadow: {
        card: "0 4px 24px 0 rgba(213,38,96,0.19)", // adjust for new pink
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
