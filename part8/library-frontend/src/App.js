import React, { useState, useEffect } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendation from './components/Recommendation'
import { BOOK_ADDED } from './queries'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      console.log(addedBook)
      notify(`${addedBook.title} added`)
      window.alert(`${addedBook.title} added`)
    }
  })

  useEffect(() => {
    setToken(localStorage.getItem('library-user-token'))
  },[setToken])
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 2000)
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token
        ? <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        : <button onClick={() => setPage('login')}>login</button> 
        }
      </div>
      <div>
        <Authors show={page === 'authors'} />
        <Books show={page === 'books'} />
        <NewBook show={page === 'add'} />
        <LoginForm setToken={setToken} show={page === 'login'} setPage={setPage} setErrorMessage={notify} />
        <Recommendation show={page === 'recommend'} />
      </div>
      
    </div>
  )
}

const Notify = ({ errorMessage }) => {
  if(!errorMessage){
    return null
  }

  return(
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}

export default App