import React, { useState } from 'react'
import { ALL_AUTHORS, SET_BIRTHYEAR } from '../queries'
import { useQuery } from '@apollo/client'
import { useMutation } from '@apollo/client'
import Select from 'react-select'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  if(result.loading){
    return(
      <div>Still Loading...</div>
    )
  }

  const authors = result.data.allAuthors

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              Born
            </th>
            <th>
              Books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <BirthYear authors={authors} />
    </div>
  )
}

const BirthYear = ({ authors }) => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')
  let options = []

  const [ bornYear ] = useMutation(SET_BIRTHYEAR)

  const submit = async (event) => {
    event.preventDefault()
    bornYear({ variables: {name, setBornTo: parseInt(year)} })
    setName('')
    setYear('')
  }

  authors.forEach(author => {
    options.push({ value: author.name, label: author.name })
  })

  return(
    <div>
      <h2>Set Birthyear</h2>
      <form onSubmit={submit}>
        <div>
          Name: <Select value={options.label} onChange={(target) => setName(target.value)} options={options} />
        </div>
        <div>
          Born: <input type="number" step="1" value={year} onChange={({target}) => setYear(target.value)} />
        </div>
        <button type="submit" >Update Author</button>
      </form>
    </div>
  )
}

export default Authors