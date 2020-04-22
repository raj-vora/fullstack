import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnec = (event) => {
        event.preventDefault()
        dispatch(addAnecdote(event.target.anec.value))
        event.target.anec.value = ''
      }

    return(
        <div>
            <h2>Create new</h2>
            <form onSubmit={addAnec}>
                <div><input name="anec" /></div>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm