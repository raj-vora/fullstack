import anecdotesService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_ANEC':
      return state.concat(action.data)
    case 'VOTE':
      const id = action.data.id
      const anecToChange = state.find(a => a.id===id)
      const changedAnec = {
        ...anecToChange, votes: anecToChange.votes+1
      }
      return state.map(anec => anec.id !== id ? anec : changedAnec)
    case 'INIT_ANEC':
      return action.data
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

export const addAnecdote = content => {
  return {
    type: 'NEW_ANEC',
    data: content 
  }
}

export const newVote = id => {
  return {
    type: 'VOTE',
    data: { id }
  }
}



export default reducer