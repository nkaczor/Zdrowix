import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import style from './calendar.scss';
import Svg from 'svg-inline-react';
import makeAppointmentSVG from '../../../assets/icons/make-appointment.svg';

class Calendar extends Component {
  static propTypes = {
    src: PropTypes.string,
    size: PropTypes.string,
    className: PropTypes.string,
    data: PropTypes.object
  };

  getRange() {
    let { calendar } = this.props.data;
    let min = 24;
    let max = 0;

    calendar.forEach(day =>
      day.hours.forEach(item => {
        if (item.hour > max) {
          max = item.hour;
        }
        else if (item.hour < min) {
          min = item.hour;
        }
      })
    );

    return {
      start: min,
      end: max
    };
  }

  renderBlock(hour, state) {
    let blockStyle = classnames(style['block'], style[state]);

    return (
      <div className={ blockStyle }>
        <Svg src={ makeAppointmentSVG } />
      </div>
    );
  }
  renderLabels(range) {
    let labels = [];

    for (let i = range.start; i <= range.end; i++) {
      labels.push(<div className={ style['hour-label'] }>{ i }:00</div>);
    }
    return (
      <div className={ style['labels'] }>
        { labels }
      </div>
    );
  }
  renderDay(day, range) {
    let blocks = [];

    for (let i = range.start; i <= range.end; i++) {
      if (day.hours.filter(x => x.hour === i && x.state === 'visit').length) {
        blocks.push(this.renderBlock(i, 'visit'));
      }
      else if (day.hours.filter(x => x.hour === i && x.state === 'free').length) {
        blocks.push(this.renderBlock(i, 'free'));
      }
      else {
        blocks.push(this.renderBlock(i));
      }
    }
    return (
      <div className={ style['day-container'] }>
        <div className={ style['day-label'] }> { day.name } </div>
        <div className={ style['block-container'] }>
          { blocks }
        </div>
      </div>
    );
  }

  render() {
    let { data, className } = this.props;
    let range = this.getRange();
    let calendarStyle = classnames(style['calendar'], className);

    return (
      <div className={ calendarStyle }>
        <div className={ style['nav'] }>
          <div className={ style['prev'] }>
            { '< Prev Week' }
          </div>
          <div className={ style['next'] }>
            { 'Next Week >' }
          </div>
        </div>
        { this.renderLabels(range) }
        <div className={ style['days-container'] }>
          {
            data.calendar.map(day => this.renderDay(day, range))
          }
        </div>
      </div>
    );
  }
}

export default Calendar;