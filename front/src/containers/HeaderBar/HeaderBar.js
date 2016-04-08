import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import SVG from 'svg-inline-react';

import {Avatar} from '../../components';

import avatar from '../../../assets/avatar.jpg';
import arrowDownIcon from '../../../assets/icons/down_arrow.svg';
import style from './header_bar.scss';

export class HeaderBar extends Component {
  static propTypes = {

  };

  render () {
    return (
      <div className={style['header-bar']}>
        <header>Zdrowix</header>
        <div className={style['header-bar-right']}>
          <Avatar src={avatar} size="30px" className={style['avatar']}/>
          <span className={style['nickname']}>Natalia</span>
          <SVG src={arrowDownIcon} className={style['arrow-down']} />
        </div>

    </div>
    )
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter
})
export default connect(mapStateToProps)(HeaderBar)