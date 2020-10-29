const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')
runtimeCaching[0].handler = 'StaleWhileRevalidate'

module.exports = withPWA({
  pwa: {
    register: false,
    dest: 'public',
    runtimeCaching,
    skipWaiting: false
  },
  crossOrigin: 'anonymous',
  pageExtensions: [
    'js',
    'jsx'
  ]
})
