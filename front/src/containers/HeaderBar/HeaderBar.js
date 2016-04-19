import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Svg from 'svg-inline-react';

import { Avatar } from '../../components';

import avatar from '../../../assets/avatar.jpg';
import arrowDownIcon from '../../../assets/icons/down_arrow.svg';
import style from './header_bar.scss';

export class HeaderBar extends Component {

  constructor(props) {
    super(props);
    this.state = { showMenu: false };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.onClose);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClose);
  }

  onClose() {
    this.setState({ showMenu: false });
  }

  renderDropdownMenu() {
    return (
      <div className={ style['dropdown-menu'] }>
        <ul>
          <li><Link to="/">Option 1</Link></li>
          <li><Link to="/">Option 2</Link></li>
          <li><Link to="/">Option 3</Link></li>
        </ul>
      </div>
    );
  }

  toggleMenu(e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    let { showMenu } = this.state;

    this.setState({
      showMenu: !showMenu
    });
  }

  render() {
    return (
      <div className={ style['header-bar'] }>
        <header>Zdrowix</header>
        <div
          className={ style['header-bar-right'] }
          onClick={ this.toggleMenu }
        >
          <Avatar
            src={ avatar }
            size="30px"
            className={ style['avatar'] }
          />
          <span className={ style['nickname'] }>
            Natalia
          </span>
          <Svg
            src={ arrowDownIcon }
            className={ style['arrow-down'] }
          />
        { this.state.showMenu ? this.renderDropdownMenu() : '' }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    counter: state.counter
  };
};

export default connect(mapStateToProps)(HeaderBar);