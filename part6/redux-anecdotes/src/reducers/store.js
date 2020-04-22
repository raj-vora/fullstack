import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecReducer from './anecdoteReducer'
import notifReducer from './notificationReducer'

const reducer = combineReducers({
    anecdotes: anecReducer,
    notification: notifReducer
})

let store = createStore(reducer, composeWithDevTools())

export default store