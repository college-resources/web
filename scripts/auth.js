import Router from 'next/router'

export function login (ctx, email, password) {
  return fetch(
    '/auth/login',
    {
      body: JSON.stringify({
        email,
        password
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST'
    }
  )
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(res.statusCode)
      }

      return res.json()
        .then((json) => {
          ctx(json)
          Router.push('/')
        })
    })
}

export function register (ctx, email, givenName, familyName, password) {
  return fetch(
    '/auth/register',
    {
      body: JSON.stringify({
        email,
        family_name: familyName,
        given_name: givenName,
        password
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST'
    }
  )
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(res.statusCode)
      }

      return login(
        ctx,
        email,
        password
      )
    })
}
