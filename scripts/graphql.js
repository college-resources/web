import Router from 'next/router'

export default function gql(query, variables) {
  const body = { query }
  if (variables) {
    body.variables = variables
  }

  return new Promise((resolve, reject) => {
    fetch('/api/graphql', {
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
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
