import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import * as userActions from '../../redux/modules/user';
import style from './sign_in_view.scss';

import {
  Button,
  TextInput,
  PasswordInput
} from '../../components';

export class HomeView extends Component {
  static contextTypes= {
    router: PropTypes.object.isRequired
  }
  static propTypes = {
    user: PropTypes.object,
    dispatch: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      form: {
        email: '',
        password: ''
      }
    };
  }

  handleValueChange(field, e) {
    let form = Object.assign({}, this.state.form);

    form[field] = e.target.value;
    this.setState({
      form
    });
  }

  handleSignIn() {
    let { email, password } = this.state.form;

    this.props.dispatch(userActions.fetchToken(email, password))
    .then(() =>
        this.context.router.push('/panel/home')
    );
  }

  render() {
    let { form } = this.state;

    return (
      <div className={ style['sign-in-view'] }>
        <h1>Sign in</h1>
        <div className={ style['form-container'] }>
          <TextInput
            placeholder="Your login"
            value={ form.email }
            onChange={ this.handleValueChange.bind(this, 'email') }
          />
          <PasswordInput
            placeholder="Your password"
            value={ form.password }
            onChange={ this.handleValueChange.bind(this, 'password') }
          />
          <Button
            label="LOGIN"
            color="dark-cyan"
            size="inherit"
            onClick={ this.handleSignIn.bind(this) }
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