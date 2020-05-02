import React from 'react'
import { useDispatch } from 'react-redux'
import { setNotif } from '../reducers/notificationReducer'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import blogService from '../services/blogService'
import Blog from './Blog'

const Blogs = ({ blogs, setBlogs, user }) => {
  const blogFormRef = React.createRef()

  const dispatch = useDispatch()

  const addBlog = async(blogObject) => {
    blogFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
    dispatch(setNotif(`A new blog ${blogObject.title} by ${blogObject.author}`, 3))
  }

  const likeBlog = async(blog) => {
    const returnedBlog = await blogService.update(blog.id, {...blog, likes: blog.likes+1})
    setBlogs(blogs.map(b => b.id !== blog.id ? b : returnedBlog))
    dispatch(setNotif(`Liked blog ${blog.title}`, 3))
  }

  const deleteBlog = async(blog) => {
    const result = window.confirm(`Remove ${blog.title} by ${blog.author}`)
      if(result) {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
        dispatch(setNotif(`Deleted blog ${blog.title}`, 3))
      }
  }

  return(
    <div>
      <form id="logout"></form>
      <h2>Blogs</h2> 
      <div>
        <div>
          {user.name} logged in
          <button type="submit" onClick={() => window.localStorage.removeItem('loggedInUser')} form="logout">Logout</button>
        </div>
        <br />
        <Togglable buttonLabel='Create New Blog' ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
      </div>
      <br />
      {blogs.map(blog => 
        <Blog 
          blog={blog} 
          key={blog.id} 
          deleteBlog={() => deleteBlog(blog)}
          likeBlog={() => likeBlog(blog)}
        /> 
      )}
    </div>
  )
}

export default Blogs