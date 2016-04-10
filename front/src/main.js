import React from 'react'
import ReactDOM from 'react-dom'
import makeRoutes from './routes'
import Root from './containers/Root'
import configureStore from './redux/configureStore'

require("./styles/core.scss");

//const browserHistory = createBrowserHistory()

const initialState = window.__INITIAL_STATE__
const store = configureStore(initialState)


// Now that we have the Redux store, we can create our routes. We provide
// the store to the route definitions so that routes have access to it for
// hooks such as `onEnter`.
const routes = makeRoutes(store)

// Now that redux and react-router have been configured, we can render the
// React application to the DOM!
ReactDOM.render(
  <Root routes={routes} store={store} />,
  document.getElementById('root')
)