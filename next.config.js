const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled:
    process.env.ANALYZE === 'true' && process.env.NODE_ENV === 'production'
})

module.exports = withBundleAnalyzer(
  withPWA({
    pwa: {
      disable: true,
      register: true,
      dest: 'public',
      runtimeCaching
    },
    crossOrigin: 'anonymous',
    pageExtensions: ['js', 'jsx']
  })
)
