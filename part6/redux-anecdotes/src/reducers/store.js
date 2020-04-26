import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecReducer from './anecdoteReducer'
import notifReducer from './notificationReducer'
import filterReducer from './filterReducer'

const reducer = combineReducers({
    anecdotes: anecReducer,
    notification: notifReducer,
    filter: filterReducer
})

let store = createStore(
    reducer, 
    composeWithDevTools(
        applyMiddleware(thunk)
    ))

export default store