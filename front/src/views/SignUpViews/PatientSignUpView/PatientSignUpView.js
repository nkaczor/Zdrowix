import React, { Component, PropTypes } from 'react';
import DatePicker from 'react-datepicker';

import style from './patient_sign_up_view.scss';
import { Select, Button, TextInput, PasswordInput, ImageInput } from '../../../components';
import { connect } from 'react-redux';
import Svg from 'svg-inline-react';
import registrationIcon from '../../../../assets/icons/user-tie.svg';

import * as userActions from '../../../redux/modules/user';
import * as voivodeshipActions from '../../../redux/modules/voivodeship';

export class PatientSignUpView extends Component {

  static contextTypes= {
    router: PropTypes.object.isRequired
  }

  static propTypes = {
    dispatch: PropTypes.func,
    voivodeships: PropTypes.array
  }

  constructor(props) {
    super(props);
    this.state = {
      form: {
        avatar: '',
        email: '',
        password: '',
        repeatPassword: '',
        firstName: '',
        lastName: '',
        birthDate: '',
        phoneNumber: '',
        voivodeship: ''
      },
    };
  }

  componentDidMount() {
    this.props.dispatch(voivodeshipActions.fetchVoivodeships());
  }

  handleValueChange(field, e) {
    let form = Object.assign({}, this.state.form);

    form[field] = e.target.value;
    this.setState({
      form
    });
  }

  handlePhotoChange(photo) {
    let form = Object.assign({}, this.state.form);

    form.avatar = photo;
    this.setState({
      form
    });
  }

  handleSelectChange(e) {
    let form = Object.assign({}, this.state.form);

    form.voivodeship = e.target.value;
    this.setState({
      form
    });
  }

  handleDateChange(date) {
    let form = Object.assign({}, this.state.form);

    form.birthDate = date;
    this.setState({
      form
    });
  }

  handleSignUp() {
    let { form } = this.state;

    if (form.password !== form.repeatPassword) {
      return;
    }

    let data = new FormData();

    data.append('avatar', form.avatar);
    data.append('firstName', form.firstName);
    data.append('lastName', form.lastName);
    data.append('email', form.email);
    data.append('password', form.password);
    data.append('birthDate', form.birthDate.toDate());
    data.append('type', 'patient');
    data.append('phoneNumber', form.phoneNumber);
    data.append('voivodeship', form.voivodeship);

    this.props.dispatch(userActions.fetchSignUp(data))
    .then(() =>
        this.context.router.push('/sign-up-confirmation')
    );
  }

  render() {
    let { form } = this.state;
    let items = this.props.voivodeships.map(x => {
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
            placeholder="Your phone numer"
            value={ form.phoneNumber }
            onChange={ this.handleValueChange.bind(this, 'phoneNumber') }
          />
          <Select
            placeholder="Your voivodeship"
            size="inherit"
            items={ items }
            onChange={ this.handleSelectChange.bind(this) }
          />
          <DatePicker
            selected={ form.birthDate }
            onChange={ this.handleDateChange.bind(this) }
            placeholderText="Your birthdate"
          />
          <ImageInput
            onUpload={ this.handlePhotoChange.bind(this) }
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
    voivodeships: state.voivodeship || [],
    counter: state.counter
  };
};

export default connect(mapStateToProps)(PatientSignUpView);