const PersonForm = ({ onSubmit, newName, newNumber, onNameChange, onNumberChange }) => {
  return (
    <form onSubmit={onSubmit}>
      name: <input value={newName} onChange={onNameChange} /><br />
      number: <input value={newNumber} onChange={onNumberChange} /><br />
      <button type="submit">Add Name</button>
    </form>
  )
}

export default PersonForm