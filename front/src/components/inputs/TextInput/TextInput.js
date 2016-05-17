import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import style from '../input.scss';

class TextInput extends Component {
  static propTypes = {
    className: PropTypes.string,
    error: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool
  };

  render() {
    let { className, error, value,
      placeholder, onChange, disabled } = this.props;

    let inputContainerStyle = classnames(style['input-container'], className, {
      [style['error']]: error
    });

    return (
      <div className={ inputContainerStyle }>
        <input
          type="text"
          value={ value }
          placeholder={ placeholder }
          onChange={ onChange }
          disabled={ disabled }
        />
        <div className={ style['error-message'] }>
          { error }
        </div>
      </div>
  );
  }
}

export default TextInput;