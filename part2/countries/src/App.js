import React, { useState, useEffect } from 'react';
import axios from 'axios'
import List from './List'

const App = () => {
  const [data, setData] = useState([])
  const [ input, setInput ] = useState('')  

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setData(response.data)
      })
  }
  useEffect(hook, [])

  const countries = data.filter( function (c) {
    return c.name.toLowerCase().indexOf(input.toLowerCase()) !== -1 
  })

  const handleInputChange = (event) => {
    setInput(event.target.value)
  }

  return(
    <div>
      find countries <input value={input} onChange={handleInputChange} />
      <List countries={countries} />
    </div>
  )
}

export default App;
