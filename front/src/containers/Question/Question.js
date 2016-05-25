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
    answer: PropTypes.string,
    onSend: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      answer: '',
      showAnswerInput: false,
    };
  }

  handleAnswerChange(e) {
    this.setState({ answer: e.target.value });
  }

  handleReplyButtonClick() {
    this.setState({
      showAnswerInput: !this.state.showAnswerInput
    });
  }

  renderReplyButton() {
    return (
      <Button
        color="blue"
        label="REPLY"
        size="small"
        onClick={ this.handleReplyButtonClick.bind(this) }
      />
    );
  }

  handleSendClick() {
    let { onSend, question } = this.props;
    let { answer } = this.state;
    let data = Object.assign({ answer: answer }, question);
    console.log(data);
    onSend(data);
  }

  renderTextArea() {
    let { answer } = this.state;

    return (
      <div>
        <TextArea
          rows="4"
          value={ answer }
          onChange={ this.handleAnswerChange.bind(this) }
        />
        <Button
          color="blue"
          label="SEND"
          size="small"
          onClick={ this.handleSendClick.bind(this) }
        />
      </div>
    );
  }

  renderReply() {
    let { showButton, question } = this.props;
    let { showAnswerInput } = this.state;
    let renderFunc = showAnswerInput ?
      this.renderTextArea.bind(this) : this.renderReplyButton.bind(this);

    if (showButton && !question.answer) {
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
  renderAnswer() {
    let { question } = this.props;

    if (question.answer) {
      return (
        <div className={ classnames(style['answer-container']) }>
          <div className={ classnames(style['answer-avatar']) }>
            <Avatar
              src={ question.doctor ? question.doctor.avatar : defaultPhoto }
              size="45px"
            />
          </div>
          <div className={ classnames(style['question-box']) }>
            <div className={ style['left-arrow'] } />
            <article>{ question.answer }</article>
            <time>{ moment(question.updatedAt).fromNow() }</time>
          </div>

        </div>
      );
    }
  }
  render() {
    let { question } = this.props;

    return (
      <div className={ classnames(style['container']) }>
        <div className={ classnames(style['question-container']) }>
          <div className={ classnames(style['question-box']) }>
            <div className={ style['right-arrow'] } />
            <header>{ question.title }</header>
            <article>{ question.question }</article>
            <time>{ moment(question.createdAt).fromNow() }</time>

            { this.renderReply() }

          </div>
          <div className={ classnames(style['question-avatar']) }>
            <Avatar
              src={ question.author ? question.author.avatar : defaultPhoto }
              size="45px"
            />
          </div>
        </div>

        { this.renderAnswer() }

      </div>
    );
  }
}

export default Question;
