const express = require('express')
const router = express.Router()

router.get(
  '/profile',
  (req, res) => {
    const profile = (req.user && req.user.profile) || null
    res.json({
      data: profile
    })
  }
)

module.exports = router
