import React, { Component } from 'react';

import classnames from 'classnames';
import style from './welcome_view.scss';
import { Button } from '../../components';
import leftimage from '../../../assets/leftimage.jpg';
import rightimage from '../../../assets/rightimage.jpg';
import backgroundimage from '../../../assets/background.jpg';
import Svg from 'svg-inline-react';
import patienticon from '../../../assets/icons/aid-kit.svg';
import doctoricon from '../../../assets/icons/lab.svg';

export class WelcomeView extends Component {

// let box = classnames(style['fill'], imageStyle);
  render() {

    let leftImageStyle = { backgroundImage: 'url('+leftimage+')' };
    let rightImageStyle = { backgroundImage: 'url('+rightimage+')' };
    let backgroundImageStyle = { backgroundImage: 'url('+backgroundimage+')' };

    let container = classnames('col-xs-6', style['no-padding']);

    return (
      <div>
        <div className="row">
          <div className={ container }>
            <div className={ style['image-box'] }
              style={ leftImageStyle }
            >
            </div>
          </div>
          <div className={ container }>
            <div className={ style['image-box'] }
              style={ rightImageStyle }
            >
              <div className={ style['text-box'] }>
                <h1 className={ style['title-heading'] }>
                        Zdrowix
                </h1>
                <h3 className={ style['title-content'] }>
                        Jedyne co musisz zrobić to zalogować się na swoje konto
                        aby w pełni korzystać z naszej platformy.
                </h3>
                <div className={ style['button-box'] }>
                  <Button label="Zaloguj się"
                    color="red"
                    size="big"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={ style['background-image'] }
          style={ backgroundImageStyle }
        >
          <div className={ style['option-container'] }>
            <div className="row">
              <div className="col-xs-6">
                <div className={ style['option-box'] }>
                  <div className={ style['patient-icon'] }>
                    <div className={ style['patient-image'] }>
                      <Svg
                        src={ patienticon }
                        className={ style['svg-icon'] }
                      />
                    </div>
                  </div>
                  <h2 className={ style['registration-text'] }>
                  Zarejestruj się jako Pacjent
                  </h2>
                  <div className={ style['button-container'] }>
                    <Button label="Rejestruj się"
                      color="blue"
                      size="big"
                    />
                  </div>
                </div>
              </div>

              <div className="col-xs-6">
                <div className={ style['option-box'] }>
                  <div className={ style['doctor-icon'] }>
                    <div className={ style['doctor-image'] }>
                      <Svg
                        src={ doctoricon }
                        className={ style['svg-icon'] }
                      />
                    </div>
                  </div>
                  <h2 className={ style['registration-text'] }>
                    Zarejestruj się jako Lekarz
                  </h2>
                  <div className={ style['button-container'] }>
                    <Button label="Rejestruj się"
                      color="blue"
                      size="big"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WelcomeView;