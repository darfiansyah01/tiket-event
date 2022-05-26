module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    fontSize: {
      super:['8px', '10px'],
      badge:['10px', '12px'],
      t11:['11px', '14px'],
      t12:["12px", '16px'],
      sm:["14px", '20px'],
      base:['16px', '20px'],
      md:['20px','24px'],
      xl2:['32px','36px']
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
