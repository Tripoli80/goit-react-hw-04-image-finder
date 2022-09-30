import { Overlay, Modal } from './Modalstyled';
import { createPortal } from 'react-dom';
import Loader from 'components/Loader/Loader';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useEffect } from 'react';

const modalRoot = document.getElementById('modal-root');

const Popap = props => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.addEventListener('keydown', closeModal);
    return () => {
      document.removeEventListener('keydown', closeModal);
    };
  });

  const closeModal = e => {
    const { currentTarget, target, code } = e;
    const { onClose } = props;

    if (currentTarget === target || code === 'Escape') {
      onClose();
    }
  };

  const handleImageLoaded = () => {
    setIsLoading(false);
  };

  const { src, tags } = props;

  const instance = (
    <Overlay onClick={closeModal}>
      <Modal>
        {isLoading && <Loader />}
        <img
          src={src}
          alt={`Open large Foto ${tags}`}
          onLoad={handleImageLoaded}
          onError={handleImageLoaded}
        />
      </Modal>
    </Overlay>
  );

  return createPortal(instance, modalRoot);
};

export default Popap;

Popap.propTypes = {
  isLoading: PropTypes.bool,
  src: PropTypes.string.isRequired,
  tags: PropTypes.string,
  onClose: PropTypes.func,
};
