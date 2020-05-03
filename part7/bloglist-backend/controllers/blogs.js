const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async(request, response) => {
    
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 })
    console.log(blogs)
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async(request, response) => {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    if (body.title === undefined && body.url === undefined) {
        response.status(400).json({ error: 'title or url missing' })
    }
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes === undefined ? 0 : body.likes,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async(request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const blog = await Blog.findById(request.params.id)
    if (blog.user.toString() === decodedToken.id) {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } else {
        return response.status(403).json({ error: 'invalid delete operation' })
    }
})

blogsRouter.put('/:id', async(request, response) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes === undefined ? 0 : body.likes,
        comments: body.comments
    }

    const newBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(newBlog.toJSON())
})

module.exports = blogsRouter