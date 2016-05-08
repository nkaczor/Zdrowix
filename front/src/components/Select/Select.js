import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import style from './select.scss';

class Select extends Component {
  static propTypes= {
    htmlFor: PropTypes.string,
    className: PropTypes.string,
    items: PropTypes.array,
  }
  render() {
    let { className, htmlFor } = this.props;
    let selectStyle = classnames(style['select'], className);

    return (
      <select
        htmlFor={ htmlFor }
        className={ selectStyle }
      >
    { this.props.items.map((element) => {
      return (
        <option
          value={ element.id }
          key={ element.id }
        >
        { element.label }
        </option>
        );
    })
    }
      </select>
    );
  }
}

export default Select;