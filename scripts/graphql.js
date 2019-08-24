/* global fetch */

import Router from 'next/router'

export default function (query) {
  return new Promise((resolve, reject) => {
    fetch('/api/graphql', {
      method: 'POST',
      body: JSON.stringify({ query }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json.errors) {
          if (json.errors[0].message === 'Unauthenticated') {
            Router.push('/auth/login')
          } else if (json.errors[0].message === 'Unregistered') {
            Router.push('/auth/register')
          } else {
            console.log(json.errors)
          }

          resolve({})
        } else {
          resolve(json.data)
        }
      })
      .catch(err => reject(err))
  })
}
