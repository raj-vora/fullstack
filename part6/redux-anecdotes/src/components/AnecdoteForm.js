import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotif, removeNotif} from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnec = (event) => {
        event.preventDefault()
        dispatch(addAnecdote(event.target.anec.value))
        dispatch(setNotif(`You added '${event.target.anec.value}'`))
        setTimeout(() => {
            dispatch(removeNotif('remove'))
        }, 5000)
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