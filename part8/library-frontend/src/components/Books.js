import React, { useEffect ,useState} from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [genres, setGenres] = useState([])
  const [filter, setFilter] = useState('')
  let books = []
  if(result.loading){
    return (
      <div>Still Loading...</div>
    )
  }
  books = result.data.allBooks
  const temp = () => {
    if( books ) {
      books.forEach( book => {
        book.genres.forEach( genre => {
          if( !genres.includes( genre ) ) setGenres(genres.concat(genre))
        })
      })
    }
  }
  temp()

  if (!props.show) {
    return null
  }

  let booksToShow = books
	if( filter !== '' ) {
		booksToShow = booksToShow.filter( b => b.genres.includes(filter) )
	}
	if( filter === '' ) booksToShow = books

  return (
    <div>
      <h2>Books</h2>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {booksToShow.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genres.map( genre => 
				<button key={genre} onClick = { () => setFilter( genre ) } > { genre } </button>
			)}
			<button onClick = { () => setFilter('') } > all genres </button>
    </div>
  )
}

export default Books