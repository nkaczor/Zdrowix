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
    data: PropTypes.array,
    onPrev: PropTypes.func,
    onNext: PropTypes.func,
    onSelect: PropTypes.func
  };

  getRange() {
    let { data } = this.props;
    let min = 24;
    let max = 0;

    data.forEach(day =>
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

  renderBlock(day, hour, state) {
    let blockStyle = classnames(style['block'], style[state]);
    let onSelect = state === 'free' ? this.props.onSelect.bind(this, day, hour) : () => {};

    return (
      <div
        key={ hour }
        className={ blockStyle }
        onClick={ onSelect }
      >
        <Svg src={ makeAppointmentSVG } />
      </div>
    );
  }
  renderLabels(range) {
    let labels = [];

    for (let i = range.start; i <= range.end; i++) {
      labels.push(
        <div
          className={ style['hour-label'] }
          key={ i }
        >
          { i }:00
        </div>
      );
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
        blocks.push(this.renderBlock(day.date, i, 'visit'));
      }
      else if (day.hours.filter(x => x.hour === i && x.state === 'free').length) {
        blocks.push(this.renderBlock(day.date, i, 'free'));
      }
      else {
        blocks.push(this.renderBlock(day.date, i));
      }
    }
    return (
      <div
        className={ style['day-container'] }
        key={ day.date }
      >
        <div className={ style['day-label'] }> { day.date.format('dd') } </div>
        <div className={ style['day-label'] }> { day.date.format('DD.MM') } </div>
        <div className={ style['block-container'] }>
          { blocks }
        </div>
      </div>
    );
  }

  render() {
    let { data, className, onNext, onPrev } = this.props;
    let range = this.getRange();

    let calendarStyle = classnames(style['calendar'], className);

    return (
      <div className={ calendarStyle }>
        <div className={ style['nav'] }>
          <div
            className={ style['prev'] }
            onClick={ onPrev }
          >
            { '< Prev Week' }
          </div>
          <div
            className={ style['next'] }
            onClick={ onNext }
          >
            { 'Next Week >' }
          </div>
        </div>
        { this.renderLabels(range) }
        <div className={ style['days-container'] }>
          {
            data.map(day => this.renderDay(day, range))
          }
        </div>
        {
          range.start === 24 ? <div className={ style['no-openings-label'] }>No openings</div> : ''
        }
      </div>
    );
  }
}

export default Calendar;