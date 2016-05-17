import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import moment from 'moment';

import style from './work_schedule_view.scss';
import {
  Header,
  Paper, Label,
  TextInput, Button, TimeChooser } from '../../components';

export class WorkScheduleView extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    userInfo: PropTypes.object,
    token: PropTypes.string
  };
  constructor(props) {
    super(props);

    this.state = {
      days: {
        monday: this.createDayArray(),
        tuesday: this.createDayArray(),
        wednesday: this.createDayArray(),
        thursday: this.createDayArray(),
        friday: this.createDayArray(),
        saturday: this.createDayArray(),
        sunday: this.createDayArray(),
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
  handleHourClick(day, hour) {
    let days = Object.assign({}, this.state.days);

    days[day][hour] = !days[day][hour];
    this.setState({
      days
    });
  }

  handleSave() {

  }
  createDayArray() {
    return new Array(24).fill(false);
  }
  render() {
    let daysArray = [ 'monday',
    'tuesday', 'wednesday',
    'thursday', 'friday',
    'saturday', 'sunday' ];

    return (
      <div className={ style['work-schedule-view'] }>
        <Header>Work Schedule</Header>
        <div className={ style['work-schedule-content'] }>
          <Paper>
            <div className={ style['paper-content'] }>
              { daysArray.map(day =>
                <TimeChooser
                  key={ day }
                  day={ day }
                  data={ this.state.days[day] }
                  onClick={ this.handleHourClick.bind(this, day) }
                />
              ) }
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

export default connect(mapStateToProps)(WorkScheduleView);