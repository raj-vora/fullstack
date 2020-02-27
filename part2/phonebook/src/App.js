import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
    const [ persons, setPersons] = useState([]) 
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ filter, setFilter ] = useState('')

    useEffect(() => {
        personService
        .getAll()
        .then(initialPersons => {
            setPersons(initialPersons)
        })
    }, [])

    const rows = () => persons.filter( 
        person => person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1 
    )
    .map(
        person => <Person key={person.name} person={person} deletePerson={() => deletePerson(person)} /> 
    )

    const addPerson = (event) => {
        event.preventDefault()
        let copyOfNames = [...persons].map( person => person.name )
        let index = copyOfNames.indexOf(newName)
        if(index !== -1){
            var result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
            if(result) {
                let person = persons.find(p=> p.name === copyOfNames[index])
                personService
                    .update(person.id, {...person, number:newNumber})
                    .then(returnedPerson => {
                        setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
                    })
            }
        }
        else{
            const personObject = { 
                name: newName,
                number: newNumber 
            }
            personService
                .create(personObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                })
        }
        setNewName('')
        setNewNumber('')   
    }

    const deletePerson = (person) => {
        var result = window.confirm(`Are you sure you want to delete ${person.name}?`)
        if(result){
            personService
                .remove(person.id)
                .then( setPersons(persons.filter(p => p.id !== person.id)) )
                .catch(error => 
                    window.alert(`${person.name} was already deleted`)
                )
        }
        else {
            console.log('Do nothing');
        }
    }

    const handleNameChange = (event) => setNewName(event.target.value)

    const handleNumberChange = (event) => setNewNumber(event.target.value)

    const handleFilterChange = (event) => setFilter(event.target.value)

    return (
        <div>
            <h2>Phonebook</h2>
            
            <Filter 
                filter={filter} 
                handleFilterChange={handleFilterChange} 
            />

            <h2>add a new</h2>
            
            <PersonForm 
                addPerson={addPerson} 
                newName={newName} 
                newNumber={newNumber} 
                handleNameChange={handleNameChange} 
                handleNumberChange={handleNumberChange} 
            />

            <h2>Numbers</h2>
            {rows()}                
        </div>
    )
}

export default App