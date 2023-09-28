import React, { useState, useEffect } from 'react'
import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}


const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState([])

  useEffect(() => {
    getAll()
    .then(countries => {
      console.log(countries)
      setCountry(countries)
    })
  }, [])

  if(country.length == 0)  
  return null

  const foundCountry = country.find(country => country.name.official.toLowerCase().includes(name.toLowerCase()))

  return foundCountry
}

const Country = ({ country }) => {

  if (country === undefined) {
    return (
      <div>
        not found
      </div>
    )
  }

  if (country === null) {
    return (
      <div>
        not found
      </div>
    )
  }


  return (
    <div>
      <h3>{country.name.official} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div>
      <div>{country.flag} flag of {country.name.official} </div>
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App