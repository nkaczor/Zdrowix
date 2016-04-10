import React, { PropTypes, Component } from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import SVG from 'svg-inline-react';
import style from './side_bar.scss';

import {Avatar} from '../../components';
import avatar from '../../../assets/avatar.jpg';
import settingsIcon from '../../../assets/icons/cogwheel.svg';
import rightArrow from '../../../assets/icons/right_arrow.svg';
import homeIcon from '../../../assets/icons/home.svg';
export class SideBar extends Component {

  constructor(props) {
   super(props);
   this.state = {showMenu: false};
   }

  static propTypes = {

  };
  updateView(){
    this.forceUpdate();
  }
  renderNavElement(element){
    return(
      <Link
        key = { element.label }
        className = { style['nav-element'] }
        activeClassName = { style['active-nav-element'] }
        to = { element.path }
        onClick= { this.updateView.bind(this) }
      >
        <SVG src={ element.icon } className={ style['icon'] }/>
        { element.label }
        <SVG src={ rightArrow } className={ style['right-arrow'] }/>
      </Link>
    )
  }
  renderNav(){

    let nav = [{
      header: 'Main',
      elements: [{
        label: 'Home',
        path: '/home/dssd',
        icon: require('../../../assets/icons/home.svg')
      }, {
        label: 'My Page',
        path: '/my-page',
        icon: require('../../../assets/icons/profile.svg')
      }]
    }, {
      header: 'Tools',
      elements: [{
        label: 'Search',
        path: '/search',
        icon: require('../../../assets/icons/find.svg')
      }, {
        label: 'Visits',
        path: '/visits',
        icon: require('../../../assets/icons/enroll.svg')
      }]
    }];
    return(
      <div className={style['navigation']}>
        {nav.map(section =>
          <div key = { section.header }>
            <header>{section.header}</header>
            <nav>
              {section.elements.map(element => this.renderNavElement(element))}
            </nav>
          </div>
        )}
      </div>

    )


  }
  renderUserInformation(){
    return(
      <div className={style['user-information']}>
        <Avatar src={avatar} className={style['avatar']}/>
        <div className={style['user-text']}>
          <div className={style['name']}>Natalia Kaczor</div>
          <div className={style['address']}>Patient</div>
        </div>
        <div className={style['settings']}>
          <SVG src={settingsIcon}/>
        </div>
      </div>
  )
  }
  render () {
    return (
      <div className={style['side-bar']}>
        {this.renderUserInformation()}
        {this.renderNav()}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter
})
export default connect(mapStateToProps)(SideBar)