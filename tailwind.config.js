/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        error: "hsl(0, 100%, 66%)",
        "gradient-light": "hsl(249, 99%, 64%)",
        "gradient-dark": "hsl(278, 94%, 30%)",
        muted: "hsl(270, 3%, 87%)",
        "light-violet": "hsl(279, 6%, 55%)",
        "dark-violet": "hsl(278, 68%, 11%)",
      },
      backgroundImage: {
        "card-front": "url('/src/assets/bg-card-front.png')",
        "card-back": "url('/src/assets/bg-card-back.png')",
        "main-desktop": "url('/src/assets/bg-main-desktop.png')",
        "main-mobile": "url('/src/assets/bg-main-mobile.png')",
      },
      fontSize: {
        xxs: "0.625rem",
      },
      outlineColor: {
        gradient: "hsl(249, 99%, 64%) to hsl(278, 94%, 30%)"
      }
    },
  },
  plugins: [],
};
