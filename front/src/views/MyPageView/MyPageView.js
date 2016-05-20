import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Avatar, Header, Paper } from '../../components';
import style from './my_page_view.scss';

export class MyPageView extends Component {
  static propTypes = {
  };

  render() {
    let { userInfo } =this.props;
    return (
      <div className={ style['my-page-view'] }>
        <Header>My Profile</Header>
        <div className={ classnames(style['jumbotron'],'row') }>

            {`${ userInfo.firstName } ${ userInfo.lastName }`}
          </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.user.userInfo || {}
  };
};

export default connect(mapStateToProps)(MyPageView);