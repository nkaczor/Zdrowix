import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import * as visitActions from '../../redux/modules/visit';

import style from './new_visit_confirm_view.scss';
import { Calendar, Button } from '../../components';

export class NewVisitConfirmView extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    params: PropTypes.object,
    token: PropTypes.string,

  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      week: 0
    };
  }

  handleYesClick() {
    let { token, params } = this.props;
    let data = {
      doctorId: params.id,
      date: params.date,
      hour: params.hour,
    }

    this.props.dispatch(visitActions.fetchSaveVisit(token, data))
    .then(() => {
      this.context.router.push(`/panel/doctor/${ this.props.params.id }`);
    });
  }
  handleNoClick() {
    this.context.router.push(`/panel/doctor/${ this.props.params.id }`);
  }

  render() {
    let { params } = this.props;

    return (
      <div className={ style['new-visit-confirm-view'] }>
        Are you sure to make an appointment
        at <strong>{ params.hour }:00</strong> on <strong>{ params.date } </strong>?
        <div>
          <Button
            label="YES"
            color="green"
            size="big"
            onClick={ this.handleYesClick.bind(this) }
          />
          <Button
            label="NO"
            color="red"
            size="big"
            onClick={ this.handleNoClick.bind(this) }
          />
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    token: state.user.token,
  };
};

export default connect(mapStateToProps)(NewVisitConfirmView);