import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {

  const good = () => {
    store.dispatch({
      type: 'GOOD',
      payload: {
        good: store.getState().good + 1,
        bad: store.getState().bad,
        ok: store.getState().ok,
      }
    })
  }

  const bad = () => {
    store.dispatch({
      type: 'BAD',
      payload: {
        good: store.getState().good,
        bad: store.getState().bad  + 1,
        ok: store.getState().ok,
      }
    })
  }
  
  const ok = () => {
    store.dispatch({
      type: 'BAD',
      payload: {
        good: store.getState().good,
        bad: store.getState().bad,
        ok: store.getState().ok  + 1,
      }
    })
  }

  return (
    <div>
      <button onClick={good}>good</button> 
      <button onClick={ok}>ok</button> 
      <button onClick={bad}>bad</button>
      <button>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
