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
        "govuk-blue": {
          DEFAULT: "#1D71B8",
          hover: "#155a94",
        },
      },
      keyframes: {
        bounce: {
          "0%, 100%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(-25%)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },
      animation: {
        "bounce-delay-0": "bounce 1s infinite 0ms",
        "bounce-delay-150": "bounce 1s infinite 150ms",
        "bounce-delay-300": "bounce 1s infinite 300ms",
      },
      ringColor: {
        "govuk-blue": "#1D71B8",
      },
    },
  },
  plugins: [],
};

export default config;
