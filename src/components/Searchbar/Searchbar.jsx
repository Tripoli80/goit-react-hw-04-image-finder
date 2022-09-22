import React, { Component } from 'react';
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
