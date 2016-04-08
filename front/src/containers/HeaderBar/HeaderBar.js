import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import SVG from 'svg-inline-react';

import {Avatar} from '../../components';

import avatar from '../../../assets/avatar.jpg';
import arrowDownIcon from '../../../assets/icons/down_arrow.svg';
import style from './header_bar.scss';

export class HeaderBar extends Component {

  constructor(props) {
   super(props);
   this.state = {showMenu: false};
   this.toggleMenu = this.toggleMenu.bind(this);
  }

  renderDropdownMenu(){
    return(
      <div className={style['dropdown-menu']}>
dsdasdas
      </div>
    )
  }
  toggleMenu(){
    this.setState({
      showMenu: !this.state.showMenu
    })
  }
  render() {
    return (
      <div className={ style['header-bar'] }>
        <header>Zdrowix</header>
        <div className={ style['header-bar-right'] }>
          <Avatar src={ avatar } size="30px" className={ style['avatar'] }/>
          <span className={ style['nickname'] }>Natalia</span>
          <SVG src={arrowDownIcon} className={ style['arrow-down'] } onClick={ this.toggleMenu }/>
          { this.state.showMenu ? this.renderDropdownMenu() : "" }
        </div>

    </div>
    )
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter
})
export default connect(mapStateToProps)(HeaderBar)