// @flow
import React from 'react'
import { Provider } from 'react-redux'

import type { RouterHistory } from 'react-router'
import { Route, Link } from 'react-router-dom'
import { Home, About, Topics } from '../components/Widgets'

import { ConnectedRouter } from 'react-router-redux'
import configureStore from '../configure-store'
import type { StateType, ActionType } from '../configure-store'

// Create a history of your choosing (we're using a browser history in this case)
let history: ?RouterHistory = null

if (process.env.NODE_ENV === 'test') {
  const createMemoryHistory = require('history/createMemoryHistory').default
  history = createMemoryHistory()
  console.log('using createMemoryHistory for test')
} else {
  const createBrowserHistory = require('history/createBrowserHistory').default
  history = createBrowserHistory()
}

const store = configureStore(history)

export default function Root() {
  return (
    <Provider store={store}>
      { /* ConnectedRouter will use the store from Provider automatically */ }
      <ConnectedRouter history={history}>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link className="topics-link" to="/topics" onClick={e => {
              setTimeout(() => {
                console.log('Clicked!', history)
              }, 100)
            }}>Topics</Link></li>
          </ul>

          <hr />
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/topics" component={Topics} />
        </div>
      </ConnectedRouter>
    </Provider>
  )
}

// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))
