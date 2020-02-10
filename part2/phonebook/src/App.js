import React, { useState } from 'react'
import Person from './components/Person.js'

const App = () => {
    const [ persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ]) 
    const [ newName, setNewName ] = useState('')

    const rows = () => persons.map(person =>
        <Person
            key={person.name}
            person={person}
        />
    )

    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName
        }
        setPersons(persons.concat(personObject))
        setNewName('')
    }

    const handleNameChange= (event) => {
        setNewName(event.target.value)
    }

    return (
        <div>
            <div>
                <h2>Phonebook</h2>
                <form onSubmit={addPerson}>
                    <div>
                        name: <input value={newName} onChange={handleNameChange} />
                    </div>
                    <div>
                    <button type="submit">add</button>
                    </div>
                </form>
            </div>
            <div>
                <h2>Numbers</h2>
                {rows()}                
            </div>
        </div>
    )
}

export default App