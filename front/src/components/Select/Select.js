import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import style from './select.scss';

class Select extends Component {
  static propTypes= {
    htmlFor: PropTypes.string,
    className: PropTypes.string,
    items: PropTypes.array,
    error: PropTypes.string,
    placeholder: PropTypes.string,
    size: PropTypes.oneOf([ 'small', 'big', 'inherit' ]),
  }

  clickHandler() {
    console.log('rututu');
  }


  render() {
    let { className, htmlFor, items, placeholder, error } = this.props;
    const selectStyle = classnames(
      style['select'],
      style[this.props.size],
      className, {
        [style['error']]: error
      });

    return (
      <div className={ selectStyle }>
        <select
          htmlFor={ htmlFor }
          onClick={ this.clickHandler }
        >
          <option value=""
            disabled
            selected
          >
          { placeholder }
          </option>

      { items.map((element) => {
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
        <div className={ style['error-message'] }>
          { error }
        </div>
      </div>
    );
  }
}

export default Select;