import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
    const blog = {
        title: "Portfolio",
        author: "Raj Vora",
        url: "http://rajvora.co",
        likes: 4,
        user: {
            name: 'Raj Vora'
        }
    }

    const component = render(
        <Blog blog={blog} />
    )
    
    component.debug()
    const blogView = component.container.querySelector('.blog')
    expect(blogView).toHaveTextContent('Portfolio')
    expect(blogView).toHaveTextContent('Raj Vora')
    const hidden = component.container.querySelector('.hidden')
    expect(hidden).toHaveStyle('display: none')
    
})
