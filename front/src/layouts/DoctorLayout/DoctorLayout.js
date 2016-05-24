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

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentDidMount() {
    this.props.dispatch(doctorActions.fetchDoctor(this.props.params.id));
  }

  renderNavItem(item) {
    return (
      <div className="col-xs-4"
        key={ item.label }
      >
        <div
          className={ classnames(style['nav-box']) }
          onClick={ this.goTo.bind(this, item.url) }
        >
          <Svg src={ item.icon } />
          { item.label }
        </div>
      </div>
    );
  }

  goTo(url) {
    this.context.router.push(url);
  }

  render() {
    let { doctor, params } = this.props;
    let navItems = [
      {
        label: 'Calendar',
        icon: calendarSVG,
        url: `/panel/doctor/${ params.id }`
      },
      {
        label: 'Questions',
        icon: questionsSVG,
        url: `/panel/doctor/${ params.id }/questions`
      },
      {
        label: 'Ask the doctor',
        icon: askSVG,
        url: `/panel/doctor/${ params.id }/ask-the-doctor`
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
            <nav className={ classnames('row') }>
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