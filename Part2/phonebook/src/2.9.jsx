import { useState } from 'react'

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

  const addPerson = (event) =>
  {
    event.preventDefault();

    if(newName == '' || newNumber == ''){
      alert('number and name cannot be empty!')
      return}

    const input = {
      name: newName,
      number: newNumber
    }

    if(persons.filter(person => person.name === newName || person.number == newNumber).length != 0)
        alert(newName + ' or ' + newNumber + ' is already added to phonebook')
    else
        setPersons(persons.concat(input))

  }

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

  return (
    <div>
      <div>
        Search: <input value = {search} onChange={handleSearch}/>
      </div>
      <h2>Phonebook</h2>
      <form onSubmit = {addPerson}>
        <div>
          name: <input value = {newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value = {newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>{persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase())).map( person => <div key = {person.id}> {person.name} {person.number} </div>)}</div>
    </div>
  )
}

export default App