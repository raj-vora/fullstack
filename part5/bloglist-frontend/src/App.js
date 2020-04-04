import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import loginForm from './components/loginForm'
import blogService from './services/blogService'
import loginService from './services/loginService'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const notification = (message) => (
    <div>
      {
        message === null
          ? null
          : <div className='error' id="notif"> { message } </div>
      }
    </div>
  )

  return (
    <div>
      {notification(errorMessage)}
      {
        user === null
          ? loginForm(handleLogin, username, password, setUsername, setPassword)
          : <Blogs blogs={blogs} setBlogs={setBlogs} user={user} setErrorMessage={setErrorMessage} />
      }
    </div>
  )
}

export default App