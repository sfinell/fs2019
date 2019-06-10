import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad
  const average = all > 0 ? (good - bad) / all : "-"
  const positive = all > 0 ? 100 * good / all : "-"

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)} >Good</button>
      <button onClick={() => setNeutral(neutral + 1)} >neutral</button>
      <button onClick={() => setBad(bad + 1)} >bad</button>
      <h1>statistics</h1>
      good {good} <br />
      neutral {neutral} <br />
      bad {bad} <br />
      all {good + neutral + bad} <br />
      average {average} <br />
      positive {positive} %<br />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
