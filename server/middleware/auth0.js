const auth0 = require('auth0')
const fetch = require('isomorphic-unfetch')

const authenticationClient = new auth0.AuthenticationClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET
})

const managementClient = new auth0.ManagementClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  tokenProvider: {
    enableCache: true,
    cacheTTLInSeconds: 10
  }
})

const syncProfileWithApi = async info => {
  const gqlRoute = new URL('graphql', process.env.API_ADDRESS)
  gqlRoute.searchParams.set('access_token', info.accessToken)

  const apiProfile = await fetch(gqlRoute.href, {
    method: 'POST',
    body: JSON.stringify({
      query: `{
        user {
          _id
        }
      }`
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
    })
    .then(json => {
      if (!json.errors) {
        return json.data
      }
    })
    .catch(err => console.log(err))

  if (!apiProfile || !apiProfile._id) {
    await fetch(gqlRoute.href, {
      method: 'POST',
      body: JSON.stringify({
        query: `mutation {
          registerUser (user: {
            givenName: "${info.profile.given_name}"
            familyName: "${info.profile.family_name}"
            picture: "${info.profile.picture}"
          }) {
            _id
          }
        }`
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          res.text().then(text => console.log(text))
        }
      })
      .then(json => {
        if (json && !json.errors) {
          return json.data
        }
      })
      .catch(err => console.log(err))
  }
}

module.exports = (req, res, next) => {
  req.auth0 = {
    authenticationClient,
    managementClient,
    syncProfileWithApi
  }

  next()
}
