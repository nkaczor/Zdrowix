import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import style from './time_chooser.scss';

class TimeChooser extends Component {
  static propTypes= {
    htmlFor: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.required,
    data: PropTypes.array,
    day: PropTypes.string,
    onClick: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      label: 'Check hours'
    };
  }
  handleMouseOut() {
    this.setState({ label: 'Check hours' });
  }
  handleMouseOver(hour) {
    this.setState({ label: `${ hour }:00` });
  }

  renderBlock(hour, available) {
    let blockStyle = classnames(style['hour-block'], { [style['hour-block-true']]: available });

    return (
      <div
        className={ blockStyle }
        onMouseOver={ this.handleMouseOver.bind(this, hour) }
        onMouseOut={ this.handleMouseOut.bind(this) }
        onClick={ this.props.onClick.bind(this, hour) }
      >

      </div>
    );
  }

  render() {
    let { className, data } = this.props;
    let timeChooserStyle = classnames(style['time-chooser'], className);
    let blocks = [];

    for (let i = 0; i <= 23; i++) {
      blocks.push(this.renderBlock(i, data[i]));
    }

    return (
      <div
        className={ timeChooserStyle }
      >
        <div className={ style['day-name'] }>
          { this.props.day }
        </div>
        <div className={ style['label'] }>
          { this.state.label }
        </div>
        <div>
          { blocks }
        </div>
      </div>
    );
  }
}

export default TimeChooser;