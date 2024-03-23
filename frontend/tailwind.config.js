/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme';
import colors from 'tailwindcss/colors';

export default {
  darkMode: 'selector',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Varela Round', ...defaultTheme.fontFamily.sans],
        loader: ['Nosifer'],
      },
      colors: {
        primary: {
          DEFAULT: '#EA8B0F',
          100: '#2f1c03',
          200: '#5e3806',
          300: '#8d5409',
          400: '#bc700c',
          500: '#ea8b0f',
          600: '#f3a33b',
          700: '#f6ba6c',
          800: '#f9d19d',
          900: '#fce8ce',
        },
        secondary: {
          DEFAULT: '#C3761C',
          100: '#271806',
          200: '#4f2f0b',
          300: '#764711',
          400: '#9d5e16',
          500: '#c3761c',
          600: '#e29237',
          700: '#eaae69',
          800: '#f1c99b',
          900: '#f8e4cd',
        },
        black: {
          DEFAULT: '#000000',
          100: '#000000',
          200: '#000000',
          300: '#000000',
          400: '#000000',
          500: '#000000',
          600: '#333333',
          700: '#666666',
          800: '#999999',
          900: '#cccccc',
        },
        darkBg: {
          DEFAULT: '#121212',
        },
        darkText: {
          DEFAULT: '#e3e3e3',
        },
        dashboardPrimary: {
          DEFAULT: '#141b2d',
        },
        dashboardSecondary: {
          DEFAULT: '#1f2940',
        },
        dashboardText: {
          DEFAULT: '#e1e2e5'
        }
      },
    },
  },
  plugins: [],
};
