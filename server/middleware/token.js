const jwt = require('jsonwebtoken')
const jwksRsa = require('jwks-rsa')

const init = (req) => {
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
  const secretProvider = jwksRsa({
    cache: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
    rateLimit: true
  })

  const getSecret = (kid) => new Promise((resolve, reject) => {
    secretProvider.getSigningKey(
      kid,
      (err, key) => {
        if (err) {
          reject(err)
        } else {
          const publicKey = key.publicKey || key.rsaPublicKey
          resolve(publicKey)
        }
      }
    )
  })

  // Verify token using kid, audience and issuer
  return async (token, tokenHeader) => {
    const secret = await getSecret(tokenHeader.kid)
    const options = {
      algorithms: ['RS256'],
      audience: process.env.AUTH0_AUDIENCE,
      issuer: `https://${process.env.AUTH0_DOMAIN}/`
    }

    try {
      await jwt.verify(
        token,
        secret,
        options
      )
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        await req.auth0.authenticationClient.refreshToken({
          client_secret: process.env.AUTH0_CLIENT_SECRET,
          refresh_token: req.user.refreshToken
        })
          .then(({ access_token: accessToken }) => {
            req.user.accessToken = accessToken
          })
      }
    }
  }
}

module.exports = async (req, res, next) => {
  try {
    // Decode JWT without verification to get kid from header
    const token = req.user && req.user.accessToken
    const { header } = jwt.decode(
      token,
      { complete: true }
    ) || {}
    const verifier = init(req)
    await verifier(
      token,
      header
    )
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.log(err.message)
    }
  }

  next()
}
