import React from 'react'

const Languages = ({languages}) => {
	return languages.map( (language) => <li key = {language.name}> {language.name} </li> )
}

const List = ({countries, showButton}) => {
	if(countries.length > 10) {
      return(
        <div>Too many matches, specify another filter</div>
      )
    }
    else if(countries.length > 1){
      return(
        countries.map(
          (country) => <div key={country.name}>
	        {country.name}
	        <button onClick= {
	        	() => { 
	        		showButton(country.name)
	        	}
	        }>
	        	Show
	        </button>
          </div>
        )
      )
    }
    else if(countries.length === 1) {
      return (
        <div>
          <h2>{countries[0].name}</h2>
          Capital: {countries[0].capital}<br/>
          Population: {countries[0].population}
          <h3>Languages spoken</h3>
          <ul>
            <Languages languages = {countries[0].languages} />
          </ul>
          <img src = {countries[0].flag} alt = {countries[0].name} width = "255" />
        </div>
      )
    }
    else {return (<p>No matches found</p>);}
}

export default List