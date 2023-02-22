/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#669F2A',
          25: '#FAFDF7',
          50: '#F5FBEE',
          100: '#E6F4D7',
          200: '#CEEAB0',
          300: '#ACDC79',
          400: '#86CB3C',
          500: '#669F2A',
          600: '#4F7A21',
          700: '#3F621A',
          800: '#335015',
          900: '#2B4212',
        },
        secondary: {
          DEFAULT: '#4e5ba6',
          25: '#fcfcfd',
          50: '#f8f9fc',
          100: '#eaecf5',
          200: '#d5d9eb',
          300: '#b3b8db',
          400: '#717bbc',
          500: '#4e5ba6',
          600: '#3e4784',
          700: '#363f72',
          800: '#293056',
          900: '#101323',
        },
        gray: {
          25: '#FCFCFD',
          50: '#F9FAFB',
          100: '#F2F4F7',
          200: '#EAECF0',
          300: '#D0D5DD',
          400: '#98A2B3',
          500: '#667085',
          600: '#475467',
          700: '#344054',
          800: '#1D2939',
          900: '#101828',
        },
      },
      backgroundImage: {
        hero: "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('/hero-background.webp')",
      },
      screens: {
        hxl: '1400px',
      },
      fontSize: {
        md: ['16px', '24px'],
      },
      container: {
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
    },
  },
  plugins: [],
};
