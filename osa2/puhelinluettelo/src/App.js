import React, { useState } from 'react'

const Filter = (props) => {
  return (
    <div>filter shown with <input
      value={props.value}
      onChange={props.onChange}/>
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
    <div>
      name: <input
        value={props.name}
        onChange={props.onNameChange}/>
    </div>
    <div>
      number: <input
        value={props.number}
        onChange={props.onNumberChange}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
    </form>
  )
}

const Person = (props) => {
  return (
    <div>{props.name} {props.number} </div>
  )
}

const Persons = (props) => {
  return (
    <div>
      {props.persons.map(person =>
        <Person key={person.name} name={person.name} number={person.number}/>)}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '555-123' },
    { name: 'Ada Lovelace', number: '555-124' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

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
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const re = new RegExp(filter, "i");
  const filteredPersons = () => persons.filter(e => re.test(e.name))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addName}
        name={newName}
        onNameChange={handleNameChange}
        number={newNumber}
        onNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons()} />
    </div>
  )
}

export default App
