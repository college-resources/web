const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const passport = require('passport')
const util = require('util')
const querystring = require('querystring')
const { check, validationResult } = require('express-validator')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.get(
  '/login',
  passport.authenticate(
    'auth0',
    {
      audience: process.env.AUTH0_AUDIENCE,
      scope: process.env.AUTH0_SCOPE
    }
  ),
  (req, res) => {
    res.redirect('/')
  }
)

router.get(
  '/login/:connection',
  (req, res, next) => passport.authenticate(
    'auth0',
    {
      audience: process.env.AUTH0_AUDIENCE,
      connection: req.params.connection,
      scope: process.env.AUTH0_SCOPE
    }
  )(
    req,
    res,
    next
  ),
  (req, res) => {
    res.redirect('/')
  }
)

router.post(
  '/register',
  [
    check('email').isEmail(),
    check('given_name').isLength(1),
    check('family_name').isLength(1),
    check('password').isLength(8)
  ],
  async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    try {
      await req.auth0.managementClient.createUser({
        connection: 'Username-Password-Authentication',
        email: req.body.email,
        // TODO: Implement Email verification support
        email_verified: true,
        family_name: req.body.family_name,
        given_name: req.body.given_name,
        password: req.body.password
      })

      next()
    } catch (err) {
      return next(err)
    }
  },
  passport.authenticate(
    'password',
    {
      failureRedirect: '/login'
    }
  ),
  (req, res) => {
    res.json(req.user.profile)
  }
)

router.post(
  '/login',
  passport.authenticate(
    'password',
    {
      failureRedirect: '/login'
    }
  ),
  (req, res) => {
    res.json(req.user.profile)
  }
)

router.get(
  '/callback',
  (req, res, next) => {
    passport.authenticate(
      'auth0',
      (authenticateError, user, info) => {
        if (authenticateError) return next(authenticateError)
        if (!user) return res.redirect('/login')
        req.logIn(
          user,
          (loginError) => {
            if (loginError) return next(loginError)
            const { returnTo } = req.session
            delete req.session.returnTo
            res.redirect(returnTo || '/')
          }
        )
      }
    )(
      req,
      res,
      next
    )
  }
)

router.get(
  '/logout',
  (req, res) => {
    req.logout()

    let returnTo = `${req.protocol}://${req.hostname}`
    const port = parseInt(
      req.get('X-Forwarded-Port') || req.connection.localPort,
      10
    )
    if (port && port !== 80 && port !== 443) {
      returnTo += `:${port}`
    }
    const logoutURL = new URL(util.format(
      'https://%s/v2/logout',
      process.env.AUTH0_DOMAIN
    ))
    logoutURL.search = querystring.stringify({
      client_id: process.env.AUTH0_CLIENT_ID,
      returnTo
    })

    res.redirect(logoutURL)
  }
)

module.exports = router
