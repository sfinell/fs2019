import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// api.openweathermap.org/data/2.5/weather?q={city name},{country code}
// apikey: 8f59a64a1a68ca5eb989cb69681d431b

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

const Weather = ({country}) => {
  const [ weather, setWeather ] = useState([])
  console.log("piirretään...")
  console.log('alku-{country.capital}-'+country.capital+','+country.alpha2Code)
  const url = 'https://api.openweathermap.org/data/2.5/weather?q='+country.capital+','+country.alpha2Code+'&appid=8f59a64a1a68ca5eb989cb69681d431b'
  if (weather.length === 0) {
    console.log("katotanpa...")
    axios
      .get(url)
      .then(response =>
        {
          console.log('vastaus:', response)
          setWeather(response.data)
        })
    return(<div>Loading weather...</div>)
  }
  console.log("sää:", weather)

  const nimi = weather.name
  const lampotila = (weather.main.temp - 273.15).toFixed(1)
  const tuuli = weather.wind
  const suunta = (tuuli.hasOwnProperty("deg")) ? "direction " + tuuli.deg + "&deg;" : ""
  const iconcode = weather.weather[0].icon
  const iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
  console.log("nimi:", nimi)
  console.log("tuuli:", tuuli)
  console.log("suunta:", suunta)
  console.log("iconcode:", iconcode)
  console.log("iconurl:", iconurl)
  return (
    <div><h2>Weather in {nimi}</h2>
    <b>temperature:</b> {lampotila} &#8451;<br/>
    <img id="wicon" src={iconurl} alt="Weather icon"/><br/>
    <b>wind:</b> {tuuli.speed} m/s direction {tuuli.deg}&deg;
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
      <div>
      <OneCountry country={props.countries[0]} />
      <Weather country={props.countries[0]} />
      </div>
    )
  }
  return (
    <div>no any countries, please shorten filter</div>
  )
}

const App = () => {
  const [ countries, setCountries] = useState([])
  const [ filter, setFilter ] = useState('swi')
  const [ capital, setCapital ] = useState('')

  useEffect(() =>
  {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response =>
        {
          console.log('response:', response)
          setCountries(response.data)
          if (response.data.length === 1) {
            setCapital(response.data[0].capital)
          }
        })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const re = new RegExp(filter, "i");
  const filteredCountries = () => countries.filter(e => re.test(e.name))

  // useEffect(() =>
  // {
  //   console.log('effect for weather')
  //   console.log('filteredCountries.length', filteredCountries.length)
  //   if (filteredCountries().length != 1) {
  //     console.log("...not yet")
  //     return
  //   }
  //   axios
  //     .get('https://api.openweathermap.org/data/2.5/weather?q={city name},{country code}')
  //     .then(response =>
  //       {
  //         console.log('response:', response)
  //         setWeather(response.data)
  //       })
  // }, [filter])


  return (
    <div>
      <Filter value={filter} onChange={handleFilterChange} />
      <Countries countries={filteredCountries()}  setFilter={setFilter} />
    </div>
  )
}

export default App;
