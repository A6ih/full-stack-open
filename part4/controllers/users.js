const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/', async (request, response) => {
  const { username, password, name } = request.body

  if (!password) {
    return response.status(400).json({ error: 'password is required' })
  } else if (password.length < 3) {
    return response
      .status(400)
      .json({
        error: 'password length should be atleast 3 characters or longer',
      })
  }

  const saltedNumber = 10
  const passwordHash = await bcrypt.hash(password, saltedNumber)

  const user = new User({
    username: username,
    passwordHash: passwordHash,
    name: name,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

userRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

module.exports = userRouter
