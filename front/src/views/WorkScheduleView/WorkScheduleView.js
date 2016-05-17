import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import moment from 'moment';
import * as workingTimeActions from '../../redux/modules/workingTime';

import style from './work_schedule_view.scss';
import {
  Header, Paper,
  Button, TimeChooser } from '../../components';

export class WorkScheduleView extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    userInfo: PropTypes.object,
    token: PropTypes.string,
    workingHours: PropTypes.object
  };
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      workingHours: props.workingHours
    };
  }

  componentWillUpdate(nextProps) {
    let { dispatch, workingHours, userInfo, token } = this.props;

    if (nextProps.workingHours !== workingHours) {
      this.setState({ workingHours: nextProps.workingHours });
    }
    if (nextProps.token && nextProps.userInfo &&
      (nextProps.token !== token || nextProps.userInfo !== userInfo)) {
      dispatch(workingTimeActions.fetchWorkingTime(nextProps.userInfo._id, nextProps.token));
    }
  }
  handleValueChange(field, e) {
    let form = Object.assign({}, this.state.form);

    form[field] = e.target.value;
    this.setState({
      form
    });
  }
  handleHourClick(day, hour) {
    let workingHours = Object.assign({}, this.state.workingHours);

    workingHours[day][hour] = !workingHours[day][hour];
    this.setState({
      workingHours
    });
  }

  handleSave() {
    let { workingHours } = this.state;
    let { token } = this.props;
    let data = Object.assign({}, workingHours);

    this.props.dispatch(workingTimeActions.fetchSaveWorkingTime(token, data))
    .then(() => this.setState({ message: 'Successful saved!' }));
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
                  data={ this.state.workingHours[day] }
                  onClick={ this.handleHourClick.bind(this, day) }
                />
              ) }
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
    userInfo: state.user.userInfo || {},
    workingHours: state.workingTime
  };
};

export default connect(mapStateToProps)(WorkScheduleView);