import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const getNextAnecdote = (count, prev) => {
  let result = prev
  while (result === prev) {
    result = Math.floor(Math.random() * count)
    console.log("randomize...[ 0,", count, "[:", result)
  }
  return result
}

// const getNextAnecdoteText = (anecdotes, selected) => {
//   if (selected < 0) {
//     console.log("first time:", selected)
//     selected = getNextAnecdote(anecdotes)
//   }
//   console.log("now index:", selected)
//   return anecdotes[selected]
// }

// const MyState = (props) => {
//   console.log("MyState - count:", props.count)
//   return (
//     <p> MyState: {props.count} </p>
//   )
// }

const Votes = (props) => {
  console.log("Votes - count:", props.count)
  return (
    <p>
      AllVotes: {props.votes} <br/>
      Vote[0]: {props.votes[0]} <br/>
      Vote[1]: {props.votes[1]} <br/>
      Vote[2]: {props.votes[2]} <br/>
      Vote[3]: {props.votes[3]} <br/>
      Vote[4]: {props.votes[4]} <br/>
      Vote[5]: {props.votes[5]} <br/>
    </p>
  )
}

const createVotes = (count) => {
  console.log("createVotes():", count)
  return Array.apply(null, new Array(count)).map(Number.prototype.valueOf,0)
}

const App = (props) => {
  const [selected, setSelected] = useState(-1)
  const [votes, setVotes] = useState()
  const count = props.anecdotes.length
  console.log("A: ", selected)
  console.log("count:", count, "votes: ", votes)

  if (selected < 0) {
    setSelected(getNextAnecdote(count, selected))
    setVotes(createVotes(props.anecdotes.length))
    console.log("B: ", selected)
    return
  }
  console.log("C: ", selected)

  const handleNextAnecdote = () => {
    const prev = selected
    const next = getNextAnecdote(count, selected)
///    setSelected(getNextAnecdote(props.anecdotes))
    setSelected(next)
    console.log("prev->next: ", prev, "->", next)
  }

  const handleVoteAnecdote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
    console.log("voted: ", selected, ":", copy[selected])
  }

  const numOfAnecdotes = props.anecdotes.length
  const nextAnecdote = selected

  return (
    <div>
        <button onClick={handleVoteAnecdote}>vote</button>
        <button onClick={handleNextAnecdote}>next anecdote</button>
        <br/>
        selected: {selected} <br/>
        num of: {numOfAnecdotes} <br/>
        next: {nextAnecdote} <br/>
        <Votes count={6} votes={votes} />
        {selected}: {props.anecdotes[selected]} <br/>
        has {votes[selected]} votes
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
