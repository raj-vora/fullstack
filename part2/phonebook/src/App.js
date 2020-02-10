import React, { useState } from 'react'
import Person from './components/Person.js'

const App = () => {
    const [ persons, setPersons] = useState([
        { 
            name: 'Arto Hellas',
            number: '040-1234567'
        }
    ]) 
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')

    const rows = () => persons.map(person =>
        <Person
            key={person.name}
            person={person}
        />
    )

    const addPerson = (event) => {
        event.preventDefault()
        let copyOfNames = [...persons].map( person => person.name );
        let exists = copyOfNames.indexOf(newName);
        if(exists !== -1){
            window.alert(`${newName} is already added to phonebook`)
        }
        else{
            const personObject = { 
                name: newName,
                number: newNumber 
            }
            setPersons(persons.concat(personObject))
            setNewName('')
            setNewNumber('')
        }   
    }

    const handleNameChange = (event) => setNewName(event.target.value)

    const handleNumberChange = (event) => setNewNumber(event.target.value)

    return (
        <div>
            <div>
                <h2>Phonebook</h2>
                <form onSubmit={addPerson}>
                    <div>
                        name: <input value={newName} onChange={handleNameChange} />
                    </div>
                    <div>
                        number: <input value={newNumber} onChange={handleNumberChange} />
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