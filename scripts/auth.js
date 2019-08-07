let _window

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

export function initializeAuth (_w) {
  _window = _w
}
