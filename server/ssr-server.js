const express = require('express')
const next = require('next')

const auth0 = require('./middleware/auth0')
const session = require('./middleware/session')
const passport = require('./middleware/passport')

const apiRouter = require('./routes/api')
const authRouter = require('./routes/auth')
const sessionRouter = require('./routes/session')

const { handleError } = require('./lib/error')

const server = express()
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

server.set('trust proxy', 'loopback')

server.use(express.static('public'))
server.use(auth0)
server.use(session)
server.use(passport)

server.use('/api', apiRouter)
server.use('/auth', authRouter)
server.use('/session', sessionRouter)

server.get('*', handle)

// Error handling - Requires 4 parameters
// eslint-disable-next-line no-unused-vars
server.use((err, req, res, _) => {
  handleError(err, res)
})

module.exports = () => {
  app
    .prepare()
    .then(() => {
      server.listen(3000, (err) => {
        if (err) throw err
        // eslint-disable-next-line no-console
        console.log('> Ready on http://localhost:3000')
      })
    })
    .catch((ex) => {
      // eslint-disable-next-line no-console
      console.error(ex.stack)
      process.exit(1)
    })
}
