const Filter = ({ value, onChange }) => {
  return (
    <p>
        filter by <input value={value} onChange={onChange} />
    </p>
  )
}

export default Filter