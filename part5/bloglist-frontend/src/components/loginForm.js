import React from 'react'

const loginForm = (handleLogin, username, password, setUsername, setPassword) => (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        Username:
        <input  
          value={username}
          name="username"
          onChange={({target}) => setUsername(target.value)}
        />
        <br />
        Password:
        <input  
          value={password}
          name="password"
          type="password"
          onChange={({target}) => setPassword(target.value)}
        />
        <br />
        <button type='submit'>Login</button>
      </form>
    </div>
)

export default loginForm