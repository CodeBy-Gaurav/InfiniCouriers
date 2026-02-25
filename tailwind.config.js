export default {
  content: [
    "./src/pages/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/app/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          red: '#E51B23',
          dark: '#1a1a1a',
          DEFAULT: '#E51B23',
        },
        accent: {
          red: '#E51B23',
          orange: '#FF6B35',
          DEFAULT: '#E51B23',
        },
        background: {
          DEFAULT: '#ffffff',
          dark: '#0a0a0a',
          gray: '#f5f5f5',
        },
        text: {
          DEFAULT: '#333333',
          light: '#666666',
          dark: '#1a1a1a',
        },
        success: '#10B981',
        warning: '#FBBF24',
        error: '#EF4444',
      },
    },
  },
  plugins: [],
};
