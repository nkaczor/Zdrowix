import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import style from './paper.scss';

class Paper extends Component {
  static propTypes= {
    className: PropTypes.string,
    children: PropTypes.any,
  }
  render() {
    let { className, children } = this.props;
    let paperStyle = classnames(style['paper-container'], className);

    return (
      <div className={ paperStyle }>
        <div
          className={ style['paper'] }
        >
          { children }
        </div>
      </div>
    );
  }
}

export default Paper;