import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import style from './home_view.scss';
import { Button, TextInput, PasswordInput, Label } from '../../components';

export class HomeView extends Component {
  static propTypes = {

  };

  render () {

    return (
      <div className={style.home}>
        <div className={style['button-container']}>
          <Button label="Click me" color="red" size="small"/>
          <Button label="Click me" color="blue"/>
          <Button label="Click me" color="green"/>
          <Button label="Click me" size="big"/>
        </div>
        <div className="row">
          <Label className="col-xs-2" htmlFor="text">Text:</Label>
          <TextInput id="text" className="col-xs-5" error="Invalid message."/>
          <PasswordInput className="col-xs-5"/>
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter
})
export default connect(mapStateToProps)(HomeView)