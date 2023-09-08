import { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'
import Form from './components/Form'
import Numbers from './components/Numbers'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  
    useEffect(() => {
      console.log('effect')
      axios
        .get('http://localhost:3001/persons')
        .then(response => {
          console.log('promise fulfilled')
          setPersons(response.data)
        })
    }, [])
    console.log('render', persons.length, 'persons')
  

  const handleNameChange = (event) =>
  {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) =>
  {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) =>
  {
    setSearch(event.target.value)
    
  }

  const addPerson = (event) =>
{
  event.preventDefault();

  if(newName == '' || newNumber == ''){
    alert('number and name cannot be empty!')
    return}

  const input = {
    name: newName,
    number: newNumber,
    id: persons.length + 1 
  }

  if(persons.filter(person => person.name === newName || person.number == newNumber).length != 0)
      alert(newName + ' or ' + newNumber + ' is already added to phonebook')
  else
      setPersons(persons.concat(input))

}


  return (
    <div>
      <Search search={search} handleSearch={handleSearch}/>
      <Form addPerson = {addPerson} newName = {newName} handleNameChange = {handleNameChange} newNumber = {newNumber} handleNumberChange = {handleNumberChange} />
      <Numbers persons = {persons} search = {search} />
    </div>
  )
}

export default App