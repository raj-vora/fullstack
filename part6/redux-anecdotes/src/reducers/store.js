import reducer from './anecdoteReducer'
import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

let store = createStore(reducer, composeWithDevTools())

export default store