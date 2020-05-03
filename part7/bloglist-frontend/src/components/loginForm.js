import React from 'react'
import { useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { login } from '../reducers/loginReducer'

const LoginForm = () => {

  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()
    event.persist()
    dispatch(
      login({
        username: event.target.username.value,
        password: event.target.password.value
      })
    )
    event.target.username.value =''
    event.target.password.value =''
  }

  return(
    <div>
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" name="username" />
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" name="password" /><br />
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm