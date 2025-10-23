import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#166534", sand: "#E3D5C3", sunset: "#F97316" }
      }
    }
  },
  plugins: []
} satisfies Config;
