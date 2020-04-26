import React from 'react'
import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { setNotif, removeNotif} from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnec = async (event) => {
        event.preventDefault()
        event.persist()
        const content = event.target.anec.value
        event.target.anec.value = ''
        dispatch(newAnecdote(content))
        dispatch(setNotif(`You added '${content}'`, 5))
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