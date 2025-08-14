import Country from './Country'

const CountryList = ({ list }) => {
    return (
      <div>
        {list.map(country => 
            <Country key={country} country={country} />
        )}
      </div>
    )
  }
  
  export default CountryList