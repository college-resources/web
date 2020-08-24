const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
  pwa: {
    register: true,
    dest: 'public',
    runtimeCaching
  },
  crossOrigin: 'anonymous',
  pageExtensions: [
    'js',
    'jsx'
  ]
})
