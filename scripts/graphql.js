import Router from 'next/router'
import fetch from 'isomorphic-unfetch'

export default function gql (query) {
  return new Promise((resolve, reject) => {
    fetch(
      '/api/graphql',
      {
        body: JSON.stringify({ query }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.errors) {
          if (json.errors[0].message === 'Unauthenticated') {
            Router.push('/login')
          } else if (json.errors[0].message === 'Unregistered') {
            Router.push('/register')
          } else {
            console.log(json.errors)
          }

          resolve({})
        } else {
          resolve(json.data)
        }
      })
      .catch((err) => reject(err))
  })
}
