const LocalStrategy = require('passport-local')

module.exports = new LocalStrategy(
  {
    passReqToCallback: true,
    passwordField: 'password',
    usernameField: 'email'
  },
  async (req, username, password, done) => {
    try {
      const userData = await req.auth0.authenticationClient.passwordGrant({
        audience: process.env.AUTH0_AUDIENCE,
        password,
        realm: process.env.AUTH0_REALM,
        scope: process.env.AUTH0_SCOPE,
        username
      })

      const accessToken = userData.access_token
      const refreshToken = userData.refresh_token
      let profile = await req.auth0.authenticationClient.getProfile(accessToken)

      if (profile && profile._json) {
        profile = profile._json
      }

      const info = {
        accessToken,
        profile,
        refreshToken
      }

      await req.auth0.syncProfileWithApi(info)

      done(null, info)
    } catch (err) {
      done(err)
    }
  }
)
