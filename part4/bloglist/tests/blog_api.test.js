const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

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

test.only('a valid blog can be added', async() => {
    const newBlog = {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(b => b.title)
    const authors = response.body.map(b => b.author)
    const urls = response.body.map(b => b.url)
    const likes = response.body.map(b => b.likes)

    expect(response.body.length).toBe(4)
    expect(titles).toContain('Canonical string reduction')
    expect(authors).toContain('Edsger W. Dijkstra')
    expect(urls).toContain('http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html')
    expect(likes).toContain(12)
})

afterAll(() => {
    mongoose.connection.close()
})