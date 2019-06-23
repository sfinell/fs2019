import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

const Filter = (props) => {
  return (
    <div>find countries <input
      value={props.value}
      onChange={props.onChange}/>
    </div>
  )
}

const CountryNames = (props) => {
  const clicksauta = (event) => {
    console.log("event:", event)
    console.log("currentTarget:", event.currentTarget)
    console.log("currentTarget.id:", event.currentTarget.id)
    props.setFilter(event.currentTarget.id)
  }

  return (
    <div>
      {props.countries.map(country =>
        <div key={country.name}> {country.name}
        <button  id={country.name} onClick={clicksauta}>show: {country.name}</button>
        </div>)}
    </div>
  )
}

const OneCountry = ({country}) => {
  console.log("country:", country)
  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>languages</h2>
      <ul>
        {country.languages.map(language =>
          <li key={language.name}> {language.name}</li>)}
      </ul>
      <img src={country.flag} alt="" height="128"/>
    </div>
  )
}

const Countries = (props) => {
  console.log("countries:", props.countries.length)
  const count = props.countries.length
  if (count > 10) {
    return (<div>so many countries ({count}), please filter</div>)
  }
  else if (count > 1) {
    return (
      <CountryNames countries={props.countries} setFilter={props.setFilter}/>
    )
  }
  else if (count > 0) {
    return (
      <OneCountry country={props.countries[0]} />
    )
  }
  return (
    <div>no any countries, please shorten filter</div>
  )
}

const App = () => {
  const [ countries, setCountries] = useState([])
  const [ filter, setFilter ] = useState('swi')

  useEffect(() =>
  {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response =>
        {
          console.log('response:', response)
          setCountries(response.data)
        })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const re = new RegExp(filter, "i");
  const filteredCountries = () => countries.filter(e => re.test(e.name))

  return (
    <div>
      <Filter value={filter} onChange={handleFilterChange} />
      <Countries countries={filteredCountries()}  setFilter={setFilter} />
    </div>
  )
}

export default App;
