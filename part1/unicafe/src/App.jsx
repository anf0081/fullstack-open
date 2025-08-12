import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Statistics = ({statistics}) => {
  if (statistics[3].count === 0) { 
    return (
      <p>No Feedback given yet.</p>
    )
   }
   else { 
    return (
      <table>
        <tbody>
        <StatisticLine text={statistics[0].text} count={statistics[0].count} />
        <StatisticLine text={statistics[1].text} count={statistics[1].count} />
        <StatisticLine text={statistics[2].text} count={statistics[2].count} />
        <StatisticLine text={statistics[3].text} count={statistics[3].count} />
        <StatisticLine text={statistics[4].text} count={statistics[4].count} />
        <StatisticLine text={statistics[5].text} count={statistics[5].count} />
        </tbody>
      </table>
    )
   }
}

const StatisticLine = ({text, count}) => {
  return (
  <tr>
    <td>
      {text}
    </td>
    <td>
      {count}
    </td>
  </tr>
  )
} 

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const addCountGood = () => {
    setGood(good + 1)
    setAll(all + 1)
  }
  const addCountNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }
  const addCountBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
  }
  const averageCount = () => (good * 1 - bad * 1) / all
  const percentageGood = () => good / all * 100

  const statistics = [
    { text: 'good', count: good },
    { text: 'neutral', count: neutral },
    { text: 'bad', count: bad },
    { text: 'all', count: all },
    { text: 'average', count: averageCount().toFixed(1) },
    { text: 'positive', count: percentageGood().toFixed(1) },
  ]

  return (
    <div>
      <h1>Unicafe</h1>
      <h2>Give Feedback</h2>
      <Button onClick={addCountGood} text="good" />
      <Button onClick={addCountNeutral} text="neutral" />
      <Button onClick={addCountBad} text="bad" />
      <h2>Statistics</h2>
      <Statistics statistics={statistics} />
    </div>
  )
}

export default App
