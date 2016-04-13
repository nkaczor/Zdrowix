import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import style from './label.scss';

class Label extends Component {
  static propTypes= {
    htmlFor: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.required,
  }
  render() {
    let { className, htmlFor, children } = this.props;
    let labelStyle = classnames(style['label'], className);

    return (
      <label
        htmlFor={ htmlFor }
        className={ labelStyle }
      >
        { children }
      </label>
    );
  }
}

export default Label;