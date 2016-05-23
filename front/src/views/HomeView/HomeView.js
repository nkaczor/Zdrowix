import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import style from './home_view.scss';
import { Button, TextInput,
         PasswordInput, ImageInput,
         Label, Checkbox,
         Paper, Calendar } from '../../components';

export class HomeView extends Component {
  static propTypes = {

  };
  constructor(props) {
    super(props);
    this.state = { checkboxStatus: true };
  }

  handleCheckboxChange() {
    this.setState({
      checkboxStatus: !this.state.checkboxStatus
    });
  }


  render() {
    return (
      <div className={ style.home }>
        <div className={ style['button-container'] }>
          <Button
            label="Click me"
            color="red"
            size="small"
            handleClick={ (x) => {
              console.log(x);
            }
            }
          />
          <Button
            label="Click me"
            color="blue"
          />
          <Button
            label="Click me"
            color="green"
          />
          <Button
            label="Click me"
            size="big"
          />
        </div>
        <div className="row">
          <Label
            className="col-xs-2"
            htmlFor="text"
          >
            Two inputs
          </Label>
          <TextInput
            className="col-xs-5"
            error="Invalid message."
          />
          <PasswordInput className="col-xs-5" />
        </div>
        <br />
        <div className="row">
          <Label
            className="col-xs-2"
            htmlFor="upload"
          >
            Upload your photo
          </Label>
          <ImageInput className="col-xs-5" />
        </div>
        <Checkbox
          label="Male"
          checked={ this.state.checkboxStatus }
          onChange={ this.handleCheckboxChange.bind(this) }
        />

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    counter: state.counter
  };
};

export default connect(mapStateToProps)(HomeView);