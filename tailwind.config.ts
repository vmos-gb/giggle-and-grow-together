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
      nunito: [
        "Nunito",
        "-apple-system", "BlinkMacSystemFont", "\"Segoe UI\"",
        "Roboto", "Oxygen", "Ubuntu", "Cantarell", "\"Helvetica Neue\"", "sans-serif"
      ],
      sans: [
        "-apple-system", "BlinkMacSystemFont", "\"Segoe UI\"",
        "Roboto", "Oxygen", "Ubuntu", "Cantarell", "\"Helvetica Neue\"", "sans-serif"
      ]
    },
    extend: {
      colors: {
        // Brand blue ("his")
        blue: {
          DEFAULT: "#5A9BF6",
          dark: "#3B7CD3",
        },
        // Brand pink ("hers")
        pink: {
          DEFAULT: "#FF6B91",
          dark: "#E04268",
        },
        // Neutrals and backgrounds
        white: "#FFFFFF",
        lightgray: "#F2F4F8",
        dark: "#222222",
        card: "#F2F4F8",
        contrast: "#222222",
        primary: {
          DEFAULT: "#FF6B91",    // Use for main actions (hers/pink)
          dark: "#E04268"
        },
        secondary: {
          DEFAULT: "#5A9BF6",    // Use for alt/"his" buttons
          dark: "#3B7CD3"
        }
      },
      borderRadius: {
        card: "2rem",
        soft: "1.2rem",
        xl: "1.5rem"
      },
      boxShadow: {
        card: "0 4px 24px 0 rgba(90,155,246,0.08)", // Soft blue shadow
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
