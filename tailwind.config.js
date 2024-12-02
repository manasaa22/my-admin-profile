/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // or 'media'
  theme: {
    extend: {
      colors: {
        // Add your color definitions for light and dark themes if needed
        primary: {
          light: '#f5f5f5',
          dark: '#333333',
        },
        secondary: {
          light: '#ffffff',
          dark: '#444444',
        },
        // Add more colors as needed
      },
    },
  },
  plugins: [],
}
