import React, { Component } from 'react';
import { Overlay, Modal } from './Modalstyled';
import { createPortal } from 'react-dom';
import Loader from 'components/Loader/Loader';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('modal-root');

export default class Popap extends Component {
  state = {
    isLoading: true,
  };
  componentDidMount() {
    document.addEventListener('keydown', this.closeModal);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeModal);
  }
  closeModal = e => {
    const { currentTarget, target, code } = e;
    const { onClose } = this.props;

    if (currentTarget === target || code === 'Escape') {
      onClose();
    }
  };

  handleImageLoaded = () => {
    this.setState({ isLoading: false });
  };
  render() {
    const { src, tags } = this.props;
    const { closeModal } = this;
    const instance = (
      <Overlay onClick={closeModal}>
        <Modal>
          {this.state.isLoading && <Loader />}
          <img
            src={src}
            alt={`Open large Foto ${tags}`}
            onLoad={this.handleImageLoaded}
            onError={this.handleImageLoaded}
          />
        </Modal>
      </Overlay>
    );

    return createPortal(instance, modalRoot);
  }
}

Popap.propTypes = {
  isLoading: PropTypes.bool,
  src: PropTypes.string.isRequired,
  tags: PropTypes.string,
  onClose: PropTypes.func,
};
