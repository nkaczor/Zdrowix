import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import style from './home_view.scss';
import { Button, TextInput,
         PasswordInput, ImageInput,
         Label, Checkbox,
         Paper, Calendar } from '../../components';

export class HomeView extends Component {
  static propTypes = {

  };
  constructor(props) {
    super(props);
    this.state = { checkboxStatus: true };
  }

  handleCheckboxChange() {
    this.setState({
      checkboxStatus: !this.state.checkboxStatus
    });
  }

  renderCalendar() {
    let data = {
      range: {
        start: 7,
        end: 17
      },
      calendar: [
        {
          name: 'monday',
          date: Date.now(),
          hours: [
            {
              hour: 7,
              state: 'free'
            },
            {
              hour: 8,
              state: 'free'
            },
            {
              hour: 9,
              state: 'visit'
            },
            {
              hour: 10,
              state: 'free'
            },
            {
              hour: 11,
              state: 'free'
            },
          ]
        },
        {
          name: 'tuesday',
          date: Date.now(),
          hours: [
            {
              hour: 15,
              state: 'free'
            },
            {
              hour: 16,
              state: 'free'
            },
            {
              hour: 9,
              state: 'visit'
            }
          ]
        },
        {
          name: 'wednesday',
          date: Date.now(),
          hours: [
            {
              hour: 7,
              state: 'free'
            },
            {
              hour: 8,
              state: 'free'
            },
            {
              hour: 10,
              state: 'visit'
            }
          ]
        },
        {
          name: 'thursday',
          date: Date.now(),
          hours: [
            {
              hour: 7,
              state: 'free'
            },
            {
              hour: 14,
              state: 'free'
            },
            {
              hour: 11,
              state: 'visit'
            }
          ]
        },
        {
          name: 'friday',
          date: Date.now(),
          hours: [
            {
              hour: 10,
              state: 'free'
            },
            {
              hour: 8,
              state: 'free'
            },
            {
              hour: 9,
              state: 'visit'
            }
          ]
        },
        {
          name: 'saturday',
          date: Date.now(),
          hours: [
            {
              hour: 7,
              state: 'free'
            },
            {
              hour: 8,
              state: 'free'
            },
            {
              hour: 9,
              state: 'visit'
            }
          ]
        },
        {
          name: 'sunday',
          date: Date.now(),
          hours: [
            {
              hour: 7,
              state: 'free'
            },
            {
              hour: 8,
              state: 'free'
            },
            {
              hour: 9,
              state: 'visit'
            }
          ]
        },
      ]
    };

    return (
      <Paper>
        <Calendar data={ data } />
      </Paper>
    )
  }
  render() {
    return (
      <div className={ style.home }>
        <div className={ style['button-container'] }>
          <Button
            label="Click me"
            color="red"
            size="small"
            handleClick={ (x) => {
              console.log(x);
            }
            }
          />
          <Button
            label="Click me"
            color="blue"
          />
          <Button
            label="Click me"
            color="green"
          />
          <Button
            label="Click me"
            size="big"
          />
        </div>
        <div className="row">
          <Label
            className="col-xs-2"
            htmlFor="text"
          >
            Two inputs
          </Label>
          <TextInput
            className="col-xs-5"
            error="Invalid message."
          />
          <PasswordInput className="col-xs-5" />
        </div>
        <br />
        <div className="row">
          <Label
            className="col-xs-2"
            htmlFor="upload"
          >
            Upload your photo
          </Label>
          <ImageInput className="col-xs-5" />
        </div>
        <Checkbox
          label="Male"
          checked={ this.state.checkboxStatus }
          onChange={ this.handleCheckboxChange.bind(this) }
        />
        { this.renderCalendar() }

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    counter: state.counter
  };
};

export default connect(mapStateToProps)(HomeView);