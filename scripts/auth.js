import Router from 'next/router'

export function login (ctx, email, password) {
  fetch(
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
        // TODO: Implement error handling
        return res.text().then((text) => console.log(text))
      }
      return res.json()
        .then((json) => {
          ctx(json)
          Router.push('/')
        })
    })
    .catch((err) => console.log(err.message))
}

// eslint-disable-next-line
export function register (ctx, email, given_name, family_name, password) {
  fetch(
    '/auth/register',
    {
      body: JSON.stringify({
        email,
        family_name,
        given_name,
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
      if (res.ok) {
        login(
          ctx,
          email,
          password
        )
      } else {
        // TODO: Implement error handling
        res.text().then((text) => console.log(text))
      }
    })
    // TODO: Implement error handling
    .catch((err) => console.log(err.message))
}
