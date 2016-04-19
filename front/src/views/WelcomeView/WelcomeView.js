import React, { PropTypes, Component } from 'react';


import classnames from 'classnames';
import style from './welcome_view.scss';
import { Button, TextInput, PasswordInput, ImageInput, Label } from '../../components';
import leftimage from '../../../assets/leftimage.jpg';
import rightimage from '../../../assets/rightimage.jpg';


export class WelcomeView extends Component {
  static propTypes = {

  };


//let box = classnames(style['fill'], imageStyle);

  render () {

let leftImageStyle = {backgroundImage: 'url('+leftimage+')'};
let rightImageStyle = {backgroundImage: 'url('+rightimage+')'};

let container = classnames('col-xs-6', style['no-padding']);

      return (



<div>
        <div className="row">
            <div className={container}>
              <div className={style['image-box']} style={leftImageStyle}></div>
            </div>

            <div className={container}>
              <div className={style['image-box']} style={rightImageStyle}>


                  <div className={style['text-box']}>
                    <h1 className={style['title-heading']}>
                        Zdrowix
                    </h1>
                    <h3 className={style['title-content']}>
                        Jedyne co musisz zrobić to zalogować się na swoje konto
                        aby w pełni korzystać z naszej platformy.
                    </h3>
                    <div className={style['button-box']}>
                      <Button label="Zaloguj się" color="red" size="big"/>
                    </div>

                  </div>





              </div>
            </div>
        </div>



</div>





      )

  }
}

WelcomeView.propTypes = {
  children: PropTypes.element
}

export default WelcomeView