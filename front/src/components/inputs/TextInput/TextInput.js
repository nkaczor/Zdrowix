import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import style from '../input.scss';

class TextInput extends Component {
  static propTypes = {

  };

  render () {
    let { className, id, error } = this.props;

    let inputContainerStyle = classnames(style['input-container'], className, {
      [style['error']]: error
    });

    return (
      <div className={inputContainerStyle}>
        <input
          id={ id }
          type="text"
          value="Hello!" />
        <div className={style['error-message']}>
          {error}
        </div>
      </div>
  )
  }
}

export default TextInput;