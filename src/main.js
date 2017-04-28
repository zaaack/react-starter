import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import Root from './containers/Root'

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  )
}

render(Root)

if (module.hot) {
  // const NextRoot = require('./containers/Root').default
  module.hot.accept('./containers/Root', () => {
    render(Root)
  })
}

// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))
