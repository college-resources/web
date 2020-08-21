const withPWA = require('next-pwa')

module.exports = {
  // TODO: Revisit to see if stil needed
  exportTrailingSlash: true,
  pageExtensions: [
    'js',
    'jsx'
  ]
}

module.exports = withPWA({
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    register: true,
    dest: 'public'
  }
})
