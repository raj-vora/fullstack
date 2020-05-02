import React from 'react'
import { useSelector } from 'react-redux'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import Blog from './Blog'

const Blogs = () => {
  const blogFormRef = React.createRef()
  const blogs = useSelector(state => state.blog)
  const user = useSelector(state => state.user)
  return(
    <div>
      <form id="logout"></form>
      <h2>Blogs</h2> 
      <div>
        <div>
          {user.name} logged in
          <button type="submit" onClick={() => window.localStorage.removeItem('loggedInUser')} form="logout">Logout</button>
        </div>
        <Togglable buttonLabel='Create New Blog' ref={blogFormRef}>
          <BlogForm />
        </Togglable>
      </div>
      <br />
      {blogs.map(blog => 
        <Blog blog={blog} key={blog.id} /> 
      )}
    </div>
  )
}

export default Blogs