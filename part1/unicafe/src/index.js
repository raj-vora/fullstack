import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Statistic = ({text, value}) => <td>{text} {value}</td>

const Statistics = ({good, neutral, bad}) => {
  const all = good+neutral+bad
  const average = (good+bad*-1)/all
  const positive = good/all*100
  
  if(all===0) {
    return (
      <div><h4>No feedback given</h4></div>
    )
  }

  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <tr><Statistic text='Good' value={good} /></tr>
          <tr><Statistic text='Good' value={good} /></tr>
          <tr><Statistic text='Neutral' value={neutral} /></tr>
          <tr><Statistic text='Bad' value={bad} /></tr>
          <tr><Statistic text='All' value={all} /></tr>
          <tr><Statistic text='Average' value={average} /></tr>
          <tr><Statistic text='Positive' value={positive+' %'} /></tr>
        </tbody>
      </table>
    </div>
  )
}

const App = props => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={() => setGood(good + 1)} text='Good' />
      <Button onClick={() => setNeutral(neutral + 1)} text='Neutral' />
      <Button onClick={() => setBad(bad + 1)} text='Bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)