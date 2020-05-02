import React from 'react'
import { useDispatch } from 'react-redux'
import { setNotif } from '../reducers/notificationReducer'
import { newBlog } from '../reducers/blogReducer'

const BlogForm = ({ createBlog }) => {

  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()
    event.persist()
    let title = event.target.title.value
    let author = event.target.author.value
    let url = event.target.url.value
    dispatch(
      newBlog({
        title: title,
        author: author,
        url: url,
        likes: 0
      })
    )
    dispatch(setNotif(`A new blog ${title} by ${author}`, 3))

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
  }

  return(
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
          Title: <input id="title" name="title" /><br />
          Author: <input id="author" name="author" /><br/>
          Url: <input id="url" name="url" /><br/>
        <button id="create-btn" type='submit'>Create</button>
      </form>
      <br />
    </div>
  )
}

export default BlogForm