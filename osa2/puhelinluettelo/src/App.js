import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' },
    { name: 'Ada Lovelace' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
//    console.log('event:', event)
    const nameObject = {
      name: newName
    }
  // console.log('persons:', persons)
  // console.log('nameObject:', nameObject)
  // console.log('findIndex:', persons.findIndex(e => e.name === newName))
  if (persons.findIndex(e => e.name === newName) >= 0) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    // console.log("uus:", persons.concat(nameObject))
    setPersons(persons.concat(nameObject))
    setNewName("")
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
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
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <div key={person.name}>{person.name} </div>)}
      <div>debug: {newName}</div>
    </div>
  )

}

export default App
