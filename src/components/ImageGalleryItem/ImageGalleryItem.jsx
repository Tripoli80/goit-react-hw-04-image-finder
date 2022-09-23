import React, { Component } from 'react';
import { ItemImg, Img } from './ImageGalleryItem.styled';

export default class ImageGalleryItem extends Component {
  render() {
    const { webformatURL, tags} = this.props.hit;
    const {index, onClick }= this.props;
      return (
      <ItemImg>
        <Img
          src={webformatURL}
          alt={tags}
          data-index={index}
          onClick={() => onClick(index)}
        />
      </ItemImg>
    );
  }
}
