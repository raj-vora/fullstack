import React, {useState} from 'react'
import blogForm from './blogForm'
import Togglable from './Togglable'
import blogService from '../services/blogs'

const Blog = ({ blogs, setBlogs, user, setErrorMessage }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const blogFormRef = React.createRef()

  const addBlog = async(event) => {
    event.preventDefault()
    
    if(!title){
      setErrorMessage('Title cannot be empty')
    }else if(!author){
      setErrorMessage('Author cannot be empty')
    }else if(!url){
      setErrorMessage('Url cannot be empty')
    }else {
      const blogObject = {
        title: title,
        author: author,
        url: url
      }
      const returnedBlog = await blogService.create(blogObject)
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(returnedBlog))
      setErrorMessage(`A new blog ${title} by ${author}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
      setTitle('')
      setAuthor('')
      setUrl('')
    }
  }

  return(
    <div>
      <h2>Blogs</h2> 
      <div>{user.name} logged in
        <form onSubmit={() => window.localStorage.removeItem('loggedInUser')}>
          <button type="submit">Logout</button>
        </form>
        <Togglable buttonLabel='New Blog' ref={blogFormRef}>
          {blogForm(addBlog, title, author, url, setTitle, setAuthor, setUrl)}
        </Togglable>
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
