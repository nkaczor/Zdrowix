import React from 'react'
import { Route, IndexRoute } from 'react-router'

import CoreLayout from '../layouts/CoreLayout'
import HomeView from '../views/HomeView'
import MyPageView from '../views/MyPageView'

export default (store) => (
  <Route path='/' component={CoreLayout}>
    <Route path='home/:index' component={HomeView} />
    <Route path='my-page' component={MyPageView} />
  </Route>
)