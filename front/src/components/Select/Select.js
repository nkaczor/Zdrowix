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
    onChange: PropTypes.func
  }

  handleChange(e) {
    this.props.onChange(e);
    //your cide here
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
          onChange={ this.handleChange.bind(this) }
        >
          <option value=""
            disabled
            selected
          >
          { placeholder }
          </option>

      { items.map(element => {
        return (
          <option
            value={ element.value }
            key={ element.value }
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