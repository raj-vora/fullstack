import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { newVote } from '../reducers/anecdoteReducer'
import { setNotif, removeNotif } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    
    const anecdotesState = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const anecdotes = anecdotesState.filter((a) => {
        return a.content.toLowerCase().indexOf(filter.toLowerCase()) !== -1 
    })

    const vote = (anecdote) => {
        dispatch(newVote(anecdote))
        dispatch(setNotif(`you voted '${anecdote.content}'`))
        setTimeout(() => {
            dispatch(removeNotif('remove'))
        }, 5000)    
    }
    return(
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList