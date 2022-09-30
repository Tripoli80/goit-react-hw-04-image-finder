import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

import { ImageGalleryContainer } from './ImageGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = props => {
  const prepareList = hits => {
    const { onOpenModal } = props;
    const list = (
      <ImageGalleryContainer>
        {hits.map((hit, index) => {
          return (
            <ImageGalleryItem
              key={nanoid()} //nanoid -использовал так как иногда при пагинации дудбировалась картинка и ругалось на ключи
              hit={hit}
              index={index}
              onClick={onOpenModal}
            />
          );
        })}
      </ImageGalleryContainer>
    );
    return list;
  };

  const { hits } = props;
  const allItems = prepareList(hits);
  return allItems;
};

ImageGallery.propTypes = {
  hits: PropTypes.array,
  onOpenModal: PropTypes.func,
};
