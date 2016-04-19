import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import style from './my_page_view.scss';

export class MyPageView extends Component {
  static propTypes = {
  };

  render() {
    return (
      <div className={ style.home }>
        my page

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    counter: state.counter
  };
};

export default connect(mapStateToProps)(MyPageView);