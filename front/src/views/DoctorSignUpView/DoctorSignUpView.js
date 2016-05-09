import React, { Component } from 'react';

import style from './doctor_sign_up_view.scss';
import { Select, Button, TextInput, PasswordInput, ImageInput } from '../../components';

import Svg from 'svg-inline-react';
import registrationIcon from '../../../assets/icons/user-tie.svg';
import { Link } from 'react-router';
export class DoctorSignUpView extends Component {

  render() {
    let items = [ { label: 'jeden', id: 1 }, { label: 'dwa', id: 2 } ];

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
          <Select
            placeholder="Your specialization"
            size="inherit"
            items={ items }
            error="This field is required"
          />
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

export default DoctorSignUpView;