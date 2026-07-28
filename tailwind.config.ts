import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1c1f26", // charcoal — headlines / CTAs
        navy: "#22304a", // brand primary (suit/slack tone)
        steam: "#eceef1", // page bg (pressed-cotton)
        paper: "#ffffff",
        line: "#d5dae0", // hairline (seam)
        muted: "#6b727b",
        amber: "#cf8a2c", // single accent — discount tags / sticky highlight
      },
      fontFamily: {
        sans: ["var(--font-anuphan)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-bodoni)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
