import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import * as workingTimeActions from '../../redux/modules/workingTime';
import * as visitActions from '../../redux/modules/visit';

import style from './calendar_view.scss';
import { Calendar } from '../../components';

export class CalendarView extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    params: PropTypes.object,
    token: PropTypes.string,
    workingHours: PropTypes.object,
    visits: PropTypes.array
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      week: 0,
      days: this.getWeek(0)
    };
  }

  componentDidMount() {
    let { token, params, dispatch } = this.props;
    let { days } = this.state;

    if (token) {
      dispatch(visitActions.fetchVisits(
        params.id,
        days[0].format('YYYY-MM-DD'),
        days[6].format('YYYY-MM-DD'),
        token));
      dispatch(workingTimeActions.fetchWorkingTime(params.id, token));
    }
  }

  componentWillUpdate(nextProps) {
    let { dispatch, params, token } = this.props;
    let { days } = this.state;

    if (nextProps.token && (nextProps.token !== token)) {
      dispatch(visitActions.fetchVisits(
        params.id,
        days[0].format('YYYY-MM-DD'),
        days[6].format('YYYY-MM-DD'),
        nextProps.token));
      dispatch(workingTimeActions.fetchWorkingTime(params.id, nextProps.token));
    }
  }

  handleVisitSelect(day, hour) {
    let { params } = this.props;

    this.context.router.push(
      `/panel/doctor/${ params.id }/confirm/${ day.format('YYYY-MM-DD') }/${ hour }`
    );
  }

  setWeek(weeksToAdd) {
    let { token, params, dispatch } = this.props;

    let week = this.state.week + weeksToAdd;
    let days = this.getWeek(week);

    dispatch(visitActions.fetchVisits(
      params.id,
      days[0].format('YYYY-MM-DD'),
      days[6].format('YYYY-MM-DD'),
      token));
    this.setState({
      week,
      days
    });
  }

  getWeek(week) {
    let weekStart = moment().startOf('week').format('dddd') === 'Sunday' ?
      moment().startOf('week').add('d', 1) :
      moment().startOf('week');

    if (week) {
      weekStart = weekStart.add('d', 7 * week);
    }

    let days = [];

    for (let i = 0; i <= 6; i++) {
      days.push(moment(weekStart).add(i, 'days'));
    }
    return days;
  }

  getOpenings(day) {
    let { workingHours } = this.props;
    let dayOfWeek = day.format('dddd').toLowerCase();
    let hours = [];

    if (day.isAfter(moment())) {
      workingHours[dayOfWeek].forEach((item, hour) => {
        if (item) {
          hours.push({ state: 'free', hour });
        }
      });
    }
    return hours;
  }

  addVisits(hours, day) {
    let { visits } = this.props;
    let visitHours = visits.filter(visit => day.isSame(visit.date, 'day'));

    visitHours.forEach(visitHour => {
      let toReplace = hours.find(item => item.hour === visitHour.hour);

      if (toReplace) {
        toReplace.state = 'visit';
      }
      else {
        hours.push({ state: 'visit', hour: visitHour.hour });
      }
    });
  }

  render() {
    let { workingHours, visits } = this.props;
    let { days } = this.state;

    let calendar = days.map(day => {
      let hours = this.getOpenings(day);
      this.addVisits(hours, day);

      return {
        date: day,
        hours
      };
    }
   );

    return (
      <div>
        <Calendar
          data={ calendar }
          onNext={ this.setWeek.bind(this, 1) }
          onPrev={ this.setWeek.bind(this, -1) }
          onSelect={ this.handleVisitSelect.bind(this) }
        />
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    token: state.user.token,
    workingHours: state.workingTime,
    visits: state.visit
  };
};

export default connect(mapStateToProps)(CalendarView);