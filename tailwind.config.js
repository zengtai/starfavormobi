const plugin = require("tailwindcss/plugin");

module.exports = {
  // mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        loading: "url('../public/images/loading.svg')",
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("third", "&:nth-child(11n+9)");
    }),
  ],
};
