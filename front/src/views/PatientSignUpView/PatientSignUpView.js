import React, { Component } from 'react';

import style from './patient_sign_up_view.scss';
import { Button, TextInput } from '../../components';
import Svg from 'svg-inline-react';
import registrationIcon from '../../../assets/icons/user-tie.svg';

class Input extends React.Component {
  render() {
    return (
      <div className={ style['simple-input-box'] }>
        <h3 className={ style['input-label'] }>
            { this.props.text }:
        </h3>
        <div className={ style['input-container'] }>
          <div className="row">
            {
              // jbc to ten row + col-xs mi sie tu nie podoba trzeba to zmienic
              // ale inaczej wylazi poza input-container plus jest na 100% szerokosci
            }
            <TextInput className="col-xs-12" />
          </div>
        </div>
      </div>
    );
  }
}

export class PatientSignUpView extends Component {

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

          <Input text="Username" />
          <Input text="First Name" />
          <Input text="Last Name" />
          <Input text="E-mail Address" />
          <Input text="Password" />
          <Input text="Repeat password" />

          <div style={ buttonStyle }>
              {
                // dlaczego jak dodam te style do Button
                // to mi ten styl ignoruje? a jak jest tu to nie?
              }
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