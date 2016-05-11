import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import style from './settings_view.scss';
import { Avatar, Header, Paper } from '../../components';

export class SettingsView extends Component {
  static propTypes = {
    userInfo: PropTypes.object
  };
  constructor(props) {
    super(props);
    this.state = { checkboxStatus: true };
  }

  render() {
    let { userInfo } = this.props;
    return (
      <div className={ style['settings-view'] }>
        <Header>Settings</Header>
        <div className="row">
          <Paper className="col-xs-8">fsdf</Paper>
          <Paper className="col-xs-4">
            <Avatar src={ userInfo.avatar }
              size="100px"
            />
          </Paper>
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

export default connect(mapStateToProps)(SettingsView);