import Router from 'next/router'
import fetch from 'isomorphic-unfetch'

export function login (ctx, email, passwd) {
  fetch('auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email,
      passwd
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        res.text().then(text => console.log(text)) // TODO: Implement error handling
      }
    })
    .then(json => {
      ctx(json)
      Router.push('/profile')
    })
    .catch(err => console.log(err.message)) // TODO: Implement error handling
}

// eslint-disable-next-line
export function register (ctx, email, given_name, family_name, password) {
  fetch('auth/register', {
    method: 'POST',
    body: JSON.stringify({
      email,
      given_name,
      family_name,
      password
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      if (res.ok) {
        login(ctx, email, password)
      } else {
        res.text().then(text => console.log(text)) // TODO: Implement error handling
      }
    })
    .catch(err => console.log(err.message)) // TODO: Implement error handling
}
