import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import Svg from 'svg-inline-react';
import { Avatar, Calendar, Header, Paper } from '../../components';
import style from './doctor_view.scss';
import calendarSVG from '../../../assets/icons/calendar.svg';
import questionsSVG from '../../../assets/icons/questions.svg';
import askSVG from '../../../assets/icons/ask.svg';


export class DoctorView extends Component {
  static propTypes = {
    userInfo: PropTypes.object
  };
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
    let { userInfo } = this.props;
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
      <div className={ style['doctor-view'] }>
        <Header>My Profile</Header>
        <div className={ classnames('row') }>
          <div className="col-xs-3">
            <Paper className={ style['doctor-info'] }>
              <div className={ style['header'] }>
                <Avatar
                  src={ userInfo.avatar }
                  size="100px"
                />
                <p className={ style['name'] }>
                  { userInfo.firstName } { userInfo.lastName }
                </p>
                <p>Doctor { userInfo.specialty ? userInfo.specialty.name : '' }</p>
              </div>
              <div className={ style['body'] }>
                <p><strong>Bio: </strong>{ userInfo.bio }</p>
                <p><strong>Email: </strong>{ userInfo.email }</p>
              </div>
            </Paper>
          </div>
          <div className="col-xs-9">
            <nav className={ classnames("row") }>
              { navItems.map(item => this.renderNavItem(item)) }
            </nav>
            <Paper className={ style['content'] }>
              { this.renderCalendar() }
            </Paper>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.user.userInfo || {}
  };
};

export default connect(mapStateToProps)(DoctorView);