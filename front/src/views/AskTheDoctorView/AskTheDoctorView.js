import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import * as questionActions from '../../redux/modules/question';

import defaultPhoto from '../../../assets/noImage.gif';
import style from './ask_the_doctor_view.scss';
import {
  Avatar, Label,
  TextInput, TextArea,
  Button } from '../../components';

const smallAvatarSize = '60px';
const bigAvatarSize = '80px';

const bigFontStyle = {
  fontSize: '21px',
  color: '#222'
};
const smallFontStyle = {
  fontSize: '14px',
  color: '#777'
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
    params: PropTypes.object,
    dispatch: PropTypes.func,
    token: PropTypes.string
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      form: {
        title: '',
        question: '',
      },
      asAnonymous: false,
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
      asAnonymous: true,
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
      asAnonymous: false,
      leftAvatarSize: bigAvatarSize,
      rightAvatarSize: smallAvatarSize,
      leftAvatarStyle: bigAvatarStyle,
      rightAvatarStyle: smallAvatarStyle,
      leftTextStyle: bigFontStyle,
      rightTextStyle: smallFontStyle
    });
  }

  handleValueChange(field, e) {
    let form = Object.assign({}, this.state.form);

    form[field] = e.target.value;
    this.setState({
      form
    });
  }

  handleSend() {
    let { userInfo, params, token, dispatch } = this.props;
    let form = Object.assign({}, this.state.form);

    form.author = userInfo._id;
    form.doctorId = params.id;
    form.asAnonymous = this.state.asAnonymous;
    dispatch(questionActions.fetchSaveQuestion(token, form))
      .then(() => {
        this.setState({ form: { title: '', question: '' }});
        this.context.router.push(`/panel/doctor/${ params.id }/questions`);
      });
  }
  render() {
    let { userInfo } = this.props;
    let { form } = this.state;

    return (
      <div className={ style['ask-the-doctor-view'] }>
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
          <TextInput
            value={ form.title }
            onChange={ this.handleValueChange.bind(this, 'title') }
          />
          <Label htmlFor="question" >Question:</Label>
          <TextArea
            value={ form.question }
            onChange={ this.handleValueChange.bind(this, 'question') }
            rows="8"
          />
          <div className={ style['button-container'] }>
            <Button
              size="big"
              color="blue"
              label="Send"
              onClick={ this.handleSend.bind(this) }
            />
          </div>
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