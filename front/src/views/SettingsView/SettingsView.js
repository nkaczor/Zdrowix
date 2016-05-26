import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import * as userActions from '../../redux/modules/user';
import defaultPhoto from '../../../assets/noImage.gif';
import style from './settings_view.scss';
import {
  Avatar, Header,
  Paper, Label,
  TextInput, TextArea,
  SimpleImageInput, Button } from '../../components';

export class SettingsView extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    userInfo: PropTypes.object,
    token: PropTypes.string
  };
  constructor(props) {
    super(props);

    let { userInfo } = this.props;

    this.state = {
      message: '',
      newPhoto: '',
      form: {
        bio: userInfo.bio || '',
        avatar: userInfo.avatar,
        email: userInfo.email,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        birthDate: moment(userInfo.birthDate),
        phoneNumber: userInfo.phoneNumber
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userInfo !== this.props.userInfo) {
      let { userInfo } = nextProps;

      let form = {
        bio: userInfo.bio,
        avatar: userInfo.avatar,
        email: userInfo.email,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        birthDate: moment(userInfo.birthDate),
        phoneNumber: userInfo.phoneNumber
      };

      this.setState({ form });
    }
  }

  handleDateChange(date) {
    let form = Object.assign({}, this.state.form);

    form.birthDate = date;
    this.setState({
      form
    });
  }

  handleValueChange(field, e) {
    let form = Object.assign({}, this.state.form);

    form[field] = e.target.value;
    this.setState({
      form
    });
  }

  handleSave() {
    let { form } = this.state;

    let data = new FormData();

    data.append('firstName', form.firstName);
    data.append('lastName', form.lastName);
    data.append('birthDate', form.birthDate.toDate());
    data.append('bio', form.bio);
    data.append('phoneNumber', form.phoneNumber);
    if (this.state.newPhoto) {
      data.append('avatar', this.state.newPhoto);
    }

    if (!form.avatar) {
      this.props.dispatch(userActions.fetchDeleteUserPhoto(this.props.token));
    }
    this.props.dispatch(userActions.fetchUpdateUserData(this.props.token, data))
      .then(() => this.setState({ message: 'Successful saved!' }));
  }

  handleUploadPhoto(photo) {
    const reader = new FileReader();
    const file = photo;

    reader.onload = upload => {
      let form = Object.assign({}, this.state.form);

      form.avatar = upload.target.result;
      this.setState({
        newPhoto: photo,
        form
      });
    };

    reader.readAsDataURL(file);
  }

  handleDeletePhoto() {
    let form = Object.assign({}, this.state.form);

    form.avatar = '';
    this.setState({
      form
    });
  }

  render() {
    let { form } = this.state;

    return (
      <div className={ style['settings-view'] }>
        <Header>Settings</Header>
        <div className={ style['settings-content'] }>
          <Paper>
            <div className={ style['paper-content'] }>
              <div className={ classnames('row', style['avatar-edit']) }>
                <div className="col-xs-6">
                  <Avatar
                    src={ form.avatar || defaultPhoto }
                    size="80px"
                  />
                </div>
                <div className=" col-xs-6">
                  <SimpleImageInput
                    color="gray"
                    onUpload={ this.handleUploadPhoto.bind(this) }
                  />
                  <Button
                    color="red"
                    label="Delete Photo"
                    onClick={ this.handleDeletePhoto.bind(this) }
                  />
                </div>
              </div>

              <Label htmlFor="email">Email:</Label>
              <TextInput
                value={ form.email }
                onChange={ this.handleValueChange.bind(this, 'email') }
                disabled
              />
              <div className={ classnames('row', style['two-inputs']) }>
                <div className="col-xs-6">
                  <Label htmlFor="firstName">First Name:</Label>
                  <TextInput
                    value={ form.firstName }
                    onChange={ this.handleValueChange.bind(this, 'firstName') }
                  />
                </div>
                <div className="col-xs-6">
                  <Label htmlFor="lastName">Last Name:</Label>
                  <TextInput
                    value={ form.lastName }
                    onChange={ this.handleValueChange.bind(this, 'lastName') }
                  />
                </div>
              </div>

              <div className={ classnames('row', style['two-inputs']) }>
                <div className="col-xs-6">
                  <Label htmlFor="birthDate">Birth Day:</Label>
                  <DatePicker
                    className={ style['datepicker'] }
                    selected={ form.birthDate }
                    onChange={ this.handleDateChange.bind(this) }
                  />
                </div>
                <div className="col-xs-6">
                  <Label htmlFor="phoneNumber">Phone numer:</Label>
                  <TextInput
                    value={ form.phoneNumber }
                    onChange={ this.handleValueChange.bind(this, 'phoneNumber') }
                  />
                </div>
              </div>

              <Label htmlFor="bio" >Bio:</Label>
              <TextArea
                rows="8"
                value={ form.bio }
                onChange={ this.handleValueChange.bind(this, 'bio') }
              />
              <div className={ style['message-container'] }>
                { this.state.message }
              </div>
              <div className={ style['button-container'] }>
                <Button
                  size="big"
                  color="blue"
                  label="Save changes"
                  onClick={ this.handleSave.bind(this) }
                />
              </div>
            </div>
          </Paper>
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.user.token,
    userInfo: state.user.userInfo || {}
  };
};

export default connect(mapStateToProps)(SettingsView);