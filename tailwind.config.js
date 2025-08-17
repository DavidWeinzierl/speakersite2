/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        accent: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6', // Bright blue accent
          600: '#2563eb', // Darker blue for hover
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        light: {
          primary: '#ffffff', // Light primary background
          secondary: '#f8fafc', // Light secondary background
          border: '#e2e8f0', // Light border color
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
