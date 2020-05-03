import React from 'react'
import { useSelector } from 'react-redux'
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import Blog from './Blog'
import Users from './Users'
import User from './User'

const Blogs = () => {
  const blogFormRef = React.createRef()
  const blogs = useSelector(state => state.blog)
  const user = useSelector(state => state.login)

  const padding = {
    paddingRight: 5
  }

  const match = useRouteMatch('/blogs/:id')
  const blog = match ? blogs.find(blog => blog.id === match.params.id) : null

  return(
    <div>
      <form id="logout"></form>
      <div className="navbar">
        <Link style={padding} to="/">Blogs</Link>
        <Link style={padding} to="/users">Users</Link>
        {user.name} logged in
        <button type="submit" onClick={() => window.localStorage.removeItem('loggedInUser')} form="logout">Logout</button>
      </div>

      <h2>Blogs App</h2> 

      <Togglable buttonLabel='Create New Blog' ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      <Switch>
        <Route path="/users/:id">
          <User />
        </Route>
        <Route path="/blogs/:id">
          <Blog blog={blog} />
        </Route>
        <Route path="/users">
          <Users/>
        </Route>
        <Route path="/">
          {blogs.map(blog => 
            <div className="blog" key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>
                {blog.title} by {blog.author}
              </Link>
            </div>
          )}
        </Route>
      </Switch>
      
    </div>
  )
}

export default Blogs