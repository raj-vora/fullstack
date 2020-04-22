import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {

  let good=store.getState().good, ok=store.getState().ok, bad=store.getState().bad
  const setGood = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const setNeutral = () => {
    store.dispatch({
      type: 'OK'
    })
  }

  const setBad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const reset = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  const all = good+ok+bad
  const average = (good+bad*-1)/all
  const positive = good/all*100

  return (
    <div>
      <button onClick={setGood}>good</button> 
      <button onClick={setNeutral}>neutral</button> 
      <button onClick={setBad}>bad</button>
      <button onClick={reset}>reset stats</button>
      {all===0
        ? <div><h4>No feedback given</h4></div>
        : <div>
          <div>good {store.getState().good}</div>
          <div>neutral {store.getState().ok}</div>
          <div>bad {store.getState().bad}</div>
          <div>all {all}</div>
          <div>average {average}</div>
          <div>positive {positive}</div>
          </div>
      }
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)