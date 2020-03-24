const listHelper = require('../utils/list_helper')
const helper = require('./helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('totalLikes', () => {
    test('of empty list is zero', () => {
        const blogs = []

        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(0)
    })

    test('of one blog', () => {
        const blogs = [{
            "title": "First Blog",
            "author": "Raj Vora",
            "url": "http://rajvora.co",
            "likes": 4
        }]

        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(4)
    })

    test('of list of blogs', () => {
        const result = listHelper.totalLikes(helper.initialBlogs)
        expect(result).toBe(36)
    })
})

describe('favouriteBlog', () => {
    test('of empty list is zero', () => {
        const blogs = []

        const result = listHelper.favouriteBlog(blogs)
        expect(result).toEqual({})
    })

    test('of only one blog given', () => {
        const blogs = [{
            "title": "First Blog",
            "author": "Raj Vora",
            "likes": 4
        }]

        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(4)
    })

    test('of a list of blogs', () => {
        const result = listHelper.favouriteBlog(helper.initialBlogs)
        expect(result).toEqual({
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
        })
    })
})