import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as questionActions from '../../redux/modules/question';

import style from './questions_view.scss';
import { Question } from '../../containers';

export class QuestionsView extends Component {
  static propTypes = {
    userInfo: PropTypes.object,
    params: PropTypes.object,
    dispatch: PropTypes.func,
    token: PropTypes.string,
    questions: PropTypes.array
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    let { token, params, dispatch } = this.props;

    if (token) {
      dispatch(questionActions.fetchQuestions(params.id, token));
    }
  }

  componentWillUpdate(nextProps) {
    let { dispatch, params, token } = this.props;

    if (nextProps.token && (nextProps.token !== token)) {
      dispatch(questionActions.fetchQuestions(params.id, nextProps.token));
    }
  }

  handleSendClick(question) {
    let { dispatch, token } = this.props;
    let data = {
      doctor: question.doctor._id,
      answer: question.answer
    };
    dispatch(questionActions.fetchAddAnswer(token, question._id, data));
  }

  render() {
    let { questions, params, userInfo } = this.props;

    return (
      <div className={ style['ask-the-doctor-view'] }>
        <div className={ style['paper-content'] }>
          { questions.map(question =>
            <Question
              key={ question._id }
              question={ question }
              showButton={ userInfo._id === params.id }
              onSend={ this.handleSendClick.bind(this) }
            />
          ) }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.user.token,
    userInfo: state.user.userInfo || {},
    questions: state.question
  };
};

export default connect(mapStateToProps)(QuestionsView);