import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client'
import { FIND_PERSON } from '../queries'

const Persons = ({ persons }) => {
    const [getPerson, result] = useLazyQuery(FIND_PERSON)
    const [person, setPerson] = useState(null)
  
    const showPerson = (name) => {
      getPerson({ variables: {nameToSearch: name } })
    }
  
    useEffect(() => {
      if(result.data) {
        setPerson(result.data.findPerson)
      }
    }, [result.data])
  
    if(person) {
      return (
        <div>
          <h2>{person.name}</h2>
          <div>{person.address.street}, {person.address.city} </div>
          <div>{person.phone}</div>
          <button onClick={() => setPerson(null)}>Close</button>
        </div>
      )
    }
  
    return (
      <div>
        <h2>Persons</h2>
        {persons.map(person => 
          <div key={person.name}>
            {person.name} {person.phone}
            <button onClick={() => showPerson(person.name)}>Show address</button>
          </div>
        )}
      </div>
    )
}

export default Persons