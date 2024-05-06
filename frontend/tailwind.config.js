/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        neueLeiden: ['var(--font-NeueLeiden)'],
        neuleidenBold: ['var(--font-NeueLeidenBold)'],
      },
      colors: {
        secondaryBG: '#28272C',
        greenpale: '#4FA983',
        lightGreen: '#D3EEE9',
        lightWhite: '#F9F9FB',
      },
    },
  },
  plugins: [
    ({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'animation-delay': (value) => {
            return {
              'animation-delay': value,
            };
          },
        },
        {
          values: theme('transitionDelay'),
        }
      );
    },
  ],
};
