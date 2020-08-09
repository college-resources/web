const tryParseJSON = require('./tryParseJSON')

class ErrorHandler extends Error {
  constructor (statusCode, message) {
    super()
    this.statusCode = statusCode
    this.message = message
  }
}

const handleError = (err, res) => {
  const { statusCode, message } = err

  // Used for Passport errors
  const { error, error_description: errorDescription } = tryParseJSON(message) || {}

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message: errorDescription || message,
    error: error || null
  })
}

module.exports = {
  ErrorHandler,
  handleError
}
