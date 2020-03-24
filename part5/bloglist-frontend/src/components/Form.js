import React from 'react'
import textInput from './TextInput'

const loginForm = (handleLogin, username, password, setUsername, setPassword) => (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        {textInput('Username', 'text', username, setUsername)}
        {textInput('Password', 'password', password, setPassword)}
        <button type='submit'>login</button>
      </form>
    </div>
)

const blogForm = (addBlog, title, author, url, setTitle, setAuthor, setUrl) => (
    <div>
        <h2>Create new blog</h2>
        <form onSubmit={addBlog}>
            {textInput('Title:', 'text', title, setTitle)}
            {textInput('Author:', 'text', author, setAuthor)}
            {textInput('Url:', 'text', url, setUrl)}
            <button type='submit'>create</button>
        </form>
        <br />
    </div>
)

export default {loginForm, blogForm}