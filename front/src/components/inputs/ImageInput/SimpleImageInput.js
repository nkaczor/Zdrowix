import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';

import style from '../input.scss';
import imageInputStyle from './image_input.scss';
import noImage from '../../../../assets/noImage.gif';

import { Button } from '../../';

class SimpleImageInput extends Component {
  static propTypes = {
    className: PropTypes.string,
    error: PropTypes.string,
    onUpload: PropTypes.func,
    value: PropTypes.any,
    color: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.handleFile = this.handleFile.bind(this);
  }

  handleFile(e) {
    this.props.onUpload(e.target.files[0]);
  }

  render() {
    const { className, error, color } = this.props;
    let inputContainerStyle = classnames(
      imageInputStyle['simple-upload-container'],
      className,
      { [style['error']]: error }
    );

    return (
      <div className={ inputContainerStyle }>
        <input
          value={ this.props.value }
          type="file"
          onChange={ this.handleFile }
          className={ imageInputStyle['simple-upload'] }
        />
        <Button
          label="Choose Image"
          color={ color }
        />
      </div>
    );
  }
}

export default SimpleImageInput;