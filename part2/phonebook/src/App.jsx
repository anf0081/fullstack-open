import './App.css'
import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setfilterName] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  
  useEffect(() => {
    personService
      .getAll()
      .then(response => {
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
  }

  const handleNameFilter = (event) => {
   setfilterName(event.target.value)
  }

  const handleAddPerson = (event) => {
  event.preventDefault()
  let nameObject = {
    name: newName,
    number: newNumber,
  }
  const existingPerson = persons.find(person => person.name === newName)
  if (existingPerson) { 
    const updatedPerson = {...nameObject, id: existingPerson.id}
    updateNumber(updatedPerson)
  } else {
    addPerson(nameObject)
  }
}

  const updateNumber = (updatedPerson) => {
  if (window.confirm(`${updatedPerson.name} is already added to phonebook. Do you want to replace the old number with the new one?`)) {
    personService.update(updatedPerson)
      .then(response => {
          const updatedPersons = persons.map(person => person.id === updatedPerson.id ? response : person)
          setPersons(updatedPersons)
          setErrorMessage({message: `Successfully updated the number of ${updatedPerson.name} to ${updatedPerson.number}`, positive: true})
          resetInput()
      })
      .catch(error => {
        let msg = `Failed to update '${updatedPerson.name}'.`
        if (error.response && error.response.data && error.response.data.error) {
          msg += ' ' + error.response.data.error
        }
        setErrorMessage({message: msg})
      })
      .finally(() => {
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }
}


  const addPerson = (newPerson) => {
    personService.create(newPerson)
      .then(response => {
        setPersons(persons.concat(response))
        setErrorMessage({message: `Successfully added ${response.name}.`, positive: true})
        resetInput()
      })
      .catch(error => {
      let msg = 'Failed to add person.'
        if (error.response && error.response.data && error.response.data.error) {
          msg += ' ' + error.response.data.error
        }
      setErrorMessage({message: msg})
      })
      .finally(() => {
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const handleDeletePerson = (id) => {
    const toDeletePerson = persons.find(person => person.id === id)
    if (window.confirm(`Do you want to delete ${toDeletePerson.name}?`)) {
      personService.deleteId(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
        setErrorMessage({message: `Successfully deleted ${toDeletePerson.name}.`})
      })
      .catch(error => {
        let msg = `'${toDeletePerson.name}' was already removed from server.`
        if (error.response && error.response.data && error.response.data.error) {
          msg += ': ' + error.response.data.error
        }
        setErrorMessage({message: msg})
      })
      .finally(() => {
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    }
  }
  
  const filteredList = persons.filter(person =>
  person.name.toLowerCase().includes(filterName.toLowerCase())
  )

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