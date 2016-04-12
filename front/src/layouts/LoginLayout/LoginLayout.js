import React, { PropTypes, Component } from 'react';

import style from './login_layout.scss';

export class LoginLayout extends Component {
  static propTypes = {

  };

  render () {

    return (
      <div className={style['page-container']}>
        <div className={style['view-container']}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

LoginLayout.propTypes = {
  children: PropTypes.element
}

export default LoginLayout