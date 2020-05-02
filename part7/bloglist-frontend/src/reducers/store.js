import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from './notificationReducer'
import blogReducer from './blogReducer'

const reducer = combineReducers({
    blog: blogReducer,
    notification: notificationReducer
})

let store = createStore(
    reducer, 
    applyMiddleware(thunk)
)

export default store