import { useState } from 'react'

const App = () => {

  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '111-222-3333', 
    }
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

  return (
    <div>
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
      <div>{persons.map( (person , i) => <div key = {i}> {person.name} {person.number} </div>)}</div>
    </div>
  )
}

export default App