module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        padding: "10px",
        screens: {
          lg: "1200px",
          xl: "1300px",
          "2xl": "1400px",
        },
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
      textColor: {
        skin: {
          base: "var(--color-text-base)",
          muted: "var(--color-text-muted)",
          inverted: "var(--color-text-inverted)",
          primary: "var(--color-primary)",
          footer: "var(--color-footer)",
          hover: "var(--color-hover)",
          secondary: "var(--color-secondary)",
        },
      },
      backgroundColor: {
        skin: {
          fill: "var(--color-fill)",
          "button-accent": "var(--color-button-accent)",
          "button-accent-hover": "var(--color-button-accent-hover)",
          "button-secondary": "var(--color-primary)",
          "button-secondary-hover": "var(--color-text-inverted)",
          primary: "var(--color-primary)",
          inverted: "var(--color-text-inverted)",
          gray: "var(--color-gray)",
          secondary: "var(--color-secondary)",
          hover: "var(--color-hover)",
        },
      },
      borderColor: {
        skin: {
          dark: "var(--color-text-base)",
          secondary: "var(--color-primary)",
        },
      },
      boxShadow:{
        SearchShadow: '0 2px 4px rgba(194, 235,	255)',
      }

      
    },
  },
  variants: {
    fill: ["hover"],
  },
};
