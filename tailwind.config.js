module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "media", // or false or 'class'
  theme: {
    extend: {
      backgroundColor: ['group-hover, hover']
       },
  },
  variants: {
    display: ['group-hover']},
  plugins: [],
}
