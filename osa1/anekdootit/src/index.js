import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const getNextAnecdote = (anecdotes) => {
  const result = Math.floor(Math.random() * anecdotes.length)
  console.log("randomize...[ 0,", anecdotes.length, "[:", result)
  return result
}

const getNextAnecdoteText = (anecdotes, selected) => {
  if (selected < 0) {
    console.log("first time:", selected)
    selected = getNextAnecdote(anecdotes)
  }
  console.log("now index:", selected)
  return anecdotes[selected]
}

const MyState = (props) => {
  console.log("MyState - count:", props.count)
  return (
    <p> MyState: {props.count} </p>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(-1)
  console.log("A: ", selected)

  if (selected < 0) {
    setSelected(getNextAnecdote(props.anecdotes))
    console.log("B: ", selected)
    return
  }
  console.log("C: ", selected)

const handleNextAnecdote = () => {
    const prev = selected
    const next = getNextAnecdote(props.anecdotes)
///    setSelected(getNextAnecdote(props.anecdotes))
    setSelected(next)
    console.log("prev->next: ", prev, "->", next)
  }

  const numOfAnecdotes = props.anecdotes.length
  const nextAnecdote = selected

  return (
    <div>
        <button onClick={handleNextAnecdote}>next anecdote</button>
        <br/>
        selected: {selected} <br/>
        num of: {numOfAnecdotes} <br/>
        next: {nextAnecdote} <br/>
        {selected}: {props.anecdotes[selected]}
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
