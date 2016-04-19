import React, { PropTypes, Component } from 'react';

import style from './avatar.scss';

class Avatar extends Component {
  static propTypes = {

  };

  render () {
    let size = this.props.size || '36px';

    let circleStyle = {
      width: size,
      height: size
    }

    return (
      <div className={this.props.className}>
        <img src={this.props.src} className={style['avatar-img']} style={circleStyle}/>
      </div>
    )
  }
}

export default Avatar