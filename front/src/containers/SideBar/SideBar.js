import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Svg from 'svg-inline-react';
import style from './side_bar.scss';

import { Avatar } from '../../components';
import defaultPhoto from '../../../assets/noImage.gif';
import settingsIcon from '../../../assets/icons/cogwheel.svg';
import rightArrow from '../../../assets/icons/right_arrow.svg';
export class SideBar extends Component {

  static propTypes = {
    userInfo: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = { showMenu: false };
  }

  updateView() {
    this.forceUpdate();
  }

  renderNavElement(element) {
    return (
      <Link
        key={ element.label }
        className={ style['nav-element'] }
        activeClassName={ style['active-nav-element'] }
        to={ element.path }
        onClick={ this.updateView.bind(this) }
      >
        <Svg
          src={ element.icon }
          className={ style['icon'] }
        />
        { element.label }
        <Svg
          src={ rightArrow }
          className={ style['right-arrow'] }
        />
      </Link>
    );
  }
  renderNav() {
    let nav = [ {
      header: 'Main',
      elements: [ {
        label: 'Home',
        path: '/panel/home',
        icon: require('../../../assets/icons/home.svg')
      }, {
        label: 'My Page',
        path: `/panel/doctor/${ this.props.userInfo._id }`,
        icon: require('../../../assets/icons/profile.svg')
      } ]
    }, {
      header: 'Tools',
      elements: [ {
        label: 'Find Doctor',
        path: '/panel/find-doctor',
        icon: require('../../../assets/icons/find.svg')
      }, {
        label: 'Visits',
        path: '/visits',
        icon: require('../../../assets/icons/enroll.svg')
      } ]
    }, {
      header: 'Configuration',
      elements: [ {
        label: 'Work Schedule',
        path: '/panel/work-schedule',
        icon: require('../../../assets/icons/work-schedule.svg')
      }, {
        label: 'Account Settings',
        path: '/panel/settings',
        icon: require('../../../assets/icons/cogwheel.svg')
      } ]
    } ];

    return (
      <div className={ style['navigation'] }>
        { nav.map(section  => {
          return (
            <div key={ section.header }>
              <header>{ section.header }</header>
              <nav>
                { section.elements.map(element => {
                  return this.renderNavElement(element);
                })
                }
              </nav>
            </div>
          );
        })
      }
      </div>

    );
  }
  renderUserInformation() {
    let { userInfo } = this.props;

    return (
      <div className={ style['user-information'] }>
        <Avatar
          src={ userInfo.avatar || defaultPhoto }
          className={ style['avatar'] }
        />
        <div className={ style['user-text'] }>
          <div className={ style['name'] }>
            { `${ userInfo.firstName || '' } ${ userInfo.lastName || '' }` }
          </div>
          <div className={ style['account-type'] }>
            { `${ userInfo.type } ${ userInfo.specialty ? userInfo.specialty.name : '' }` }
          </div>
        </div>
        <div className={ style['settings'] }>
          <Link to="/panel/settings">
            <Svg src={ settingsIcon } />
          </Link>
        </div>
      </div>
  );
  }
  render() {
    return (
      <div className={ style['side-bar'] }>
        { this.renderUserInformation() }
        { this.renderNav() }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.user.userInfo || {}
  };
};

export default connect(mapStateToProps)(SideBar);