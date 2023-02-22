const path = require('path')
const express = require('express')
const morgan = require('morgan')
const app = express()
module.exports = app

// logging middleware
app.use(morgan('dev'))

// body parsing middleware
app.use(express.json())

// auth and api routes
app.use('/auth', require('./auth'))
app.use('/api', require('./api'))

const prodBuild = path.join(__dirname, '..', '/client/build/index.html')
//const prodBuild = '/client/build/index.html'
console.log('production build index.html path:', prodBuild)

app.get('/', (req, res)=> res.sendFile(prodBuild) );

// static file-serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')))

// client/build files will not be found unless they are a statically server route as well...
app.use(express.static(path.join(__dirname, "..", "client/build")));

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found')
    err.status = 404
    console.log(req.path)
    next(err)
  } else {
    next()
  }
})

// sends index.html
app.use('*', (req, res) => {
  res.sendFile(prodBuild);
})

// error handling endware
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})
