let _window
let _router

const randomString = (length) => {
  const charset =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._~'
  let result = ''

  while (length > 0) {
    const bytes = new Uint8Array(16)
    const random = _window.crypto.getRandomValues(bytes)

    random.forEach(function (c) {
      if (length === 0) {
        return
      }
      if (c < charset.length) {
        result += charset[c]
        length--
      }
    })
  }
  return result
}
export default randomString

export function initializeAuth (_w, _r) {
  _window = _w
  _router = _r
}

export function saveToken () {
  if (_router.query.state === 'authorized') {
    window.fetch('http://localhost:4000/api/auth/get_token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // client_id: CLIENT_ID,
        nonce: window.sessionStorage.getItem('nonce')
      })
    })
      .then(res => res.json())
      .then(json => {
        console.log(json)
        const token = json.access_token
        if (token) {
          console.log(token)
          window.localStorage.setItem('token', token)
        }
      })
      .catch(console.log)
  }
}
