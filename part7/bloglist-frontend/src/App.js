import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { checkUser } from './reducers/loginReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initUsers } from './reducers/usersReducer'

const App = () => {
  
  const dispatch = useDispatch()
  const user = useSelector(state => state.login)

  useEffect(() => {
    dispatch(checkUser())
    dispatch(initializeBlogs())
    dispatch(initUsers())
  }, [dispatch])

  return (
    <div className="container">
      <Notification />
      {
        user === null
          ? <LoginForm />
          : <Blogs />
      }
    </div>
  )
}

export default App