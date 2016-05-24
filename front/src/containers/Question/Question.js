import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import moment from 'moment';
import style from './question.scss';
import { Avatar, Button, TextArea } from '../../components';
import defaultPhoto from '../../../assets/noImage.gif';

class Question extends Component {
  static propTypes = {
    question: PropTypes.object,
    showButton: PropTypes.bool,
    answer: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      showAnswerInput: false,
    };
  }

  handleReplyButtonClick() {
    this.setState({
      showAnswerInput: !this.state.showAnswerInput
    });
  }

  renderReplyButton() {
    console.log(this);
    return (
      <Button
        color="blue"
        label="REPLY"
        size="small"
        onClick={ this.handleReplyButtonClick.bind(this) }
      />
    );
  }

  renderTextArea() {
    return (
      <div>
        <TextArea
          rows="4"
          value={ this.props.answer }
        />
        <Button
          color="blue"
          label="SEND"
          size="small"
        />
      </div>
    );
  }

  renderReply() {
    let { showButton } = this.props;
    let { showAnswerInput } = this.state;
    let renderFunc = showAnswerInput ?
      this.renderTextArea.bind(this) : this.renderReplyButton.bind(this);

    if (showButton) {
      return (
        <div>
          <hr />
          <div className={ style['answer'] }>
            { renderFunc() }
          </div>
        </div>
      );
    }
  }

  render() {
    let { question } = this.props;

    return (
      <div className={ classnames(style['question-container'], 'row') }>
        <div className={ classnames(style['question-box'], 'col-xs-10') }>
          <div className={ style['arrow'] } />
          <header>{ question.title }</header>
          <article>{ question.question }</article>
          <time>{ moment(question.createdAt).fromNow() }</time>

          { this.renderReply() }

        </div>
        <div className={ classnames(style['question-avatar'], 'col-xs-2') }>
          <Avatar
            src={ question.author ? question.author.avatar : defaultPhoto }
            size="45px"
          />
        </div>

      </div>
    );
  }
}

export default Question;
