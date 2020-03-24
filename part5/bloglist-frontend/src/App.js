import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import form from './components/Form'
import blogService from './services/blogs'
import loginService from './services/login' 

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    async function temp() {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    temp()
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const Notification = (message) => (
    <div>
      {
        message === null
        ? null
        : <div className='error'> { message } </div>
      }
    </div>
  )

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

  return (
    <div>
    {Notification(errorMessage)}
      {
        user === null
        ? form.loginForm(handleLogin, username, password, setUsername, setPassword)
        : <Blog blogs={blogs} setBlogs={setBlogs} user={user} setErrorMessage={setErrorMessage} />
      }
    </div>
  )
}

export default App