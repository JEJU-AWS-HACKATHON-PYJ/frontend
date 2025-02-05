/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      screens: {
        'mobile': '275px', // iPhone 기준
        'tablet': '768px',
        'desktop': '1024px',
      },
      colors: {
        customOrange: '#FFAF6B', // 사용자 지정 색상 추가
      },
      maxWidth: {
        'app': '214px', // 모바일 앱 최대 크기
      },
    },
  },
  plugins: [],
};
