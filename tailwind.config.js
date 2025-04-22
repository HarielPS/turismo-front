/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}", // Asegúrate de incluir la carpeta 'app' si la tienes
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        background: "var(--color-bg)",
        text: "var(--color-text)",
        "text-secondary": "var(--color-text-secondary)",
        detail: "var(--color-detail)",
      },
    },
  },
  plugins: [],
};
