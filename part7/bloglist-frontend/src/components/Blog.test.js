import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
    title: "Portfolio",
    author: "Raj Vora",
    url: "http://rajvora.co",
    likes: 4,
    user: {
        name: 'Raj Vora'
    }
}

test('renders content', () => {

    const component = render(
        <Blog blog={blog} />
    )
    
    const blogView = component.container.querySelector('.blog')
    expect(blogView).toHaveTextContent('Portfolio')
    expect(blogView).toHaveTextContent('Raj Vora')
    const hidden = component.container.querySelector('.hidden')
    expect(hidden).toHaveStyle('display: none')
})

test('clicking button shows details', () => {
    const component = render(
        <Blog blog={blog} />
    )

    const button = component.getByText('view')
    fireEvent.click(button)
    const expanded = component.container.querySelector('.hidden')
    expect(expanded).toHaveTextContent('4')
    expect(expanded).toHaveTextContent('http://rajvora.co')
})

test('clicking like twice', () => {
    const mockHandler = jest.fn()
    
    const component = render(
        <Blog blog={blog} likeBlog={mockHandler} />
    )

    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls.length).toBe(2)
})