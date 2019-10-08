import React from 'react'

const Persons = ({persons}) => {
    const rows = () => persons.map(person =>
        <div>{person.name} {person.number}</div>
      )

    return (
        <div>{rows()}</div>
    )
}

export default Persons