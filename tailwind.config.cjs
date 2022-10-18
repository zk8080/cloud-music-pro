/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        88: '22rem',
        112: '28rem',
        128: '32rem'
      },
      colors: {
        primary: `rgba(var(--semi-pink-5), <alpha-value>)`
      },
      width: {
        '24/100': '24%'
      },
      rotate: {
        '360': '360deg',
      },
      maxWidth: {
        'heart': '1440px'
      }
    },
  },
  plugins: [],
}