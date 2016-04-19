import React from 'react';
import { Route } from 'react-router';

import WelcomeView from '../views/WelcomeView'
import { LoginLayout, CoreLayout } from '../layouts';
import { SignInView, MyPageView, HomeView } from '../views';

let makeRoutes = () => {
  return (
    <Route path="/">
      <Route path="" component={ WelcomeView }
      <Route path="panel"
        component={ CoreLayout }
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
        <Route path="patient/sign-up" />
        <Route path="doctor/sign-up" />

      </Route>
    </Route>
);
};

export default makeRoutes;
