import anecdotesService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_ANEC':
      return state.concat(action.data)
    case 'VOTE':
      return state.map(anec => anec.id !== action.data.id ? anec : action.data)
    case 'INIT_ANEC':
      return action.data.sort((a, b) => (a.votes < b.votes ? 1 : -1))
    default:
      return state.sort((a, b) => (a.votes < b.votes ? 1 : -1))
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({
      type: 'INIT_ANEC',
      data: anecdotes
    })
  }
}

export const newAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew(content)
    dispatch({
      type: 'NEW_ANEC',
      data: newAnecdote
    })
  }
}

export const newVote = anecdote => {
  return async dispatch => {
    const updatedAnecdote = await anecdotesService.update(anecdote.id, {...anecdote, votes: anecdote.votes+1})
    dispatch({
      type: 'VOTE',
      data:  updatedAnecdote
    })
    
  }
}



export default reducer