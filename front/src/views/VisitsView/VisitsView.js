import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

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
      <div className="col-xs-4">
        <Paper>
          <div className={ style['visit-container'] }>

            <div className={ style['avatar-container'] }>
              <Avatar
                src={ defaultPhoto }
                size="80px"
              />
            </div>

            <div className={ style['info-container'] }>
              <p>blue blue</p>
              <p>basdasdsad</p>
              <p>basdasdsad</p>
            </div>

            <div className={ style['info-container'] }>
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

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {

  };
};

export default connect(mapStateToProps)(VisitsView);