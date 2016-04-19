import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import style from './sign_in_view.scss';
import {
  Button,
  TextInput,
  PasswordInput
} from '../../components';

export class HomeView extends Component {
  static propTypes = {
    user: PropTypes.object
  };

  render() {
    return (
      <div className={ style['sign-in-view'] }>
        <h1>Sign in</h1>
        <div className={ style['form-container'] }>
          <TextInput placeholder="Your login" />
          <PasswordInput placeholder="Your password" />
          <Button
            label="LOGIN"
            color="dark-cyan"
            size="inherit"
          />
        </div>
        <div className={ style['sign-up-hint'] }>
          Not registered yet? Create an account! <br />
          I'm
          <Link
            to=""
            className={ style['sign-up-link'] }
          >
           Patient
          </Link>
          I'm
          <Link
            to=""
            className={ style['sign-up-link'] }
          >
          Doctor
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    counter: state.counter
  };
};

export default connect(mapStateToProps)(HomeView);