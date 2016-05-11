import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as doctorActions from '../../redux/modules/doctor';

import style from './find_doctor_view.scss';

import { Header, Avatar, Button } from '../../components';

export class FindDoctorView extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    doctors: PropTypes.array
  };

  componentDidMount() {
    this.props.dispatch(doctorActions.fetchDoctors());
  }

  renderDoctor(doctor) {
    return (
      <div className={ style['doctor-wrapper'] }>
        <div className={ style['doctor-container'] }>
          <div className={ style['box-top'] }>
            <div className={ style['doctor-info'] }>
              <p className={ style['name'] }>{ `${ doctor.firstName } ${ doctor.lastName }` }</p>
              <p><label>Email: </label>{ doctor.email }</p>
              <p><label>Specialty: </label> { doctor.specialty.name }</p>
            </div>
            <div className={ style['doctor-avatar'] }>
              <Avatar
                src={ doctor.avatar }
                size="75px"
              />
            </div>
            <div className={ style['clear'] } />
          </div>

          <div className={ style['box-bottom'] }>
            <div className={ style['action'] }>
              <p>23</p>
              <p>Questions</p>
              <Button
                label="Ask the doctor"
                color="blue"
              />
            </div>
            <div className={ style['action'] }>
              <p>345</p>
              <p>Visits</p>
              <Button
                label="Arrange appointment"
                color="red"
              />
            </div>
            <div className={ style['clear'] } />
          </div>
        </div>
      </div>
    );
  }

  render() {
    let { doctors } = this.props;

    return (
      <div className={ style['find-doctor-view'] }>
        <Header>Find Doctor</Header>
        <div className={ style['doctors-container'] }>
          {
            doctors.map(doctor =>
              this.renderDoctor(doctor)
          )
        }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    doctors: state.doctor || []
  };
};

export default connect(mapStateToProps)(FindDoctorView);