import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import style from './home_view.scss';
import { Button, TextInput,
         PasswordInput, ImageInput,
         Label, Checkbox,
         Paper, Calendar, Header } from '../../components';

export class HomeView extends Component {
  static propTypes = {
    userInfo: PropTypes.object
  };
  constructor(props) {
    super(props);
    this.state = { checkboxStatus: true };
  }

  handleCheckboxChange() {
    this.setState({
      checkboxStatus: !this.state.checkboxStatus
    });
  }

  render() {
    let { userInfo } = this.props;

    return (
      <div className={ style.home }>
        <Header>Home</Header>
        <Paper>Hello world, { userInfo.firstName } { userInfo.lastName }!</Paper>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo || {}
  };
};

export default connect(mapStateToProps)(HomeView);