import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import classnames from 'classnames';
import style from './visits_view.scss';
import { Button, TextInput,
         PasswordInput, ImageInput,
         Label, Checkbox,
         Paper, Calendar,Avatar } from '../../components';

import defaultPhoto from '../../../assets/noImage.gif';

export class VisitsView extends Component {

  static propTypes = {

  };

  renderSingleAppointment() {
    return (
      <div className="col-xs-12">
        <Paper
          className={ style['no-padding'] }
        >
          <div className={ style['visit-container'] }>

            <div className={ classnames(style['avatar-container']), 'col-xs-3' }>
              <Avatar
                src={ defaultPhoto }
                size="80px"
              />
            </div>

            <div className={ classnames(style['info-container'], 'col-xs-5') }>
              <p>Imię</p>
              <p>Nazwisko</p>
              <p>basdasdsad</p>
            </div>

            <div className={ classnames(style['info-container'], 'col-xs-4') }>
              data godzina
            </div>
          </div>
        </Paper>
      </div>
    );
  }

  render() {
    return (
      <div className={ style['visits-view'] }>

        { this.renderSingleAppointment() }
        { this.renderSingleAppointment() }
        { this.renderSingleAppointment() }

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {

  };
};

export default connect(mapStateToProps)(VisitsView);