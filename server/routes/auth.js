const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const passport = require('passport')
const util = require('util')
const querystring = require('querystring')
const { check, validationResult } = require('express-validator')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.get('/login', passport.authenticate('auth0', {
  audience: process.env.AUTH0_AUDIENCE,
  scope: process.env.AUTH0_SCOPE
}), function (req, res) {
  res.redirect('/')
})

router.get('/login/:connection', (req, res, next) => passport.authenticate('auth0', {
  connection: req.params.connection,
  audience: process.env.AUTH0_AUDIENCE,
  scope: process.env.AUTH0_SCOPE
})(req, res, next), function (req, res) {
  res.redirect('/')
})

router.post('/register', [
  check('email').isEmail(),
  check('given_name').isLength(1),
  check('family_name').isLength(1),
  check('password').isLength(8)
], async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  try {
    const user = await req.auth0.managementClient.createUser({
      email: req.body.email,
      email_verified: true, // TODO: Implement Email verification support
      given_name: req.body.given_name,
      family_name: req.body.family_name,
      password: req.body.password,
      connection: 'Username-Password-Authentication'
    })

    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.post('/login', passport.authenticate('password', {
  failureRedirect: '/login'
}), function (req, res) {
  res.json(req.user.profile)
})

router.get('/callback', function (req, res, next) {
  passport.authenticate('auth0', function (err, user, info) {
    if (err) { return next(err) }
    if (!user) { return res.redirect('/login') }
    req.logIn(user, function (err) {
      if (err) { return next(err) }
      const returnTo = req.session.returnTo
      delete req.session.returnTo
      res.redirect(returnTo || '/')
    })
  })(req, res, next)
})

router.get('/logout', (req, res) => {
  req.logout()

  let returnTo = req.protocol + '://' + req.hostname
  const port = parseInt(req.get('X-Forwarded-Port') || req.connection.localPort)
  if (port !== undefined && port !== 80 && port !== 443) {
    returnTo += ':' + port
  }
  const logoutURL = new URL(
    util.format('https://%s/v2/logout', process.env.AUTH0_DOMAIN)
  )
  const searchString = querystring.stringify({
    client_id: process.env.AUTH0_CLIENT_ID,
    returnTo: returnTo
  })
  logoutURL.search = searchString

  res.redirect(logoutURL)
})

module.exports = router
