import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryList from './components/CountryList'
import CountryData from './components/CountryData'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setfilteredCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        const countryNames = response.data.map(country => country.name.common)
        setCountries(countryNames)
      })
  }, [])

  const handleCountryFilter = (event) => {
    const filterName = event.target.value
    setfilteredCountries(countries.filter(country => country.toLowerCase().includes(filterName.toLowerCase())))
  }

  return (
    <div>
        Find Country: <input onChange={handleCountryFilter} />
        
        {filteredCountries.length > 10 
          ? (<p>Too many matches, add more characters.</p>) 
          : filteredCountries.length === 1 
          ? (<CountryData country={filteredCountries[0]} />)
          : (<CountryList list={filteredCountries} />)
        }
      
    </div>
  )
}

export default App