const session = require('express-session')

const sess = {
  cookie: {},
  resave: false,
  saveUninitialized: true,
  secret: require('crypto')
    .randomBytes(64)
    .toString('hex')
}

module.exports = session(sess)
