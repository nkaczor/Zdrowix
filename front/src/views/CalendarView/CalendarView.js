import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import style from './calendar_view.scss';
import { Button, TextInput,
         PasswordInput, ImageInput,
         Label, Checkbox,
         Paper, Calendar } from '../../components';

export class CalendarView extends Component {
  static propTypes = {

  };
  constructor(props) {
    super(props);
  }

  render() {
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
      <div>
        <Calendar data={ data } />
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    counter: state.counter
  };
};

export default connect(mapStateToProps)(CalendarView);