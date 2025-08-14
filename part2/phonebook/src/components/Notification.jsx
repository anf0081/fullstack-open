const Notification = ({ message, positive }) => {
  const baseStyle = {
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '20px'
  }

  const notificationStyle = { ...baseStyle, color: positive ? 'green' : 'red' }

  if (message === null) {
    return null
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification