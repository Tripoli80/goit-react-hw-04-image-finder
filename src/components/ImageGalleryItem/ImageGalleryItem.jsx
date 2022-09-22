import React, { Component } from 'react';
import { ItemImg, Img } from './ImageGalleryItem.styled';

export default class ImageGalleryItem extends Component {
  render() {
    const { webformatURL} = this.props.hit;
    const index = this.props.index;
    const onClick = this.props.onClick;
    return (
      <ItemImg>
        <Img
          src={webformatURL}
          alt=""
          data-index={index}
          onClick={() => onClick(index)}
        />
      </ItemImg>
    );
  }
}
