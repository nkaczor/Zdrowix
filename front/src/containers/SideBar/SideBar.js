import React, { PropTypes, Component } from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import SVG from 'svg-inline-react';
import style from './side_bar.scss';

import {Avatar} from '../../components';
import avatar from '../../../assets/avatar.jpg';
import settingsIcon from '../../../assets/icons/cogwheel.svg';

export class SideBar extends Component {
  static propTypes = {

  };
  renderNavElement(element){
    return(
      <Link
        className = { style['nav-element'] }
        activeClassName = { style['active-nav-element'] }
        to = { element.path }
      >
        { element.label }
      </Link>
    )
  }
  renderNav(){

    let nav = [{
      header: 'Main',
      elements: [{
        label: 'Home',
        path: '/'
      }, {
        label: 'My Page',
        path: '/page'
      }]
    }, {
      header: 'Tools',
      elements: [{
        label: 'Search',
        path: '/search'
      }, {
        label: 'Find',
        path: '/find'
      }]
    }];
    return(
      <div>
        {nav.map(section =>
          <div>
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
          <div className={style['address']}>Poznań, PL</div>
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