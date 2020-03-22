const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

test('username not given', async() => {
    newUser = {
        name: 'Raj Vora',
        password: 'qwerty'
    }
    const response = await api.post('/api/users')
        .send(newUser)
        .expect(400)
    expect(response.body.error).toBe('User validation failed: username: Path `username` is required.')
})

test('password not given', async() => {
    newUser = {
        username: 'raj',
        name: 'Raj Vora',
    }
    const response = await api.post('/api/users')
        .send(newUser)
        .expect(400)
    expect(response.body.error).toBe('password is not in required format.')
})

test('short username', async() => {
    newUser = {
        username: 'ra',
        name: 'Raj Vora',
        password: 'qwerty'
    }
    const response = await api.post('/api/users')
        .send(newUser)
        .expect(400)
    expect(response.body.error).toBe('User validation failed: username: Path `username` (`ra`) is shorter than the minimum allowed length (3).')
})

test('password short', async() => {
    newUser = {
        username: 'raj',
        name: 'Raj Vora',
        password: 'qw'
    }
    const response = await api.post('/api/users')
        .send(newUser)
        .expect(400)
    expect(response.body.error).toBe('password is not in required format.')
})

test('unique user', async() => {
    newUser = {
        username: 'raj',
        name: 'Raj Vora',
        password: 'qwerty'
    }
    const response = await api.post('/api/users')
        .send(newUser)
        .expect(400)
    expect(response.body.error).toBe('User validation failed: username: Error, expected `username` to be unique. Value: `raj`')
})

afterAll(() => {
    mongoose.connection.close()
})