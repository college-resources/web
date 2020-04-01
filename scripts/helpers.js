function getCookie (name) {
  const regex = new RegExp(`(?:(?:^|.*;*)${name}*=*([^;]*).*$)|^.*$`)
  return document.cookie.replace(regex, '$1')
}

module.exports = {
  getCookie
}
