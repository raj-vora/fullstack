import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecReducer from './anecdoteReducer'
import notifReducer from './notificationReducer'
import filterReducer from './filterReducer'
import anecdoteService from '../services/anecdotes'

const reducer = combineReducers({
    anecdotes: anecReducer,
    notification: notifReducer,
    filter: filterReducer
})

let store = createStore(reducer, composeWithDevTools())

anecdoteService.getAll().then(anecdotes => 
    anecdotes.forEach(anecdote => {
        store.dispatch({type: 'NEW_ANEC', data: anecdote})
    })
)

export default store