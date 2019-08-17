const session = require('express-session')

const sess = {
  secret: require('crypto')
    .randomBytes(64)
    .toString('hex'),
  cookie: {},
  resave: false,
  saveUninitialized: true
}

module.exports = session(sess)
