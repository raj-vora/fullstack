import React from 'react'
import textInput from './TextInput'

const blogForm = ( addBlog, title, author, url, setTitle, setAuthor, setUrl ) => (
  <div>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
          {textInput('Title:', 'text', title, setTitle)}
          <br/>
          {textInput('Author:', 'text', author, setAuthor)}
          <br/>
          {textInput('Url:', 'text', url, setUrl)}
          <br/>
          <button type='submit'>Create</button>
      </form>
      <br />
  </div>
)

export default blogForm