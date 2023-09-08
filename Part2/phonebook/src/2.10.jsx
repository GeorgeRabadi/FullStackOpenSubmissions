import { useState } from 'react'
import Search from './components/Search'
import Form from './components/Form'
import Numbers from './components/Numbers'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

 

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