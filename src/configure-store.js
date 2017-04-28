import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import { createLogger } from 'redux-logger'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import reducers from './reducers' // Or wherever you keep your reducers

// https://github.com/zalmoxisus/redux-devtools-extension
let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function configureStore(history, initialState = {}) {
  // Create a history of your choosing (we're using a browser history in this case)
  let middlewares = [thunk, promiseMiddleware(), routerMiddleware(history)]
  if (process.env.NODE_ENV === 'development') {
    middlewares.unshift(createLogger())
  }
  let middlewareEnhancer = applyMiddleware(...middlewares)
  // Build the middleware for intercepting and dispatching navigation actions

  // Add the reducer to your store on the `router` key
  // Also apply our middleware for navigating
  const store = createStore(
    combineReducers({
      ...reducers,
      router: routerReducer
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
