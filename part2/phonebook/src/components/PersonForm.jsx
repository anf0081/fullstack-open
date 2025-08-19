const PersonForm = ({ onSubmit, newName, newNumber, onNameChange, onNumberChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-field">
        <label>name:</label>
        <input value={newName} onChange={onNameChange} />
      </div>
      <div className="form-field">
        <label>number:</label>
        <input value={newNumber} onChange={onNumberChange} />
      </div>
      <button type="submit">Add Name</button>
    </form>
  )
}

export default PersonForm