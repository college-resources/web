const express = require('express')
const requestProxy = require('express-request-proxy')

const router = express.Router()

router.all('/*', (req, res, next) => {
  const proxy = requestProxy({
    url: new URL('*', process.env.API_ADDRESS).href,
    query: {
      access_token: req.user && req.user.accessToken
    }
  })

  return proxy(req, res, next)
})

module.exports = router
