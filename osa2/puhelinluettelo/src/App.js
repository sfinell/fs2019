import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '555-123' },
    { name: 'Ada Lovelace', number: '555-124' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
  // console.log('event:', event)
  // console.log('persons:', persons)
    if (persons.findIndex(e => e.name === newName) >= 0) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const nameObject = {
      name: newName,
      number: newNumber
    }
    // console.log("uus:", persons.concat(nameObject))
    setPersons(persons.concat(nameObject))
    setNewName("")
    setNewNumber("")
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input
            value={newName}
            onChange={handleNameChange}/>
        </div>
        <div>
          number: <input
            value={newNumber}
            onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person =>
        <div key={person.name}>{person.name} {person.number} </div>)}
      <div>debug: {newName}</div>
    </div>
  )

}

export default App
