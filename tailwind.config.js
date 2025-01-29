/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,tsx,jsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bg-desk': "url('/src/assets/images/bg-sidebar-desktop.svg')",
        'bg-mobile' : "url('/src/assets/images/bg-sidebar-mobile.svg')",
      },
      screens: {
        mb: { min: "0", max: "1023px" }
      }
    },
  },
  plugins: [],
}

