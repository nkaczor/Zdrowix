import React, { PropTypes, Component } from 'react';

import style from './avatar.scss';

class Avatar extends Component {
  static propTypes = {
    src: PropTypes.string,
    size: PropTypes.string,
    className: PropTypes.string,
  };

  render() {
    const size = this.props.size || '36px';

    let circleStyle = {
      width: size,
      height: size,
    };

    return (
      <div className={ this.props.className }>
        <img
          src={ this.props.src }
          className={ style['avatar-img'] }
          style={ circleStyle }
        />
      </div>
    );
  }
}

export default Avatar;