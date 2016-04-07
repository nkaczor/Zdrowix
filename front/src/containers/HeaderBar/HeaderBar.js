import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import style from './header_bar.scss';

export class HeaderBar extends Component {
  static propTypes = {

  };

  render () {
    return (
      <div className={style['header-bar']}>
        <header>Zdrowix</header>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter
})
export default connect(mapStateToProps)(HeaderBar)