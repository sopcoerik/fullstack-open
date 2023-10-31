import { Fragment, useEffect, useState } from "react"
import axios from "axios"

const api_key = import.meta.env.VITE_OPEN_WEATHER_KEY
export const App = () => {

  const [allCountries, setAllCountries] = useState([])
  const [search, setSearch] = useState('')
  const [countryToShow, setCountryToShow] = useState('')

  const BASE_URL = "https://studies.cs.helsinki.fi/restcountries/"
  
  useEffect(() => {
    axios.get(BASE_URL + `api/all`)
    .then(resp => setAllCountries(resp.data))
  }, [])

  const onSearchChange = (e) => {
    setSearch(e.target.value)
  }

  let filteredCountries
  let content = ''

  if(search.length >= 1) {
    filteredCountries = allCountries.filter(c => c.name.common.includes(search))

    if(filteredCountries.length > 10) {
      content = 'Too many matches, try to search something more specific'
    } else if (filteredCountries.length === 1) {
      content = <Country key={filteredCountries[0].name.common + 'qwerty'} country={filteredCountries[0]} countryToShow={filteredCountries[0].name.common}/>
    } else {
      content = filteredCountries.map(c => (
        <Fragment key={c.name.common}>
          <p>
            {c.name.common}
            <button onClick={() => setCountryToShow(c.name.common)}>show</button>
          </p>
          <Country country={c} countryToShow={countryToShow}/>
        </Fragment>
      ))
    }

  }
  
  return (
    <>
      search for a country: <input value={search} onChange={onSearchChange}/>
      <div>{content}</div>
    </>
  )
}

const Country = ({country, countryToShow}) => {
  const [weather, setWeather] = useState(null)
  const [lat, lng] = country.latlng

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}`)
        .then(resp => setWeather(resp.data))
  }, [])

  if(countryToShow !== country.name.common) return null
  else {
    const languages = []
    for (const language in country.languages) {
      languages.push(<li key={language}>{language}</li>)
    }
    
    return (
      <>
        <h1>{country.name.common}</h1>
        <p>capital: {country.capital[0]}</p>
        <p>area: {country.area}</p>
        <b>languages:</b>
        <ul>{languages}</ul>
        <img src={country.flags.png}/>
        <p>temperature {weather && (weather.main.temp - 273.15).toFixed(2)} Celsius</p>
        <img src={weather ? `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` : ''} alt="weather-icon" />
        <p>wind {weather && weather.wind.speed} m/s</p>
      </>
    )
  }
  
}