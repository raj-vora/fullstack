import { gql } from '@apollo/client'

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`

export const ALL_AUTHORS = gql`
query {
    allAuthors {
        name
        id
        born 
        bookCount
    }
}
`

export const ALL_BOOKS = gql`
query {
    allBooks {
        title
        published
        author{
            name
            born
            id
        }
        id
    }
}
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
        name
        id
        born
        bookCount
    }
}
`