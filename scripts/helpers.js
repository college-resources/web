function getCookie(name) {
  const regex = new RegExp(`(?:(?:^|.*;*)${name}*=*([^;]*).*$)|^.*$`, 'u')
  return document.cookie.replace(regex, '$1')
}

module.exports = {
  getCookie
}
