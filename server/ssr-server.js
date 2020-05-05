const express = require('express')
const next = require('next')

const auth0 = require('./middleware/auth0')
const session = require('./middleware/session')
const passport = require('./middleware/passport')

const apiRouter = require('./routes/api')
const authRouter = require('./routes/auth')
const sessionRouter = require('./routes/session')

const server = express()
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

server.set(
  'trust proxy',
  'loopback'
)

server.use(express.static('public'))
server.use(auth0)
server.use(session)
server.use(passport)

server.use(
  '/api',
  apiRouter
)
server.use(
  '/auth',
  authRouter
)
server.use(
  '/session',
  sessionRouter
)

server.get(
  '*',
  handle
)

// Error handlers
if (server.get('env') === 'development') {
  /*
   * Development error handler
   * Will print stacktrace
   */
  server.use((err, req, res) => {
    res.status(err.status || 500)
    app.render(
      req,
      res,
      '/error',
      {
        error: err,
        message: err.message
      }
    )
  })
} else {
  /*
   * Production error handler
   * No stack traces leaked to user
   */
  server.use((err, req, res) => {
    server.status(err.status || 500)
    app.render(
      req,
      res,
      '/error',
      {
        error: {},
        message: err.message
      }
    )
  })
}

module.exports = () => {
  app
    .prepare()
    .then(() => {
      server.listen(
        3000,
        (err) => {
          if (err) throw err
          console.log('> Ready on http://localhost:3000')
        }
      )
    })
    .catch((ex) => {
      console.error(ex.stack)
      // eslint-disable-next-line no-process-exit
      process.exit(1)
    })
}
