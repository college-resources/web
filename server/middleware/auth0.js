const auth0 = require('auth0')

const authenticationClient = new auth0.AuthenticationClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET
})

module.exports = (req, res, next) => {
  req.auth0 = {
    authenticationClient
  }

  next()
}
