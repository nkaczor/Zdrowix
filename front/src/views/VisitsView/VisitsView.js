import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import style from './visits_view.scss';
import { Paper, Avatar } from '../../components';
import defaultPhoto from '../../../assets/noImage.gif';

export class VisitsView extends Component {

  static propTypes = {

  };

  renderSingleAppointment() {
    return (
      <div className="row">
        <div className={ classnames('col-xs-12', style['no-padding']) } >
          <div className={ style['visit-container'] }>
            <div className={ classnames('col-xs-8', style['no-padding']) }>
              <div className={ style['user-data-container'] }>
                <div className={ classnames(style['avatar-container']) } >
                  <Avatar
                    src={ defaultPhoto }
                    size="40px"
                  />
                </div>

                <div className={ classnames(style['info-container'], style['no-padding']) }>
                  <div className={ style['user-info-text'] }>
                  Imię Nazwisko
                  </div>
                  <div className={ style['doctor-info-text'] }>
                  Doktor
                  </div>
                </div>
              </div>
            </div>
            <div className={ classnames(style['date-container'], 'col-xs-4',
            style['no-padding']) }
            >
            data godzina
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className={ style['visits-view'] }>
        <div className="col-xs-6">
          <Paper>
            <div className={ style['header-info'] }>
              Past visits
            </div>
            { this.renderSingleAppointment() }
            { this.renderSingleAppointment() }
          </Paper>
        </div>

        <div className="col-xs-6">
          <Paper>
            <div className={ style['header-info'] }>
              Upcoming visits
            </div>
            { this.renderSingleAppointment() }
            { this.renderSingleAppointment() }
            { this.renderSingleAppointment() }
            { this.renderSingleAppointment() }
          </Paper>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {

  };
};

export default connect(mapStateToProps)(VisitsView);