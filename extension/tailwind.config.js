/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: ['./src/**/*.tsx', './public/*.html', './src/**/*.html'],
  theme: {
    extend: {
      fontFamily: {
        mono: '"Roboto Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      },
      colors: {
        zodiac: {
          'light-mustard': 'rgba(217, 212, 173)',
        },
      },
    },
  },
  plugins: [],
}
