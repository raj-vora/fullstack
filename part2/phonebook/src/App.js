import React from 'react'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {  
  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm persons={persons} />
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )
}

var persons = [
  { name: 'Arto Hellas', number: '040-123456' },
  { name: 'Ada Lovelace', number: '39-44-5323523' },
  { name: 'Dan Abramov', number: '12-43-234345' },
  { name: 'Mary Poppendieck', number: '39-23-6423122' } 
]

export default App