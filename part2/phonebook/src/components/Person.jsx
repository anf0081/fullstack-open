import personService from '../services/persons'

const Person = ({person, deleteFunction}) => {
  
  return (
    <>
      <li>
        {person.name} {person.number} <button onClick={deleteFunction}>delete</button>
      </li>
    </>
  )
}

export default Person