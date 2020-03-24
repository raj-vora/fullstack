import React, { useState } from 'react'
import form from './Form'
import blogService from '../services/blogs'

const Blog = ({ blogs, setBlogs, user, setErrorMessage }) => {
  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newUrl, setUrl] = useState('')


  const addBlog = async(event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
    setErrorMessage(`A new blog ${newTitle} by ${newAuthor}`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <div>
        <h2>Blogs</h2> 
        <div>{user.name} logged in
          <form onSubmit={() => window.localStorage.removeItem('loggedInUser')}>
            <button type="submit">logout</button>
          </form>
          <br/>
        {form.blogForm(addBlog, newTitle, newAuthor, newUrl, setTitle, setAuthor, setUrl)}
        </div>
        {blogs.map(blog =>
          <div key={blog._id}>
            {blog.title} {blog.author}
          </div>
        )}
      </div>
  )
}

export default Blog
