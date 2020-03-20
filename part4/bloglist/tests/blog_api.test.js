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

test.only('id is unique identifier', async() => {
    const response = await api
        .get('/api/blogs')
    response.body.forEach(element => {
        console.log(element._id)
    });
    expect(response.body[0]._id).toBeDefined()
})

afterAll(() => {
    mongoose.connection.close()
})