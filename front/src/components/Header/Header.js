import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import style from './header.scss';

class Header extends Component {
  static propTypes= {
    className: PropTypes.string,
    children: PropTypes.string,
  }
  render() {
    let { className, children } = this.props;
    let headerStyle = classnames(style['header'], className);

    return (
      <header className={ headerStyle }>
        { children }
      </header>
    );
  }
}

export default Header;