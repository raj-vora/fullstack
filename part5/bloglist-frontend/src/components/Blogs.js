import React, {useState} from 'react'
import blogForm from './blogForm'
import Togglable from './Togglable'
import blogService from '../services/blogService'
import Blog from './Blog'

const Blogs = ({ blogs, setBlogs, user, setErrorMessage }) => {
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

  const deleteBlog = async(blog) => {
    const result = window.confirm(`Remove ${blog.title} by ${blog.author}`)
      if(result) {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
        setErrorMessage(`Deleted blog ${blog.title}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      }
  }

  return(
    <div>
      <form id="logout"></form>
      <h2>Blogs</h2> 
      <div>{user.name} logged in
        <button type="submit" onClick={() => window.localStorage.removeItem('loggedInUser')} form="logout">Logout</button>
        <Togglable buttonLabel='Create New Blog' ref={blogFormRef}>
          {blogForm(addBlog, title, author, url, setTitle, setAuthor, setUrl)}
        </Togglable>
      </div>
      {blogs.map(blog => 
        <Blog 
          blog={blog} 
          key={blog.id} 
          deleteBlog={() => deleteBlog(blog)} 
        /> 
      )}
    </div>
  )
}

export default Blogs