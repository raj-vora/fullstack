import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
    fragment BookDetails on Book {
        title
        published
        genres
        author{
            name
            born
            id
        }
        id
    }
`

const AUTHOR_DETAILS = gql`
    fragment AuthorDetails on Author {
        name
        id
        born 
        bookCount
    }
`

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`

export const USER = gql`
query {
    me{
      username
      id
      favoriteGenre
    }
}
`

export const ALL_AUTHORS = gql`
query {
    allAuthors {
        ...AuthorDetails
    }
}
${AUTHOR_DETAILS}
`

export const ALL_BOOKS = gql`
query {
    allBooks {
        ...BookDetails
    }
}
${BOOK_DETAILS}
`

export const ADD_BOOK= gql`
mutation newBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
        title: $title,
        author: $author,
        published: $published,
        genres: $genres
    ) {
        title
        published
        genres
        id
    }
}
`

export const SET_BIRTHYEAR = gql`
mutation setBirthYear($name: String!, $setBornTo: Int!) {
    editAuthor(
        name: $name,
        setBornTo: $setBornTo
    ) {
        ...AuthorDetails
    }
}
${AUTHOR_DETAILS}
`