import React, { Component } from 'react';
import { Btn } from './Button.styled';
export default class Button extends Component {
  render() {
    const { onClick } = this.props;
    return (
      <Btn type="button" onClick={onClick}>
        loadMore
      </Btn>
    );
  }
}
