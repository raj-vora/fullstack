import React, { useState, useEffect } from 'react';
import { useApolloClient, useQuery, useSubscription  } from '@apollo/client'
import PersonForm from './components/PersonForm'
import { ALL_PERSONS, PERSON_ADDED } from './queries'
import Persons from './components/Persons'
import PhoneForm from './components/PhoneForm';
import LoginForm from './components/LoginForm'

function App() {
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const result = useQuery(ALL_PERSONS)
  const client = useApolloClient()

  const updateCacheWith = addedPerson => {
    const includedIn = (set, object) => set.map(person => person.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_PERSONS })
    if(!includedIn(dataInStore.allPersons, addedPerson)) {
      client.writeQuery({
        query: ALL_PERSONS,
        data: { allPersons: dataInStore.allPersons.concat(addedPerson) }
      })
    }
  }

  useSubscription(PERSON_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedPerson = subscriptionData.data.personAdded
      console.log(addedPerson)
      notify(`${addedPerson.name} added`)
      updateCacheWith(addedPerson)
    }
  })

  useEffect(() => {
    setToken(localStorage.getItem('phonenumbers-user-token'))
  },[setToken])
  

  if(result.loading) {
    return <div>Loading...</div>
  }

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

  if(!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage}></Notify>
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notify} />
      </div>
    )
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <button onClick={logout} >Logout</button>
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} updateCacheWith={updateCacheWith} />
      <PhoneForm setError={notify} />
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

export default App;
