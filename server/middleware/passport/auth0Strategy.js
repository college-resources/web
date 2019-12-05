const Auth0Strategy = require('passport-auth0')

module.exports = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:
      process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/auth/callback'
  },
  function (accessToken, refreshToken, profile, done) {
    if (profile && profile._json) {
      profile = profile._json
    }

    const info = {
      accessToken,
      refreshToken,
      profile
    }

    return done(null, info)
  }
)
