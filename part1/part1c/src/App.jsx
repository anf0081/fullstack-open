import { useState } from 'react'

const History = ({allClicks}) => {
  if (allClicks.length === 0) {
    return (
      <div>
        The app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {allClicks.join('--')}
    </div>
  )
}

const Total = ({total}) => <div>Total Button presses: {total}</div>

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
    setTotal(total + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
    setTotal(total + 1)
  }

  return (
    <div>
      <p>{total}</p>
      {left}
      <Button onClick={handleLeftClick} text="left" />
      <Button onClick={handleRightClick} text="right" />
      {right}
      <History allClicks={allClicks} />
      <Total total={total} />
    </div>
  )
}

export default App