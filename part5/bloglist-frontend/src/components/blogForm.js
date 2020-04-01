import React, {useState} from 'react'

const BlogForm = ({ createBlog }) =>{ 
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  
  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <div>
        <h2>Create new blog</h2>
        <form onSubmit={addBlog}>
          Title:
          <input  
            value={title}
            name="title"
            onChange={({target}) => setTitle(target.value)}
          />
          <br />
          Author:
          <input 
            value={author}
            name="author"
            onChange={({target}) => setAuthor(target.value)}
          />
          <br/>
          Url:
          <input 
            value={url}
            name="url"
            onChange={({target}) => setUrl(target.value)}
          />
          <br/>
          <button type='submit'>Create</button>
        </form>
        <br />
    </div>
  )
}

export default BlogForm