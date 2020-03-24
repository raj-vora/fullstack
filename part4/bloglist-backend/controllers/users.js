const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async(request, response, next) => {
    const body = request.body

    const password = body.password
    if (password === undefined || password.length < 3) {
        return response.status(400).json({ error: 'password is not in required format.' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()
    response.json(savedUser.toJSON())
})

usersRouter.get('/', async(request, response) => {
    const users = await User
        .find({})
        .populate('blogs')
    response.json(users.map(user => user.toJSON()))
})

module.exports = usersRouter