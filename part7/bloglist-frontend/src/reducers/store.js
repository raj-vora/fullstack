import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from './notificationReducer'
import blogReducer from './blogReducer'
import loginReducer from './loginReducer'

const reducer = combineReducers({
    blog: blogReducer,
    notification: notificationReducer,
    login: loginReducer
})

let store = createStore(
    reducer, 
    applyMiddleware(thunk)
)

export default store