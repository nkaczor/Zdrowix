import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import style from '../input.scss';

class TextArea extends Component {
  static propTypes = {
    className: PropTypes.string,
    error: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    rows: PropTypes.string
  };

  render() {
    let { className, error, value, placeholder, onChange, rows } = this.props;

    let inputContainerStyle = classnames(style['input-container'], className, {
      [style['error']]: error
    });

    return (
      <div className={ inputContainerStyle }>
        <textarea
          rows={ rows }
          value={ value }
          placeholder={ placeholder }
          onChange={ onChange }
        />
        <div className={ style['error-message'] }>
          { error }
        </div>
      </div>
  );
  }
}

export default TextArea;