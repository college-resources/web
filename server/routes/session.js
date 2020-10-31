const express = require('express')
const { ErrorHandler } = require('../lib/error')

const router = express.Router()

router.get('/profile', (req, res, next) => {
  const profile = (req.user && req.user.profile) || null
  if (profile === null) {
    return next(new ErrorHandler(401, 'Not authenticated'))
  }

  return res.json(profile)
})

module.exports = router
