const express = require('express')
const router = express.Router()

router.get(
  '/profile',
  (req, res) => {
    const profile = (req.user && req.user.profile) || null
    res.json(profile)
  }
)

module.exports = router
