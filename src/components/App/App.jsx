import React, { Component } from 'react';
import './styles.css';

import { Appdiv } from './App.styled';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    qwery: '',
  };

  onSubmit = newName => {
    this.setState({ qwery: newName });
  };
  render() {
    const { qwery } = this.state;
    const onSubmit = this.onSubmit;
    return (
      <Appdiv>
        <Searchbar onSubmit={onSubmit} />
        <ImageGallery qwery={qwery} />
      </Appdiv>
    );
  }
}
