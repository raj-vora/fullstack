const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const extract = body => {
    const result = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }
    return result
}

test('blogs are returned as JSON', async() => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    expect(response.body.length).toBe(1)
})

test('id is unique identifier', async() => {
    const response = await api.get('/api/blogs')
    expect(response.body[0]._id).toBeDefined()
})

test('a valid blog can be added', async() => {
    const newBlog = {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
    }
    await api
        .post('/api/blogs')
        .send(newBlog)

    const response = await api.get('/api/blogs')
    const result = extract(response.body[response.body.length - 1])
    expect(response.body.length).toBe(4)
    expect(result).toEqual(newBlog)
})

test('if likes is empty, make it zero', async() => {
    const newBlog = {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    }

    const tempBlog = {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 0,
    }
    await api
        .post('/api/blogs')
        .send(newBlog)

    const response = await api.get('/api/blogs')
    const result = extract(response.body[response.body.length - 1])
    expect(result).toEqual(tempBlog)
})

test.only('if title and url is empty', async() => {
    const newBlog = {
        author: "Robert C. Martin",
        likes: 10,
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

afterAll(() => {
    mongoose.connection.close()
})