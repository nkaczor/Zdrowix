import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import { HeaderBar, SideBar } from '../../containers';
import * as userActions from '../../redux/modules/user';
import style from './core_layout.scss';

export class CoreLayout extends Component {
  static propTypes = {
    children: PropTypes.element,
    dispatch: PropTypes.func,
    token: PropTypes.string
  };

  componentDidMount() {
    this.fetchToken();
  }

  componentWillUpdate(nextProps) {
    if (nextProps.token !== this.props.token) {
      this.fetchToken();
    }
  }

  fetchToken() {
    let { dispatch, token } = this.props;

    if (this.props.token) {
      dispatch(userActions.fetchUserInfo(token));
    }
  }
  render() {
    return (
      <div className={ style['page-container'] }>
        <HeaderBar />
        <SideBar />
        <div className={ style['view-container-wrapper'] }>
          <div className={ style['view-container'] }>
            { this.props.children }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.user.userInfo,
    token: state.user.token
  };
};

export default connect(mapStateToProps)(CoreLayout);
