import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { LoginLayout, CoreLayout } from '../layouts';
import {
  PatientSignUpView,
  DoctorSignUpView,
  SignInView,
  MyPageView,
  HomeView,
  WelcomeView } from '../views';

let redirectIfUserIsNotLogged = (nextState, replace) => {
  if (!localStorage.user) {
    replace({ pathname: '/sign-in', state: { nextPathname: nextState.location.pathname }});
  }
};

let makeRoutes = () => {
  return (
    <Route path="/">
      <IndexRoute component={ WelcomeView } />
      <Route path="panel"
        component={ CoreLayout }
        onEnter={ redirectIfUserIsNotLogged }
      >
        <Route path="home"
          component={ HomeView }
        />
        <Route path="my-page"
          component={ MyPageView }
        />

      </Route>

      <Route component={ LoginLayout }>
        <Route path="sign-in"
          component={ SignInView }
        />
        <Route path="patient/sign-up"
          component={ PatientSignUpView }
          />
        <Route path="doctor/sign-up"
          component={ DoctorSignUpView }
          />

      </Route>
    </Route>
);
};

export default makeRoutes;
