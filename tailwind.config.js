module.exports = {
  purge: {
    enabled: true,
    content: ['./public/**/*.html', './src/**/*.vue']
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        'pokemonmd': '500px',
        'pokemon': '350px',
      },
      transitionProperty: {
        'height': 'height'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}