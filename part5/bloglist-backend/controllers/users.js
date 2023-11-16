const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1 })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const users = await User.find({})

  if(users.some(user => user.username === username)) {
    return response.status(400).send({ error: "400 | Bad request | username already in use" })
  }

  if(!username || !password || !username.length || !password.length) {
    return response.status(400).send({ error: "400 | Bad request | username and/or password required" })
  }

  if(username.length < 3 || password.length < 3) {
    return response.status(400).send({ error: "400 | Bad request | short name or password (atleast 3 chars)" })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter