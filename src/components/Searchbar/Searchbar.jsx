import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Search,
  Form,
  SearchFormInput,
  ButtonLabel,
  SearchFormButton,
} from './Searchbar.styled';
import { useState } from 'react';
export const Searchbar = props => {
  const [curentName, setCurentName] = useState('');

  const onChangeName = curentName => {
    setCurentName(curentName.target.value);
  };
  const submitForm = e => {
    e.preventDefault();
    const { onSubmit } = props;
    onSubmit(curentName);
  };

  return (
    <Search>
      <Form onSubmit={submitForm}>
        <SearchFormButton type="submit">
          <ButtonLabel>Search</ButtonLabel>
        </SearchFormButton>
        <SearchFormInput
          onChange={onChangeName}
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </Search>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
