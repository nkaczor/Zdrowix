import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import style from './checkbox.scss';

class Checkbox extends Component {
  static propTypes= {
    className: PropTypes.string,
    checked: PropTypes.bool,
    label: PropTypes.string,
    onChange: PropTypes.func,
  }
  render() {
    let { className, checked, onChange } = this.props;
    let checkboxStyle = classnames(style['label'], className);

    return (
      <div className={ style['checkbox'] }>
        <label>
          <input
            className={ checkboxStyle }
            type="checkbox"
            checked={ checked }
            onChange={ onChange }
          />
          <div className={ style['icon'] } />
          <span>{ this.props.label }</span>
        </label>
      </div>
    );
  }
}

export default Checkbox;