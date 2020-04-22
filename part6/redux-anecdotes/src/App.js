import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector(state => state).sort((a, b) => (a.votes < b.votes ? 1 : -1))
  const dispatch = useDispatch()
  

  const vote = (id) => {
    dispatch({
      type: 'VOTE',
      data: { id }
    })
  }

  const addAnec = (event) => {
    event.preventDefault()
    dispatch({
      type: 'NEW_ANEC',
      data: event.target.anec.value 
    })
    event.target.anec.value = ''
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnec}>
        <div><input name="anec" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App