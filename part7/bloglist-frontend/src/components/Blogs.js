import React from 'react'
import { useSelector } from 'react-redux'
import { 
  Switch, 
  Route, 
  Link,
  useHistory,
  useRouteMatch 
} from 'react-router-dom'
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

  return(
    <div>
      <form id="logout"></form>
      <div className="navbar">
        <Link style={padding} to="/">Blogs</Link>
        <Link style={padding} to="/users">Users</Link>
        {user.name} logged in
        <button type="submit" onClick={() => window.localStorage.removeItem('loggedInUser')} form="logout">Logout</button>
      </div>

      <h2>Blogs</h2> 

      <Togglable buttonLabel='Create New Blog' ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      <Switch>
        <Route path="/users/:id">
          <User />
        </Route>
        <Route path="/users">
          <Users/>
        </Route>
        <Route path="/">
          {blogs.map(blog => 
            <Blog blog={blog} key={blog.id} /> 
          )}
        </Route>
      </Switch>
      
    </div>
  )
}

export default Blogs