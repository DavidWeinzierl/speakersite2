/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        accent: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#00f5c3', // Original teal color
          600: '#00d1a7', // Original hover color
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        dark: {
          primary: '#121212', // Original primary bg
          secondary: '#1e1e1e', // Original secondary bg
          border: '#333333', // Original border color
        }
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Poppins', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
