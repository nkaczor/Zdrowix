import React from 'react'
import { Route, IndexRoute } from 'react-router'

import { LoginLayout, CoreLayout } from '../layouts'
import { SignInView, MyPageView, HomeView } from '../views'

export default (store) => (
  <Route path='/'>
    <Route path='panel' component={CoreLayout}>
      <Route path='home' component={HomeView} />
      <Route path='my-page' component={MyPageView} />
    </Route>
    <Route component={LoginLayout}>
      <Route path='sign-in' component={SignInView} />
      <Route path='sign-up' />
    </Route>
  </Route>
)