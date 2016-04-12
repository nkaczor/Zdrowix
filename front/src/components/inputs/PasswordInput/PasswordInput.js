import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import style from '../input.scss';

class PasswordInput extends Component {
  static propTypes = {

  };

  render () {
    let { className, id, error, value, placeholder } = this.props;

    let inputContainerStyle = classnames(style['input-container'], className, {
      [style['error']]: error
    });

    return (
      <div className={inputContainerStyle}>
        <input
          id={ id }
          type="password"
          value={ value }
          placeholder={ placeholder } />
        <div className={style['error-message']}>
          {error}
        </div>
      </div>
  )
  }
}

export default PasswordInput;