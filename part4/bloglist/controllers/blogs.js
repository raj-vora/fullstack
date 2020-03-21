const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogsRouter.get('/', async(request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async(request, response, next) => {
    const body = request.body

    if (body.title === undefined && body.url === undefined) {
        response.status(400)
    }
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes === undefined ? 0 : body.likes
    })

    const result = await blog.save()
    response.status(201).json(result)
})

blogsRouter.delete('/:id', async(request, response, next) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async(request, response, next) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes === undefined ? 0 : body.likes
    }

    const newBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(newBlog.toJSON())
})

module.exports = blogsRouter