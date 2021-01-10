const session = require('express-session')
const {FirestoreStore} = require('@google-cloud/connect-firestore')
const {Firestore} = require('@google-cloud/firestore')

const sess = {
  store: process.env.NODE_ENV === 'production'
    ? new FirestoreStore({
      dataset: new Firestore(),
      kind: process.env.SESSION_COLLECTION || 'local-sessions',
    })
    : undefined,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET || 'local-sessions'
}

module.exports = session(sess)
