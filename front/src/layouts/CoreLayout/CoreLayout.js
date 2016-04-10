import React, { PropTypes, Component } from 'react';
import { HeaderBar, SideBar } from '../../containers';

import style from './core_layout.scss';

export class CoreLayout extends Component {
  static propTypes = {

  };

  render () {

    return (
      <div className={style['page-container']}>
        <HeaderBar />
        <SideBar />
        <h1>Core Layout</h1>
        <div className={style['view-container-wrapper']}>
          <div className={style['view-container']}>dfsdfsfsdfsfsdf
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

CoreLayout.propTypes = {
  children: PropTypes.element
}

export default CoreLayout