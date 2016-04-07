import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import style from './side_bar.scss';

import {Avatar} from '../../components';
import avatar from '../../../assets/avatar.jpg';
import settingsIcon from '../../../assets/icons/glyphicons-137-cogwheel.png';

export class SideBar extends Component {
  static propTypes = {

  };

  render () {
    return (
      <div className={style['side-bar']}>
        <div className={style['user-information']}>
          <Avatar src={avatar} className={style['avatar']}/>
          <div className={style['user-text']}>
            <div className={style['name']}>Natalia Kaczor</div>
            <div className={style['address']}>Poznań, PL</div>
          </div>
          <div className={style['settings']}>
            <img src={settingsIcon}/>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter
})
export default connect(mapStateToProps)(SideBar)