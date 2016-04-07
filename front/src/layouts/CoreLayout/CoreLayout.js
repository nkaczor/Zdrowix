import React, { PropTypes } from 'react';
import { HeaderBar } from '../../containers';

import style from './core_layout.scss';

function CoreLayout ({ children }) {
  return (
    <div className={style['page-container']}>
      <HeaderBar/>
      <h1>Core Layout</h1>
      <div className='view-container'>
        {children}
      </div>
    </div>
  )
}

CoreLayout.propTypes = {
  children: PropTypes.element
}

export default CoreLayout