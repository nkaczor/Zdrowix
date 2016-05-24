import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import style from './visits_view.scss';
import { Button, TextInput,
         PasswordInput, ImageInput,
         Label, Checkbox,
         Paper, Calendar } from '../../components';

export class VisitsView extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div>
      Hi

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {

  };
};

export default connect(mapStateToProps)(VisitsView);