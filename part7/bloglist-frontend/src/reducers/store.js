import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from './notificationReducer'
import blogReducer from './blogReducer'
import loginReducer from './loginReducer'
import usersReducer from './usersReducer'

const reducer = combineReducers({
    blog: blogReducer,
    notification: notificationReducer,
    login: loginReducer,
    users: usersReducer
})

let store = createStore(
    reducer, 
    applyMiddleware(thunk)
)

export default store