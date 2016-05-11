import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import style from './sign_up_confirmation_view.scss';
import {
  Button
} from '../../components';

export class SignUpConfirmationView extends Component {
  static contextTypes= {
    router: PropTypes.object.isRequired
  }

  goTo(url) {
    this.context.router.push(url);
  }

  render() {
    return (
      <div className={ style['sign-up-confirmation'] }>
        <h1>Thank you for your registration</h1>

        <div className={ style['wishes'] }>
        We are glad you decided to join us but we hope that you will never have to use our site
          <br />
        Our team hopes you have a healthy day!
        </div>

        <div className={ style['button-container'] }>
          <Button
            label="SIGN IN"
            color="dark-cyan"
            size="inherit"
            onClick={ this.goTo.bind(this, '/sign-in') }
          />
        </div>
      </div>
    );
  }
}

export default SignUpConfirmationView;