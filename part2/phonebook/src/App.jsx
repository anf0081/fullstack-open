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

  let nameObject = {
    name: newName,
    number: newNumber,
  }
  if (persons.some(person => person.name === newName)) { 
    const existingPerson = persons.find(person => person.name === newName)
    const updatedObject = {...nameObject, id: existingPerson.id}
    updateNumber(updatedObject)
  } else {
    addPerson(nameObject)
  }
}

  const updateNumber = (updatedPerson) => {
  if (window.confirm(`${updatedPerson.name} is already added to phonebook. Do you want to replace the old number with the new one?`)) {
    personService.update(updatedPerson)
      .then(response => {
        if (!response) {
          setErrorMessage({message: `Failed to update '${updatedPerson.name}'. Please add a number with minimum 8 characters.`})
        } else {
          const updatedPersons = persons.map(person => person.id === updatedPerson.id ? response : person)
          setPersons(updatedPersons)
          setfilteredList(updatedPersons)
          setErrorMessage({message: `Successfully updated the number of ${updatedPerson.name} to ${updatedPerson.number}`, positive: true})
          resetInput()
        }
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      .catch(() => {
        setErrorMessage({message: `Failed to update '${updatedPerson.name}'. Please add a number with minimum 8 characters.`})
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }
}


  const addPerson = (newPerson) => {
    personService.create(newPerson)
      .then(response => {
        if (response) {
        const updatedPersons = persons.concat(response)
        setPersons(updatedPersons)
        setfilteredList(updatedPersons)
        setErrorMessage({message: `Successfully added ${updatedPersons.name}`, positive: true})
        resetInput()
        } 
      }).catch(() => {
        setErrorMessage({message: 'Failed to add person. Please add a name with minimum 3 and a number with minimum 8 characters.'})
      })
      setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
  }

  const handleDeletePerson = (id) => {
    const toDeletePerson = persons.find(person => person.id === id)

    if (window.confirm(`Do you want to delete ${toDeletePerson.name}?`)) {
      const updatedPersons = persons.filter(person => person.id !== id)
      personService.deleteId(id)
      .then(() => {
        setPersons(updatedPersons)
        setfilteredList(updatedPersons)
        resetInput()
        setErrorMessage({message: `Successfully deleted ${toDeletePerson.name}`, positive: false})
      })
      .catch(() => {
        resetInput()
        setErrorMessage(`'${toDeletePerson.name}' was already removed from server`)
  
      })
      setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
    }
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