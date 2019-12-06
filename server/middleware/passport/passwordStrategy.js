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
      let profile = await req.auth0.authenticationClient.getProfile(accessToken)

      if (profile && profile._json) {
        profile = profile._json
      }

      const info = {
        accessToken,
        refreshToken,
        profile
      }

      await req.auth0.syncProfileWithApi(info)

      done(null, info)
    } catch (err) {
      done(err)
    }
  }
)
