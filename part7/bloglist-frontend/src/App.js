import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { checkUser } from './reducers/userReducer'

const App = () => {
  
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(checkUser())
  }, [dispatch])

  return (
    <div>
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