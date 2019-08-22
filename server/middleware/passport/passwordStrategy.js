const LocalStrategy = require('passport-local')

module.exports = new LocalStrategy(
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
