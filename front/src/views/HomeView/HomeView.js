import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import style from './home_view.scss';

export class HomeView extends Component {
  static propTypes = {

  };

  render () {
    return (
      <div className={style.home}>
        Hello worldds

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter
})
export default connect(mapStateToProps)(HomeView)