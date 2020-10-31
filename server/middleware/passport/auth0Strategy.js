const Auth0Strategy = require('passport-auth0')

module.exports = new Auth0Strategy(
  {
    callbackURL:
      process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/auth/callback',
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    domain: process.env.AUTH0_DOMAIN,
    passReqToCallback: true
  },
  async (req, accessToken, refreshToken, _, profile, done) => {
    const info = {
      accessToken,
      profile: profile && profile._json,
      refreshToken
    }

    await req.auth0.syncProfileWithApi(info)

    return done(null, info)
  }
)
