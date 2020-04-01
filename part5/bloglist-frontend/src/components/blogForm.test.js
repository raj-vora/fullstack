import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './blogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
    const createBlog = jest.fn()

    const component = render(
        <BlogForm createBlog={createBlog} />
    )

    const testBlog = {
        "title": "Portfolio",
        "author": "Raj Vora",
        "url": "rajvora.co"
    }

    const form = component.container.querySelector('form')
    const blog = component.container.querySelectorAll('input')
    fireEvent.change(blog[0], {
        target: {value: 'Portfolio'}
    })
    fireEvent.change(blog[1], {
        target: {value: 'Raj Vora'}
    })
    fireEvent.change(blog[2], {
        target: {value: 'rajvora.co'}
    })
    fireEvent.submit(form)
    
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toEqual(testBlog)
})