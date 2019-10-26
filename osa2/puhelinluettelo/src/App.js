import React, { useState, useEffect } from 'react'
import personService from './services/persons'

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
    <div>{props.name} {props.number} <button type="button" id={props.id} name={props.name} onClick={props.onDelete}>delete</button></div>
  )
}

const Persons = (props) => {
  return (
    <div>
      {props.persons.map(person =>
        <Person key={person.name} id={person.id} name={person.name} number={person.number} onDelete={props.onDelete}/>)}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() =>
  {
    console.log('effect')
    personService
      .getAll()
      .then(allPersons =>
        {
          console.log('allPersons:', allPersons)
          setPersons(allPersons)
        })
  }, [])
  console.log('render', persons.length, 'persons')

  const updateName = (old) => {
    console.log('updateName, id:', old.id)
    if (!window.confirm(`${newName} is already added to phonebook, replace ${old.id}?`)) return
    const changedPerson = { ...old, number: newNumber }
    personService.update(old.id, changedPerson).then(updatedPerson => {
      setPersons(persons.map(p => p.id !== old.id ? p : updatedPerson))
      setNewName("")
      setNewNumber("")
    })
  }

  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const old = persons.find(e => e.name === newName)
    if (old) {
      updateName(old)
      return
    }
    const nameObject = {
      name: newName,
      number: newNumber
    }
    personService.create(nameObject)
    .then(newPerson => {
      setPersons(persons.concat(newPerson))
      setNewName("")
      setNewNumber("")
    })
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

  const deleteName = (event) => {
    event.preventDefault()
    const id = Number(event.target.id)
    const name = event.target.name
    console.log('delete id, name:', id, name)
    const remove = window.confirm(`Delete ${name} ?`)
    if (remove) {
      personService.remove(id)
        .then(removedPerson => {
          setPersons(persons.filter(p => p.id !== id))
      })
    }
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
      <Persons persons={filteredPersons()} onDelete={deleteName}/>
    </div>
  )
}

export default App
