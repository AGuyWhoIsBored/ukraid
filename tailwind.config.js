const {
  "[data-theme=light]": lightTheme,
} = require("daisyui/src/colors/themes");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./client/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: [
      {
        // overriding some properties of the light theme we are using
        light: {
          ...lightTheme,
          primary: "#d1d5db", // base-300
          accent: "#10b981",
          "accent-focus": "#0fa674",
          // secondary: '#ff784f',
          // 'secondary-focus': '#ff5724'
        },
      },
    ],
  },
};
