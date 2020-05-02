import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setNotif } from './reducers/notificationReducer'
import Blogs from './components/Blogs'
import loginForm from './components/loginForm'
import blogService from './services/blogService'
import loginService from './services/loginService'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    async function temp() {
      const blogs = await blogService.getAll()
      setBlogs(blogs.sort((a, b) => (a.likes < b.likes ? 1 : -1)))
    }
    temp()
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async(event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotif('Wrong username or password', 5))
    }
  }

  return (
    <div>
      <Notification />
      {
        user === null
          ? loginForm(handleLogin, username, password, setUsername, setPassword)
          : <Blogs blogs={blogs} setBlogs={setBlogs} user={user} />
      }
    </div>
  )
}

export default App