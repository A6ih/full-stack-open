const express = require('express')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')

const app = express()

const url = config.MONGODB_URI
mongoose
  .connect(url)
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch((error) =>
    logger.error('Connection to MongoDB failed:', error.message)
  )

app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
