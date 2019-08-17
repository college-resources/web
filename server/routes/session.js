const express = require('express')
const router = express.Router()

router.get('/profile', (req, res) => {
  res.json(req.user && req.user.profile)
})

module.exports = router
