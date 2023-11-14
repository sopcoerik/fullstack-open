const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/loggers')
const morgan = require('morgan')
const mongoose = require('mongoose')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

mongoose.set('strictQuery', false)

logger.info('Connecting to MongoDB database...')

const connectToDB = async () => {
  await mongoose.connect(config.MONGODB_URL)
  logger.info('Connected to MongoDB database')
}

try {
  connectToDB()
} catch(error) {
  logger.error('Error connecting to MongoDB database: ', error.message)
}

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use(middleware.getTokenFrom)

app.use('/api/blogs', middleware.userExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app