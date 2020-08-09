function tryParseJSON (jsonString) {
  try {
    const obj = JSON.parse(jsonString)
    if (obj && typeof obj === 'object') {
      return obj
    }
  } catch (e) {
    return false
  }

  return false
}

module.exports = tryParseJSON
