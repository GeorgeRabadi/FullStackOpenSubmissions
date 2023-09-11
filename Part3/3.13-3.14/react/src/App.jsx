import { useState, useEffect } from 'react'
import Search from './components/Search'
import Countries from './components/Countries'
import countryService from './services/countries'


const App = () => {

  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  
    useEffect(() => {
      console.log('effect')
      countryService.getAll()
      .then(countries => {
        console.log('promise fulfilled')
        setCountries(countries)
      })
    }, [])
    
  if(countries.length == 0)  
    return null
  


  const handleSearch = (event) =>
  {
    setSearch(event.target.value)
    
  }

  const showView = (name) =>
  {
    setSearch(name)
  }

  const Arr = countries.filter(country => country.name.official.toLowerCase().includes(search.toLowerCase()))
  const length = Arr.length

  let message = ''

  if(length > 10)
    message = "Too many matches!"
   

  return (
    <div>
      <Search search={search} handleSearch={handleSearch}/>
      {message}
      <div>{Arr.map( (country , i) => <Countries key ={i} country = {country} length = {length} showView = {() => showView(country.name.official)}/>)}</div>
    </div>
  )
}

export default App