import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Search,
  Form,
  SearchFormInput,
  ButtonLabel,
  SearchFormButton,
} from './Searchbar.styled';
export class Searchbar extends Component {
  state = {
    curentName: '',
  };
  onChangeName = curentName => {
    this.setState({ curentName: curentName.target.value });
  };
  submitForm = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    onSubmit(this.state.curentName);
  };

  render() {
    const { submitForm, onChangeName } = this;
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
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func

  // isLoading: PropTypes.bool,
  // qwery: PropTypes.string,
  // hits: PropTypes.arrayOf(
  //   PropTypes.exact({
  //     id: PropTypes.string.isRequired,
  //     type: PropTypes.string.isRequired,
  //     currency: PropTypes.string.isRequired,
  //     amount: PropTypes.string.isRequired,
  //   })
  // ),
  // page: PropTypes.number,
  // error: PropTypes.bool,
  // isLoading: PropTypes.bool,
  // modalOpen: PropTypes.bool,
  // src:  PropTypes.string,
  // tags:  PropTypes.string,
  // totalHits:  PropTypes.number,


};

