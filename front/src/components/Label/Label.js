import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import style from './label.scss';

class Label extends Component {
  static propTypes = {
    color: PropTypes.oneOf(['red', 'blue']),
  };

  render () {
    let { className, htmlFor } = this.props;
    let labelStyle = classnames(style['label'], this.props.className);
    return (
      <label
        htmlFor={ htmlFor }
        className={ labelStyle }
      >
        { this.props.children }
      </label>
    )
  }
}

export default Label;