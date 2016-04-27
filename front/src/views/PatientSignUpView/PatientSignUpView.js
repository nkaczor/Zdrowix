import React, { Component } from 'react';

import style from './patient_sign_up_view.scss';
import { Button, TextInput, PasswordInput } from '../../components';
import Svg from 'svg-inline-react';
import registrationIcon from '../../../assets/icons/user-tie.svg';

export class PatientSignUpView extends Component {

  renderInputWithLabel(inputType, label) {
    return (
      <div className={ style['simple-input-box'] }>
        <h3 className={ style['input-label'] }>
            { label }:
        </h3>
        <div className={ style['input-container'] }>
          <div className="row">
          { (() => {
            switch(inputType) {
              case 'text': return <TextInput className="col-xs-12" />;
              case 'password': return <PasswordInput className="col-xs-12" />;
            }
          })() }
          </div>
        </div>
      </div>
    );
  }

  render() {
    let buttonStyle = { marginTop: '30px' };

    return (
      <div className={ style['root'] }>
        <div className={ style['title-container'] }>
          <Svg
            src={ registrationIcon }
            className={ style['registration-icon'] }
          />
          <h1 className={ style['registration-title'] }>
            Patient registration
          </h1>
        </div>

        <div className={ style['user-input-container'] }>

          { this.renderInputWithLabel('text', 'Username') }
          { this.renderInputWithLabel('text', 'First Name') }
          { this.renderInputWithLabel('text', 'Last Name') }
          { this.renderInputWithLabel('text', 'E-mail Address') }
          { this.renderInputWithLabel('password', 'Password') }
          { this.renderInputWithLabel('password', 'Confirm password') }

          <div style={ buttonStyle }>
            <Button label="Register"
              color="blue"
              size="inherit"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default PatientSignUpView;