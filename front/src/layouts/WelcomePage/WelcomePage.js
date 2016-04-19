import React, { PropTypes, Component } from 'react';

import style from './welcome_page.scss';
import { Button, TextInput, PasswordInput, ImageInput, Label } from '../../components';
import leftimage from '../../../assets/left-image.jpg';
import rightimage from '../../../assets/right-image.jpg';


export class WelcomePage extends Component {
  static propTypes = {

  };



  render () {
      return (


        <div className="row">
          <div className="col-xs-6">
              <div className={style['box']}>
                <img className={style['img']} src={leftimage}></img>
              </div>
          </div>

{
        //   <div className="col-xs-6">
        //     <div className={style['box']}>
        //       <img className={style['img']} src={rightimage}></img>
        //     </div>
        // </div>
}

<div className="col-xs-6">
    <div className={style['fill']}></div>
</div>

        </div>




      )

  }
}

WelcomePage.propTypes = {
  children: PropTypes.element
}

export default WelcomePage