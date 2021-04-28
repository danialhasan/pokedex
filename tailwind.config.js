module.exports = {
  purge: {
    enabled: false,
    content: ['./public/**/*.html', './src/**/*.vue']
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        'pokemonmd': '500px',
        'pokemon': '350px',

      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}