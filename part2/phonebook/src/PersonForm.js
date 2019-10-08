import React, { useState } from 'react'

const PersonForm = (props) => {
  const [ persons, setPersons] = useState(props.persons)
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const exists = persons.find(({name}) => name === newName)
    if(exists === undefined){
      const nameObject = {
        name: newName,
        number : newNumber
      }
      setPersons(persons.concat(nameObject))
    }
    else{
      window.alert(`${newName} already exists in phonebook`)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

    return (
        <form onSubmit={addPerson}>
        <div>
          Name: <input onChange={handleNameChange} />
        </div>
        <div>
          Number: <input onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    )
}

export default PersonForm