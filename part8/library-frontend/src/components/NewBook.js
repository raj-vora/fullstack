import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS } from '../queries'

const NewBook = ({ show, updateCacheWith }) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [ addBook ] = useMutation(ADD_BOOK, {
      refetchQueries: [{ query: ALL_AUTHORS }],
      onError: (error) => {
        console.log(error)
      },
      update: (store, response) => updateCacheWith(response.data.addBook)
    })

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    addBook({ variables: {title, author, published: parseInt(published), genres} })

    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <h2>Add book</h2>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            step="1"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook