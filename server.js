require('dotenv').config()

const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const compression = require('compression')
const jwt = require('jsonwebtoken')
const authApi = require('./authApi')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express().disable('x-powered-by');

  // Request body parsing middleware should be above methodOverride
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(cookieParser());
  server.use('/api/auth', authApi);

  // Authenticate middleware
  // We will apply this middleware to every route except '/login' and '/_next'
  server.use(unless(['/login', '/_next'], (req, res, next) => {
    const token = req.cookies['token'];

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          res.redirect('/login');
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          next();
        }
      })
    } else {
      res.redirect('/login');
    }
  }))

  server.get('/post/:id', (req, res) => {
    return app.render(req, res, '/post', Object.assign(req.params, req.query))
  })

  server.get('/profile/:id', (req, res) => {
    return app.render(req, res, '/profile', Object.assign(req.params, req.query))
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})

function unless (paths, middleware) {
  return function(req, res, next) {
    let isHave = false
    paths.forEach((path) => {
      if (path === req.path || req.path.includes(path)) {
        isHave = true
        return
      }
    })
    if (isHave) {
      return next()
    } else {
      return middleware(req, res, next)
    }
  }
}
