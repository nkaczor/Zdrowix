import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import style from './button.scss';

class Button extends Component {
  static propTypes = {
    color: PropTypes.oneOf([ 'red', 'blue', 'green', 'dark-cyan' ]),
    size: PropTypes.oneOf([ 'small', 'big', 'inherit' ]),
    onClick: PropTypes.func,
    label: PropTypes.string,
  };

  render() {
    const btnStyle = classnames(
      style['button'],
      style[this.props.color],
      style[this.props.size]);

    return (
      <a
        className={ btnStyle }
        onClick={ this.props.onClick }
      >
        { this.props.label }
      </a>
    );
  }
}

export default Button;
