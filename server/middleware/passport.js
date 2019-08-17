const passport = require('passport')
const Auth0Strategy = require('passport-auth0')
const LocalStrategy = require('passport-local')

const auth0Strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:
      process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/auth/callback'
  },
  function (accessToken, refreshToken, profile, done) {
    const info = {
      accessToken,
      refreshToken,
      profile
    }

    return done(null, info)
  }
)

const passwordStrategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'passwd',
    passReqToCallback: true
  },
  async function (req, username, password, done) {
    try {
      const userData = await req.auth0.authenticationClient.passwordGrant({
        audience: process.env.AUTH0_AUDIENCE,
        scope: process.env.AUTH0_SCOPE,
        realm: process.env.AUTH0_REALM,
        username,
        password
      })

      const accessToken = userData.access_token
      const refreshToken = userData.refresh_token
      const profile = await req.auth0.authenticationClient.getProfile(accessToken)

      const info = {
        accessToken,
        refreshToken,
        profile
      }

      done(null, info)
    } catch (err) {
      done(err)
    }
  }
)

passport.use('auth0', auth0Strategy)
passport.use('password', passwordStrategy)

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  done(null, user)
})

module.exports = [passport.initialize(), passport.session()]
