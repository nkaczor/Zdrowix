import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';

import style from '../input.scss';
import imageInputStyle from './image_input.scss';
import noImage from '../../../../assets/noImage.gif';

import { Button } from '../../';

class ImageInput extends Component {
  static propTypes = {

  };

  constructor(props) {
   super(props);
   this.state = {dataUri: "", fileName: ""};
   this.handleFile = this.handleFile.bind(this);
  }

  handleFile(e){

    var reader = new FileReader();
    var file = e.target.files[0];

    let fileName = e.target.value.split( '\\' ).pop();


    reader.onload = (upload) => {

      this.setState({
        dataUri: upload.target.result,
        fileName: fileName
      });
    }

    reader.readAsDataURL(file);
  }
  render () {
    let { className, id, error } = this.props;
    let imageStyle = classnames(imageInputStyle['image']);
    let inputContainerStyle = classnames(style['input-container'], className, {
      [style['error']]: error
    });
    let errorMessageStyles = classnames(style['error-message'],imageInputStyle['info-message']);

    return (
      <div className={ inputContainerStyle }>
        <div className={ imageStyle }>
          <img src={ this.state.dataUri || noImage }/>
        </div>
        <div className={ imageInputStyle['input'] }>
          <input
            className={ imageInputStyle['file-name'] }
            id="uploadFile"
            placeholder={ this.state.fileName || "No file selected" }
            disabled="disabled"
          />
          <div className={ imageInputStyle['fileUpload'] }>

              <input
                  id={ id }
                  type="file"
                  onChange={ this.handleFile }
                  className={ imageInputStyle['upload'] }
                   />
              <Button label="Choose Image" size="small" color="blue"/>
          </div>



          <div className={ errorMessageStyles }>
            {error || "Accepted formats: JPG, PNG, GIF"}
          </div>
        </div>
      </div>
    )
  }
}

export default ImageInput;