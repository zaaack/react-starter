// @flow
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import type { RouterHistory, Location } from 'react-router'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import { createLogger } from 'redux-logger'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import reducers from './reducers' // Or wherever you keep your reducers
// Fix https://github.com/benmosher/eslint-plugin-import/issues/708
// eslint-disable-next-line import/named
import type { Store, Middleware } from 'redux'

// https://github.com/zalmoxisus/redux-devtools-extension
let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

type A = {
  aa: 1
}

const a: A = {
  aa: 1,
  bb: 2
}

const b: A = {
  bb: 2
}

export type ActionType = {
  type: string,
  payload?: Object | Promise<*> | {
    promise: Promise<*>,
    data?: Object,
  },
  meta?: Object,
}

export type StateType = {
  location?: Location
}

export default function configureStore(history: RouterHistory, initialState: StateType = {}): Store<StateType, ActionType> {
  // Create a history of your choosing (we're using a browser history in this case)
  let middlewares = [thunk, promiseMiddleware(), routerMiddleware(history)]
  if (process.env.NODE_ENV === 'development') {
    middlewares.unshift(createLogger())
  }
  let middlewareEnhancer = applyMiddleware(...middlewares)
  // Build the middleware for intercepting and dispatching navigation actions

  // Add the reducer to your store on the `router` key
  // Also apply our middleware for navigating
  const store: Store<StateType, ActionType> = createStore(
    combineReducers({
      ...reducers,
      router: routerReducer,
    }),
    initialState,
    composeEnhancers(middlewareEnhancer)
  )
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      store.replaceReducer(reducers)
    })
  }
  return store
}
