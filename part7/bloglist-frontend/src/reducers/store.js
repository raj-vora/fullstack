import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from './notificationReducer'

const reducer = combineReducers({
    notification: notificationReducer
})

let store = createStore(
    reducer, 
    applyMiddleware(thunk)
)

export default store