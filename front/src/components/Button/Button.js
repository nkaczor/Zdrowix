import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import style from './button.scss';

class Avatar extends Component {
  static propTypes = {

  };

  render () {


    return (
      <div className={this.props.className}>
        <img src={this.props.src} className={style['avatar-img']} style={circleStyle}/>
      </div>
    )
  }
}

export default Avatar