import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { LoginLayout, CoreLayout, DoctorLayout } from '../layouts';
import {
  AskTheDoctorView,
  SignUpConfirmationView,
  PatientSignUpView,
  DoctorSignUpView,
  FindDoctorView,
  SignInView,
  MyPageView,
  HomeView,
  WelcomeView,
  SettingsView,
  WorkScheduleView,
  CalendarView,
  NewVisitConfirmView } from '../views';

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
        <Route path="doctor/:id"
          component={ DoctorLayout }
        >
          <IndexRoute
            component={ CalendarView }
          />
          <Route path="ask-the-doctor"
            component={ AskTheDoctorView }
          />
        <Route path="confirm/:date/:hour"
            component={ NewVisitConfirmView }
          />
        </Route>
        <Route path="home"
          component={ HomeView }
        />
        <Route path="my-page"
          component={ MyPageView }
        />
        <Route path="find-doctor"
          component={ FindDoctorView }
        />
        <Route path="settings"
          component={ SettingsView }
        />
        <Route path="work-schedule"
          component={ WorkScheduleView }
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
        <Route path="sign-up-confirmation"
          component={ SignUpConfirmationView }
        />

      </Route>
    </Route>
);
};

export default makeRoutes;
