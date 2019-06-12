import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const getNextAnecdote = (count, prev) => {
  let result = prev
  while (result === prev) {
    result = Math.floor(Math.random() * count)
  }
  return result
}

const Anecdote = (props) => {
  return (
    <div>
      <h1>{props.header}</h1>
      {props.anecdotes[props.selected]} <br/>
      has {props.votes[props.selected]} votes
    </div>
  )
}

const createVotes = (count) => {
  return Array.apply(null, new Array(count)).map(Number.prototype.valueOf,0)
}

const getMostVoted = (votes) => {
  var i;
  var mostVoted = 0;
  for (i = 0; i < votes.length; i++) {
    if (votes[i] > votes[mostVoted]) {
      mostVoted = i;
    }
  }
  return mostVoted
}

const App = (props) => {
  const [selected, setSelected] = useState(-1)
  const [votes, setVotes] = useState()
  const count = props.anecdotes.length

  if (selected < 0) {
    setSelected(getNextAnecdote(count, selected))
    setVotes(createVotes(props.anecdotes.length))
    return
  }

  const handleNextAnecdote = () => {
    setSelected(getNextAnecdote(count, selected))
  }

  const handleVoteAnecdote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const mostVoted = getMostVoted(votes)

  return (
    <div>
        <Anecdote
          header="Anecdote of the day"
          anecdotes={props.anecdotes}
          votes={votes}
          selected={selected} />
        <button onClick={handleVoteAnecdote}>vote</button>
        <button onClick={handleNextAnecdote}>next anecdote</button>
        <Anecdote
          header="Anecdote with most votes"
          anecdotes={props.anecdotes}
          votes={votes}
          selected={mostVoted} />
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
