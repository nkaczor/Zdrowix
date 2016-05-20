import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import * as userActions from '../../redux/modules/user';

import defaultPhoto from '../../../assets/noImage.gif';
import style from './ask_the_doctor_view.scss';
import {
  Avatar, Header,
  Paper, Label,
  TextInput, TextArea,
  SimpleImageInput, Button } from '../../components';

const smallAvatarSize = '60px';
const bigAvatarSize = '80px';

const bigFontStyle = {
  fontSize: '21px'
};
const smallFontStyle = {
  fontSize: '14px'
};
const bigAvatarStyle = {
  opacity: 1.0
};
const smallAvatarStyle = {
  opacity: 0.2
};

export class AskTheDoctorView extends Component {
  static propTypes = {
    userInfo: PropTypes.object,
  };

  constructor(props) {
    super(props);

    let { userInfo } = this.props;

    this.state = {
      leftAvatarSize: bigAvatarSize,
      rightAvatarSize: smallAvatarSize,
      leftTextStyle: bigFontStyle,
      rightTextStyle: smallFontStyle,
      leftAvatarStyle: bigAvatarStyle,
      rightAvatarStyle: smallAvatarStyle

    };
  }

  handleAnonymousClick() {
    this.setState({
      leftAvatarSize: smallAvatarSize,
      rightAvatarSize: bigAvatarSize,
      leftAvatarStyle: smallAvatarStyle,
      rightAvatarStyle: bigAvatarStyle,
      leftTextStyle: smallFontStyle,
      rightTextStyle: bigFontStyle
    });
  }

  handleUserClick() {
    this.setState({
      leftAvatarSize: bigAvatarSize,
      rightAvatarSize: smallAvatarSize,
      leftAvatarStyle: bigAvatarStyle,
      rightAvatarStyle: smallAvatarStyle,
      leftTextStyle: bigFontStyle,
      rightTextStyle: smallFontStyle
    });
  }

  render() {
    let { userInfo } = this.props;

    console.log(this.props.params.id);
    return (
      <div className={ style['ask-the-doctor-view'] }>
        <Header>Ask the doctor ...</Header>
        <div className={ style['ask-content'] }>
          <Paper>
            <div className={ style['paper-content'] }>
              <div className="row">
                <div className={ "col-xs-4" }>
                  <div className={ style['as-me-text'] }
                    style={ this.state.leftTextStyle }
                    onClick={ this.handleUserClick.bind(this) }
                  >
                    as { userInfo.firstName }
                  </div>
                </div>
                <div className={ classnames('col-xs-2', style['left-avatar-container']) }>
                  <div className={ style['avatar-container'] }
                    style={ this.state.leftAvatarStyle }
                  >
                    <Avatar
                      className={ style['center'] }
                      src={ userInfo.avatar || defaultPhoto }
                      size={ this.state.leftAvatarSize }
                      onClick={ this.handleUserClick.bind(this) }
                    />
                  </div>
                </div>

                <div className={ classnames('col-xs-2') }>
                  <div className={ style['avatar-container'] }
                    style={ this.state.rightAvatarStyle }
                  >
                    <Avatar
                      className={ style['center'] }
                      src={ defaultPhoto }
                      size={ this.state.rightAvatarSize }
                      onClick={ this.handleAnonymousClick.bind(this) }
                    />
                  </div>
                </div>
                <div className={ "col-xs-4" }>
                  <div className={ style['as-anonymous-text'] }
                    style={ this.state.rightTextStyle }
                    onClick={ this.handleAnonymousClick.bind(this) }
                  >
                    as Anonymous
                  </div>
                </div>
              </div>

              <Label htmlFor="title">Title:</Label>
              <TextInput />
              <Label htmlFor="question" >Question:</Label>
              <TextArea
                rows="8"
              />
              <div className={ style['button-container'] }>
                <Button
                  size="big"
                  color="blue"
                  label="Save changes"
                />
              </div>

            </div>
          </Paper>
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.user.token,
    userInfo: state.user.userInfo || {}
  };
};

export default connect(mapStateToProps)(AskTheDoctorView);