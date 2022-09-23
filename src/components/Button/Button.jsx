import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Btn } from './Button.styled';
export default class Button extends Component {
  render() {
    const { onClick, disabled} = this.props;
    return (
      <Btn type="button" disabled={disabled} onClick={onClick}>
        loadMore
      </Btn>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};