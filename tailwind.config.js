/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      screens: {
        'mobile': '375px', // iPhone 기준
        'tablet': '768px',
        'desktop': '1024px',
      },
      maxWidth: {
        'app': '414px', // 모바일 앱 최대 크기
      },
    },
  },
  plugins: [],
};
