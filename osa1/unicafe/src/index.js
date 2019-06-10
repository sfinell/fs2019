import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  if (all === 0) {
    return (
      <>
        <h1>statistics</h1>
        No feedback given
      </>
    )
  }
  const average = all > 0 ? (good - bad) / all : "-"
  const positive = all > 0 ? 100 * good / all : "-"

  return (
    <>
    <h1>statistics</h1>
    good {good} <br />
    neutral {neutral} <br />
    bad {bad} <br />
    all {good + neutral + bad} <br />
    average {average} <br />
    positive {positive} %<br />
    </>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)} >Good</button>
      <button onClick={() => setNeutral(neutral + 1)} >neutral</button>
      <button onClick={() => setBad(bad + 1)} >bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
