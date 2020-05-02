import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from './notificationReducer'
import blogReducer from './blogReducer'
import userReducer from './userReducer'

const reducer = combineReducers({
    blog: blogReducer,
    notification: notificationReducer,
    user: userReducer
})

let store = createStore(
    reducer, 
    applyMiddleware(thunk)
)

export default store