/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import textInput from './TextInput'

const loginForm = (handleLogin, username, password, setUsername, setPassword) => (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        {textInput('Username', 'text', username, setUsername)}
        {textInput('Password', 'password', password, setPassword)}
        <button type='submit'>Login</button>
      </form>
    </div>
)

export default loginForm