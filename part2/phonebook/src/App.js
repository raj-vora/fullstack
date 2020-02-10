import React, { useState } from 'react'
import Person from './components/Person.js'

const App = () => {
    const [ persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ]) 
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ filter, setFilter ] = useState('')

    const rows = () => persons.filter( 
        person => person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1 
    )
    .map(
        person => <Person key={person.name} person={person} /> 
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

    const handleFilterChange = (event) => setFilter(event.target.value)

    return (
        <div>
            <div>
                <h2>Phonebook</h2>
                <div>
                    filter shown with <input value={filter} onChange={handleFilterChange} />
                </div>
                <div>
                    <h2>add a new</h2>
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
            </div>
            <div>
                <h2>Numbers</h2>
                {rows()}                
            </div>
        </div>
    )
}

export default App