import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, USER } from '../queries'

const Recommendation = ({ show }) => {
    const result = useQuery(USER)
    const result1 = useQuery(ALL_BOOKS)
    if(result.loading || result1.loading){
        return null
    }
    const user = result.data.me
    let books = result1.data.allBooks

    books = books.filter(book => book.genres.includes(user.favoriteGenre))
    if(!show){
        return null
    }

    return(
        <div>
            <h2>Recommendations</h2>
            Books in your favourite genre <b>{user.favoriteGenre}</b>
            <table>
                <tbody>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Published</th>
                </tr>
                {books.map(a =>
                    <tr key={a.title}>
                    <td>{a.title}</td>
                    <td>{a.author.name}</td>
                    <td>{a.published}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}

export default Recommendation