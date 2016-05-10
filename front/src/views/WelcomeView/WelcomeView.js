import React, { Component, PropTypes } from 'react';

import classnames from 'classnames';
import style from './welcome_view.scss';
import { Button } from '../../components';
import leftImage from '../../../assets/leftimage.jpg';
import rightImage from '../../../assets/rightimage.jpg';
import backgroundImage from '../../../assets/background.jpg';
import Svg from 'svg-inline-react';
import patienticon from '../../../assets/icons/aid-kit.svg';
import doctoricon from '../../../assets/icons/lab.svg';

export class WelcomeView extends Component {

  static contextTypes= {
    router: PropTypes.object.isRequired
  }
  goTo(url) {
    this.context.router.push(url);
  }
  render() {
    let leftImageStyle = { backgroundImage: `url(${ leftImage })` };
    let rightImageStyle = { backgroundImage: `url(${ rightImage })` };
    let backgroundImageStyle = { backgroundImage: `url(${ backgroundImage })` };

    let containerStyle = classnames('col-xs-6', style['no-padding']);

    return (
      <div className={ style['welcome-view'] }>
        <div className="row">
          <div className={ containerStyle }>
            <div className={ style['image-box'] }
              style={ leftImageStyle }
            >
            </div>
          </div>
          <div className={ containerStyle }>
            <div className={ style['image-box'] }
              style={ rightImageStyle }
            >
              <div className={ style['text-box'] }>
                <h1 className={ style['title-heading'] }>
                        Zdrowix
                </h1>
                <h3 className={ style['title-content'] }>
                  Please sign in <br />to discover what we prepared for you.
                </h3>
                <div className={ style['button-box'] }>
                  <Button label="SIGN IN"
                    color="red"
                    size="inherit"
                    onClick={ this.goTo.bind(this, '/sign-in') }
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
                  Sign up as patient
                  </h2>
                  <div className={ style['button-container'] }>
                    <Button label="SIGN UP"
                      color="blue"
                      size="big"
                      onClick={ this.goTo.bind(this, '/patient/sign-up') }
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
                    Sign up as doctor
                  </h2>
                  <div className={ style['button-container'] }>
                    <Button label="SIGN UP"
                      color="blue"
                      size="big"
                      onClick={ this.goTo.bind(this, '/doctor/sign-up') }
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