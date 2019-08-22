const express = require('express')
const requestProxy = require('express-request-proxy')

const token = require('../middleware/token')

const router = express.Router()

router.all('/*', token, (req, res, next) => {
  const proxy = requestProxy({
    url: new URL('*', process.env.API_ADDRESS).href,
    query: {
      access_token: req.user && req.user.accessToken
    }
  })

  return proxy(req, res, next)
})

module.exports = router
