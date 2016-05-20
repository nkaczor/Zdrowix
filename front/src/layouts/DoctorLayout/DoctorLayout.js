import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import Svg from 'svg-inline-react';
import * as doctorActions from '../../redux/modules/doctor';
import { Avatar, Calendar, Header, Paper } from '../../components';
import style from './doctor_layout.scss';
import calendarSVG from '../../../assets/icons/calendar.svg';
import questionsSVG from '../../../assets/icons/questions.svg';
import askSVG from '../../../assets/icons/ask.svg';


export class DoctorLayout extends Component {
  static propTypes = {
    userInfo: PropTypes.object,
    dispatch: PropTypes.func,
    params: PropTypes.object,
    doctor: PropTypes.object
  };

  componentDidMount() {
    this.props.dispatch(doctorActions.fetchDoctor(this.props.params.id));
  }

  renderNavItem(item) {
    return (
      <div className="col-xs-4">
        <div className={ classnames(style['nav-box']) }>
          <Svg src={ item.icon } />
          { item.label }
        </div>
      </div>
    );
  }

  renderCalendar() {
    let data = {
      range: {
        start: 7,
        end: 17
      },
      calendar: [
        {
          name: 'monday',
          date: Date.now(),
          hours: [
            {
              hour: 7,
              state: 'free'
            },
            {
              hour: 8,
              state: 'free'
            },
            {
              hour: 9,
              state: 'visit'
            },
            {
              hour: 10,
              state: 'free'
            },
            {
              hour: 11,
              state: 'free'
            },
          ]
        },
        {
          name: 'tuesday',
          date: Date.now(),
          hours: [
            {
              hour: 15,
              state: 'free'
            },
            {
              hour: 16,
              state: 'free'
            },
            {
              hour: 9,
              state: 'visit'
            }
          ]
        },
        {
          name: 'wednesday',
          date: Date.now(),
          hours: [
            {
              hour: 7,
              state: 'free'
            },
            {
              hour: 8,
              state: 'free'
            },
            {
              hour: 10,
              state: 'visit'
            }
          ]
        },
        {
          name: 'thursday',
          date: Date.now(),
          hours: [
            {
              hour: 7,
              state: 'free'
            },
            {
              hour: 14,
              state: 'free'
            },
            {
              hour: 11,
              state: 'visit'
            }
          ]
        },
        {
          name: 'friday',
          date: Date.now(),
          hours: [
            {
              hour: 10,
              state: 'free'
            },
            {
              hour: 8,
              state: 'free'
            },
            {
              hour: 9,
              state: 'visit'
            }
          ]
        },
        {
          name: 'saturday',
          date: Date.now(),
          hours: [
            {
              hour: 7,
              state: 'free'
            },
            {
              hour: 8,
              state: 'free'
            },
            {
              hour: 9,
              state: 'visit'
            }
          ]
        },
        {
          name: 'sunday',
          date: Date.now(),
          hours: [
            {
              hour: 7,
              state: 'free'
            },
            {
              hour: 8,
              state: 'free'
            },
            {
              hour: 9,
              state: 'visit'
            }
          ]
        },
      ]
    };

    return (
      <Calendar data={ data } />
    )
  }
  render() {
    let { userInfo, doctor } = this.props;
    let navItems = [
      {
        label: 'Calendar',
        icon: calendarSVG
      },
      {
        label: 'Questions',
        icon: questionsSVG
      },
      {
        label: 'Ask the doctor',
        icon: askSVG
      }
    ];

    return (
      <div className={ style['doctor-layout'] }>
        <Header>My Profile</Header>
        <div className={ classnames('row') }>
          <div className="col-xs-3">
            <Paper className={ style['doctor-info'] }>
              <div className={ style['header'] }>
                <Avatar
                  src={ doctor.avatar }
                  size="100px"
                />
                <p className={ style['name'] }>
                  { doctor.firstName } { doctor.lastName }
                </p>
                <p>Doctor { doctor.specialty ? doctor.specialty.name : '' }</p>
              </div>
              <div className={ style['body'] }>
                <p><strong>Bio: </strong>{ doctor.bio }</p>
                <p><strong>Email: </strong>{ doctor.email }</p>
              </div>
            </Paper>
          </div>
          <div className="col-xs-9">
            <nav className={ classnames("row") }>
              { navItems.map(item => this.renderNavItem(item)) }
            </nav>
            <Paper className={ style['content'] }>
              { this.props.children }
            </Paper>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    doctor: state.doctor.doctor || {},
    userInfo: state.user.userInfo || {}
  };
};

export default connect(mapStateToProps)(DoctorLayout);