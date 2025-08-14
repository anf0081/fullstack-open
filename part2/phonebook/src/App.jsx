import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const  [filteredList, setfilteredList] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setfilterName] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
          setfilteredList(response)
          setPersons(response)
          console.log(response)
      })
  }, [])

  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberInput = (event) => {
    setNewNumber(event.target.value)
  }
  const resetInput = () => {
    setNewName('')
    setNewNumber('')
    setfilterName('')
  }

  const handleNameFilter = (event) => {
    const filterName = event.target.value
    setfilterName(filterName)
    console.log(filterName)
    setfilteredList(persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase())));
  }

  const handleAddPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      id: newName,
    }
    if (persons.some(person => person.name === newName)) { 
      updateNumber(nameObject)
      setErrorMessage({message: `Successfully updated the number of ${nameObject.name} to ${nameObject.number}`, positive: true})
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    else {
      addPerson(nameObject)
      setErrorMessage({message: `Successfully added ${nameObject.name}`, positive: true})
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const updateNumber = (object) => {
    if (window.confirm(`${object.name} is already added to phonebook. Do you want to replace the old number with the new one?`)) {
      personService.update(object.id, object)
      .catch(err => {
        setErrorMessage(`'${object.name}' was already removed from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
      .then(returnedPerson => {
        const updatedPersons = persons.map(person => person.id === object.id ? returnedPerson : person)
        setPersons(updatedPersons)
        setfilteredList(updatedPersons)
        resetInput()
      })
    }
  }  

  const addPerson = (object) => {
    personService.create(object)
      .then(response => {
        const updatedPersons = persons.concat(response)
        setPersons(updatedPersons)
        setfilteredList(updatedPersons)
        resetInput()
      })
  }

  const handleDeletePerson = (id) => {
    const toDeletePerson = persons.find(person => person.id === id)

    if (window.confirm(`Do you want to delete ${toDeletePerson.name}?`)) {
      const updatedPersons = persons.filter(person => person.id !== id)
      personService.deleteId(id)
      .then(response => {
        setPersons(updatedPersons)
        setfilteredList(updatedPersons)
        resetInput()
        setErrorMessage({message: `Successfully deleted ${toDeletePerson.name}`, positive: false})
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      .catch(err => {
        setErrorMessage(`'${object.name}' was already removed from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    }
  }

  const deletePerson = (id) => {
    const person = persons.find(n => n.id === id)
    
  }

  

  return (
    <div>
      <h2>Phonebook</h2>
      {errorMessage && <Notification message={errorMessage.message} positive={errorMessage.positive} />}
      <Filter value={filterName} onChange={handleNameFilter} />
      <PersonForm 
        onSubmit={handleAddPerson}
        newName={newName}
        newNumber={newNumber}
        onNameChange={handleNameInput}
        onNumberChange={handleNumberInput}
      />
      <h2>Numbers</h2>
      <ul>
      {filteredList.map(person => 
        <Person key={person.id} person={person} deleteFunction={() => handleDeletePerson(person.id)} />
      )}
      </ul>
    </div>
  )
}

export default App