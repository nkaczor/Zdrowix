import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import moment from 'moment';
import style from './visits_view.scss';
import { Paper, Avatar, Header } from '../../components';
import * as visitActions from '../../redux/modules/visit';

import defaultPhoto from '../../../assets/noImage.gif';

export class VisitsView extends Component {

  static propTypes = {
    token: PropTypes.string,
    userInfo: PropTypes.object,
    dispatch: PropTypes.func,
    visits: PropTypes.array
  };

  componentDidMount() {
    let { token, userInfo, dispatch } = this.props;

    if (token && userInfo) {
      dispatch(visitActions.fetchAllVisits(userInfo.type, token));
    }
  }

  componentWillUpdate(nextProps) {
    let { dispatch, token } = this.props;

    if (nextProps.token && (nextProps.token !== token)) {
      dispatch(visitActions.fetchAllVisits(nextProps.userInfo.type, nextProps.token));
    }
  }

  renderSingleAppointment(visit) {
    let people = {
      doctor: visit.patient,
      patient: visit.doctor
    };
    let { userInfo } = this.props;
    let person = people[userInfo.type];


    return (
      <div className="row">
        <div className={ classnames('col-xs-12', style['no-padding']) } >
          <div className={ style['visit-container'] }>
            <div className={ classnames('col-xs-8', style['no-padding']) }>
              <div className={ style['user-data-container'] }>
                <div className={ classnames(style['avatar-container']) } >
                  <Avatar
                    src={ person.avatar || defaultPhoto }
                    size="40px"
                  />
                </div>

                <div className={ classnames(style['info-container'], style['no-padding']) }>
                  <div className={ style['user-info-text'] }>
                  { `${ person.firstName } ${ person.lastName }` }
                  </div>
                  <div className={ style['type-info-text'] }>
                  { person.type }
                  </div>
                </div>
              </div>
            </div>
            <div className={ classnames(style['date-container'], 'col-xs-4',
            style['no-padding']) }
            >
              <span>{ moment(visit.date).format('YYYY-MM-DD') }</span>
              <span>at</span>
              <span>{ visit.hour }:00</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  getDate(visit) {
    return `${ moment(visit.date).format('YYYY-MM-DD') } ${ visit.hour }`;
  }

  render() {
    let { visits } = this.props;
    let pastVisits = visits.filter(visit => {
      return moment().isSameOrAfter(moment(this.getDate(visit)));
    });
    let upcomingVisits = visits.filter(visit => {
      return moment().isBefore(moment(this.getDate(visit)));
    });

    return (
      <div>
        <Header>Visits</Header>
        <div className={ style['visits-view'] }>

          <div className="col-xs-6">
            <Paper>
              <div className={ style['header-info'] }>
                Past visits
              </div>
              { pastVisits.map(visit => this.renderSingleAppointment(visit)) }
            </Paper>
          </div>

          <div className="col-xs-6">
            <Paper>
              <div className={ style['header-info'] }>
                Upcoming visits
              </div>
              { upcomingVisits.map(visit => this.renderSingleAppointment(visit)) }
            </Paper>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    visits: state.visit,
    token: state.user.token,
    userInfo: state.user.userInfo
  };
};

export default connect(mapStateToProps)(VisitsView);