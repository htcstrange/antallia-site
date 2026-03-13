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
        dark: {
          900: "#0a0a0f",
          800: "#0f0f18",
          700: "#161625",
          600: "#1e1e32",
          500: "#2a2a42",
        },
        neon: {
          purple: "#a855f7",
          cyan: "#22d3ee",
          pink: "#ec4899",
          green: "#34d399",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        neon: "0 0 20px -4px rgba(168, 85, 247, 0.4)",
        "neon-cyan": "0 0 20px -4px rgba(34, 211, 238, 0.4)",
        "neon-lg": "0 0 40px -8px rgba(168, 85, 247, 0.5)",
        card: "0 2px 20px -4px rgba(0, 0, 0, 0.5)",
      },
      animation: {
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 20px -4px rgba(168, 85, 247, 0.3)" },
          "100%": { boxShadow: "0 0 30px -2px rgba(168, 85, 247, 0.6)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
