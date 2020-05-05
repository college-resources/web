const passport = require('passport')

const auth0Strategy = require('./auth0Strategy')
const passwordStrategy = require('./passwordStrategy')

passport.use(
  'auth0',
  auth0Strategy
)
passport.use(
  'password',
  passwordStrategy
)

passport.serializeUser((user, done) => {
  done(
    null,
    user
  )
})

passport.deserializeUser((user, done) => {
  done(
    null,
    user
  )
})

module.exports = [
  passport.initialize(),
  passport.session()
]
