import React from 'react'
import { useSelector } from 'react-redux'
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import Blog from './Blog'
import Users from './Users'
import User from './User'
import Navigationbar from './Navbar'

const Blogs = () => {
  const blogFormRef = React.createRef()
  const blogs = useSelector(state => state.blog)
  const user = useSelector(state => state.login)

  const match = useRouteMatch('/blogs/:id')
  const blog = match ? blogs.find(blog => blog.id === match.params.id) : null

  return(
    <div>
      <form id="logout"></form>
      <Navigationbar name={user.name} />

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
          <Table striped>
            <tbody>
              {blogs.map(blog => 
                <tr key={blog.id}>
                  <td>
                    <Link to={`/blogs/${blog.id}`}>
                      {blog.title}
                    </Link>
                  </td>
                  <td>
                    {blog.author}
                  </td>
                </tr>
                )}
            </tbody>
          </Table>
        </Route>
      </Switch>
      
    </div>
  )
}

export default Blogs