const Notification = ({ message, positive }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={`notification ${positive ? 'success' : 'error'}`}>
      {message}
    </div>
  )
}

export default Notification