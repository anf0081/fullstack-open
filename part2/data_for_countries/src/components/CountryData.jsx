import axios from 'axios'
import { useState, useEffect } from 'react'

const CountryData = ({ country }) => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY
  let lat = ""
  let lng = ""
  let apiLink = ""
  const [countryData, setCountryData] = useState({})
  const [weatherData, setWeatherData] = useState({})

  useEffect(() => {
    axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
    .then(response => {
      setCountryData(response.data)
      lat = response.data.capitalInfo?.latlng[0]
      lng = response.data.capitalInfo?.latlng[1]
      apiLink = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`
      axios
      .get(apiLink)
      .then(response => {
        setWeatherData(response.data)
      })
      .catch(err => {
        console.log(err)
      })
    })
    }, [country]
  )

  const languages = countryData.languages ? Object.values(countryData.languages) : []
  const weatherIcon = weatherData.current?.weather[0].icon
  const weatherIconLink = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`

  return (
        <div>
          <h1>{countryData.name?.common}</h1>
          <p>Capital: {countryData.capital}</p>
          <p>Area: {countryData.area}</p>
          <h2>Languages</h2>
          <ul>
            {languages.map(lang => <li key={lang}>{lang}</li>)}
          </ul>
          <img src={countryData.flags?.png} width={300} />
          <h2>Weather in {countryData.capital}</h2>
          <img src={weatherIconLink} width={100} />
          <p>Temperature: {weatherData.current?.temp} Celsius</p>
          <p>Weather: {weatherData.current?.weather[0].description}</p>
          <p>Wind: {weatherData.current?.wind_speed} m/s</p>
        </div> 
      )
    }
    
    export default CountryData