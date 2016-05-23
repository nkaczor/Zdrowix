import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import * as questionActions from '../../redux/modules/question';

import defaultPhoto from '../../../assets/noImage.gif';
import style from './questions_view.scss';
import {
  Avatar, Label,
  TextInput, TextArea,
  Button } from '../../components';

export class QuestionsView extends Component {
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
    };
  }


  render() {
    let { userInfo } = this.props;


    return (
      <div className={ style['ask-the-doctor-view'] }>
        <div className={ style['paper-content'] }>

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

export default connect(mapStateToProps)(QuestionsView);