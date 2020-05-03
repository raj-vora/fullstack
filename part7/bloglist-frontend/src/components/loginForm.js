import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { setNotif } from '../reducers/notificationReducer'

const LoginForm = () => {

  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()
    event.persist()
    try{
      dispatch(
        login({
          username: event.target.username.value,
          password: event.target.password.value
        })
      )
      event.target.username.value =''
      event.target.password.value =''
    }
    catch(exception){
      dispatch(setNotif('Wrong username or password', 5))
    }
  }

  return(
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
          Username: <input id="username" name="username" /><br />
          Password: <input id="password" name="password" type="password" /><br />
        <button id="login-button" type='submit'>Login</button>
      </form>
    </div>
  )
}

export default LoginForm