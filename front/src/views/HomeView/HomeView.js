import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import style from './home_view.scss';

export class HomeView extends React.Component<void, Props, void> {
  static propTypes = {
    counter: PropTypes.number.isRequired,
    doubleAsync: PropTypes.func.isRequired,
    increment: PropTypes.func.isRequired
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