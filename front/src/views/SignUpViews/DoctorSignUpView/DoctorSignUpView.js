import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import style from './doctor_sign_up_view.scss';
import { Select, Button, TextInput, PasswordInput, ImageInput } from '../../../components';
import * as userActions from '../../../redux/modules/user';
import * as specialtyActions from '../../../redux/modules/specialty';

export class DoctorSignUpView extends Component {

  static contextTypes= {
    router: PropTypes.object.isRequired
  }

  static propTypes = {
    dispatch: PropTypes.func,
    specialties: PropTypes.array
  }

  constructor(props) {
    super(props);
    this.state = {
      form: {
        email: '',
        password: '',
        repeatPassword: '',
        firstName: '',
        lastName: '',
        specialty: ''
      }
    };
  }

  componentDidMount() {
    this.props.dispatch(specialtyActions.fetchSpecialities());
  }

  handleValueChange(field, e) {
    let form = Object.assign({}, this.state.form);

    form[field] = e.target.value;
    this.setState({
      form
    });
  }

  handleSelectChange(e) {
    let form = Object.assign({}, this.state.form);

    form.specialty = e.target.value;
    this.setState({
      form
    });
  }

  handleSignUp() {
    let { form } = this.state;

    if (form.password !== form.repeatPassword) {
      return;
    }

    let userData = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
      specialty: form.specialty,
      type: 'doctor'
    };

    this.props.dispatch(userActions.fetchSignUp(userData))
    .then(() =>
        this.context.router.push('/sign-in')
    );
  }

  render() {
    let { form } = this.state;
    let items = this.props.specialties.map(x => {
      return {
        label: x.name,
        value: x._id
      };
    });

    return (
      <div id="name"
        className={ style['sign-up-view'] }
      >
        <h1>Sign up</h1>
        <div className={ style['form-container'] }>
          <TextInput
            placeholder="Your email"
            value={ form.email }
            onChange={ this.handleValueChange.bind(this, 'email') }
          />
          <TextInput
            placeholder="Your first name"
            value={ form.firstName }
            onChange={ this.handleValueChange.bind(this, 'firstName') }
          />
          <TextInput
            placeholder="Your last name"
            value={ form.lastName }
            onChange={ this.handleValueChange.bind(this, 'lastName') }
          />
          <TextInput
            placeholder="Your birthday"
          />
          <ImageInput />
          <Select
            placeholder="Your specialization"
            size="inherit"
            items={ items }
            error="This field is required"
            onChange={ this.handleSelectChange.bind(this) }
          />
          <PasswordInput
            placeholder="Your password"
            value={ form.password }
            onChange={ this.handleValueChange.bind(this, 'password') }
          />
          <PasswordInput
            placeholder="Repeat password"
            value={ form.repeatPassword }
            onChange={ this.handleValueChange.bind(this, 'repeatPassword') }
          />
          <Button
            label="SIGN UP"
            color="dark-cyan"
            size="inherit"
            onClick={ this.handleSignUp.bind(this) }
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    specialties: state.specialty || [],
    counter: state.counter
  };
};

export default connect(mapStateToProps)(DoctorSignUpView);