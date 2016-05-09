import React, { Component } from 'react';

import style from './patient_sign_up_view.scss';
import { Button, TextInput, PasswordInput, ImageInput } from '../../components';

import Svg from 'svg-inline-react';
import registrationIcon from '../../../assets/icons/user-tie.svg';
export class PatientSignUpView extends Component {

  render() {
    return (
      <div id="name"
        className={ style['sign-up-view'] }
      >
        <h1>Sign up</h1>
        <div className={ style['form-container'] }>
          <TextInput placeholder="Your email" />
          <TextInput placeholder="Your first name" />
          <TextInput placeholder="Your last name" />
          <TextInput placeholder="Your birthday" />
          <ImageInput />
          <PasswordInput placeholder="Your password" />
          <PasswordInput placeholder="Repeat password" />

          <Button
            label="LOGIN"
            color="dark-cyan"
            size="inherit"
          />
        </div>
      </div>
    );
  }
}

export default PatientSignUpView;