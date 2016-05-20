import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as doctorActions from '../../redux/modules/doctor';
import * as specialtyActions from '../../redux/modules/specialty';

import style from './find_doctor_view.scss';

import { Header, Avatar, Button, Select } from '../../components';

export class FindDoctorView extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    doctors: PropTypes.array
  };
  static contextTypes= {
    router: React.PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedSpecialty: ''
    };
  }

  componentDidMount() {
    this.props.dispatch(doctorActions.fetchDoctors());
    this.props.dispatch(specialtyActions.fetchSpecialities());
  }

  handleSelectChange(e) {
    this.setState({
      selectedSpecialty: e.target.value
    });
  }

  renderDoctor(doctor) {
    return (
      <div className={ style['doctor-wrapper'] }>
        <div className={ style['doctor-container'] }>
          <div className={ style['box-top'] }>
            <div
              className={ style['doctor-info'] }
              onClick={ this.context.router.push.bind(this, `/panel/doctor/${ doctor._id }`) }
            >
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
    let { doctors, specialties } = this.props;
    let { selectedSpecialty } = this.state;
    let items = specialties.map(x => {
      return {
        label: x.name,
        value: x._id
      };
    });

    items.unshift({
      label: 'All',
      value: ''
    });

    let selectedDoctors = doctors.filter(x =>
      selectedSpecialty === '' || (x.specialty && x.specialty._id === selectedSpecialty));

    return (
      <div className={ style['find-doctor-view'] }>
        <Header>Find Doctor</Header>
        <div className={ style['filters'] }>
          <Select
            items={ items }
            placeholder="Specialty"
            size="inherit"
            onChange={ this.handleSelectChange.bind(this) }
            value={ selectedSpecialty }
          />
        </div>
        <div className={ style['doctors-container'] }>
          {
            selectedDoctors.map(doctor =>
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
    doctors: state.doctor || [],
    specialties: state.specialty || []
  };
};

export default connect(mapStateToProps)(FindDoctorView);