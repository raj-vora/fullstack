import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Languages = ({languages}) => {
	return languages.map( (language) => <li key = {language.name}> {language.name} </li> )
}

const Weather = ({place}) => {
    const [ weather, setWeather] = useState({});
    const hook = () => {
        axios
            .get('http://api.weatherstack.com/current?access_key=50d5b5c44914440b9beb99109b8a524d&query='+place)
            .then( (response) => {
                console.log(response.data.current);
                setWeather(response.data.current);
            });
    } 
    useEffect(hook , []);

    return (
        <div>
            <h3>Weather in {place}</h3>
            <p><strong>Temperature: </strong> {weather.temperature} Celsius </p>
            <img src = {weather.weather_icons} alt = {weather.weather_descriptions} />
            <div><strong>Wind: </strong> {weather.wind_speed} kph Direction {weather.wind_dir}</div>
        </div>
    )
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
	          	<h1>{countries[0].name}</h1>
	          	Capital: {countries[0].capital}<br/>
	          	Population: {countries[0].population}
	          	<h2>Languages spoken</h2>
	          	<ul>
	            	<Languages languages = {countries[0].languages} />
	          	</ul>
	          	<img src = {countries[0].flag} alt = {countries[0].name} width = "255" />
	          	<Weather place = {countries[0].capital} />
	        </div>
      	)
    }
    else {return (<p>No matches found</p>);}
}

export default List