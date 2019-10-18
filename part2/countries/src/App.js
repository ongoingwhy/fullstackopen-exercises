import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = ({value, onChange}) => <input type='text' value={value} onChange={onChange} />
const DisplayText = ({text}) => <p>{text}</p>

const DisplayMultipleResults = ({result, setSearch}) => {
  const rows = result.map(country => {
    const onClick = () => {
      setSearch(country.name);
    }

    return (
        <p key={country.name}>{country.name} 
          <button onClick={onClick}>Show</button>
        </p>
    );
  });

  return (
    <>
      {rows}
    </>
  );
}

const Weather = ({city, weather, setWeather}) => {
  useEffect (() => {
    axios
    .get(`http://api.weatherstack.com/current?access_key=1ace0d7f0ce5b8d37f19d3ec5e4f467e&query=${city}`)
    .then(response => {
      const newWeather = response.data.current;
      setWeather(newWeather);
    })
  }, [city, setWeather]);

  return (
    <div>
      <h3>Weather in {city}</h3>
      <strong>temperature:</strong>{weather.temperature} Celcius <br/>
      <img src={weather.weather_icons} alt='weather icon' /><br/>
      <strong>wind:</strong>{weather.wind_speed} kph dir {weather.wind_dir}
    </div>
  );
}

const DisplayCountry = ({country, weather, setWeather}) => {
  const displayLanguage = country.languages.map(language => 
  <li key={language.name}>{language.name}</li>)

  return (
    <div>
      <h2>{country.name}</h2>
      Capital {country.capital} <br/>
      Population {country.population} <br/>
      <h3>languages</h3>
      <ul>
        {displayLanguage}
      </ul>
      <img src={country.flag} alt='country flag' height='100px' width='100px'/>
      <Weather city={country.capital} weather={weather} setWeather={setWeather} />
    </div>
  );
}

const SearchResult = ({countries, search, setSearch, weather, setWeather}) => {
  if (search === '') 
    return <DisplayText text={'Enter something to search for a country'} />
  else {
    const result = countries.filter(country => 
      country.name.toLowerCase().indexOf(search.toLowerCase()) >= 0)

    if (result.length > 10)
      return <DisplayText text={'Too many matches, specify another filter'} />
    else if (result.length > 1)
      return (
        <DisplayMultipleResults setSearch={setSearch} result={result} />
      );
    else if (result.length > 0)
      return (
        <DisplayCountry country={result[0]} weather={weather} setWeather={setWeather} />
      );
    else
      return <DisplayText text={'No results'}/>
  }
}

function App() {
  const [countries, setCountries] = useState([]);
  const [searchText, setSearch] = useState('');
  const [weather, setWeather] = useState({});

  const updateSearch = (event) => {
    setSearch(event.target.value);
  }
  
  useEffect (() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then((response) => {
        const newCountries = response.data
        setCountries(newCountries);
      });
  }, []);

  return (
    <div>
      find countries <Search value={searchText} onChange={updateSearch} /><br />
      <SearchResult setSearch={setSearch} search={searchText} countries={countries}
      weather={weather} setWeather={setWeather}/>
    </div>
  );
}

export default App;
