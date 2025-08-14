import CountryData from './CountryData'
import { useState } from 'react'

const Country = ({ country }) => {
    const [showCountry, setshowCountry] = useState(false)

    if(!showCountry) {
      return (
        <p>{country} <button onClick={() => setshowCountry(!showCountry)}>{showCountry ? 'Hide' : 'Show'}</button></p>
      )
    }
    else {
        return (
        <>
        <p>{country} <button onClick={() => setshowCountry(!showCountry)}>{showCountry ? 'Hide' : 'Show'}</button></p>
        <CountryData country={country} />
        </>
        )
    }
}
    
    export default Country