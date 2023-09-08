import { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'
import Form from './components/Form'
import Numbers from './components/Numbers'
import personSerivce from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  
    useEffect(() => {
      console.log('effect')
      personSerivce.getAll()
      .then(persons => {
        console.log('promise fulfilled')
        setPersons(persons)
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

  if(persons.filter(person => person.number === newNumber).length != 0)
      alert(newNumber + ' is already added to phonebook')
  else if (persons.filter(person => person.name === newName).length != 0)
  {
      const response = confirm(newName + "is already in the phonebook. Update Number?")

      if(response)
      {

        const oldPerson = persons.find(person => person.name === newName)
        const updatedPerson = {...oldPerson, number: newNumber}

        personSerivce.update(updatedPerson.id, updatedPerson)
        .then((updatedPerson) => {
          setPersons(persons.map(person => person.name == updatedPerson.name ? updatedPerson : person))
        })
        }
  }
  else
  {
    personSerivce.create(input)
      .then(newPerson => {
        setPersons(persons.concat(newPerson))
      })

  }
      

}

const deletePerson = id => {

  const response = confirm("Are you sure?")

  if(response){

    personSerivce.deletePerson(id)
      .then(() => {
        console.log('promise fulfilled')
        setPersons(persons.filter(person => person.id != id))
      })

  }
  
} 

  return (
    <div>
      <Search search={search} handleSearch={handleSearch}/>
      <Form addPerson = {addPerson} newName = {newName} handleNameChange = {handleNameChange} newNumber = {newNumber} handleNumberChange = {handleNumberChange} />
      <h2>Numbers</h2>
      {persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase())).map(person => <Numbers key = {person.id} name= {person.name} number =  {person.number} deletePerson = {() => deletePerson(person.id)} />)}
    </div>
  )
}

export default App