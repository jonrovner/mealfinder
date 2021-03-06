const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/users')

userRouter.post('/', async (request, response) => {
    const body = request.body
  
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
  
    const user = new User({
      dishes: [],
      email: body.email,
      username: body.username,
      passwordHash,
    })
  
    const savedUser = await user.save()
  
    response.json(savedUser)
  })

userRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
  })

module.exports = userRouter