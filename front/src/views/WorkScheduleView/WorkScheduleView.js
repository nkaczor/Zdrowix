import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import moment from 'moment';

import style from './work_schedule_view.scss';
import {
  Header,
  Paper, Label,
  TextInput, Button } from '../../components';

export class WorkScheduleView extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    userInfo: PropTypes.object,
    token: PropTypes.string
  };
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  handleValueChange(field, e) {
    let form = Object.assign({}, this.state.form);

    form[field] = e.target.value;
    this.setState({
      form
    });
  }

  handleSave() {

  }

  render() {
    let { form } = this.state;

    return (
      <div className={ style['settings-view'] }>
        <Header>Work Schedule</Header>
        <div className={ style['settings-content'] }>
          <Paper>
            <div className={ style['paper-content'] }>
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
  };
};

export default connect(mapStateToProps)(SettingsView);