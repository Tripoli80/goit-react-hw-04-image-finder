import { ItemImg, Img } from './ImageGalleryItem.styled';

const ImageGalleryItem = props => {
  const { webformatURL, tags } = props.hit;
  const { index, onClick } = props;
  return (
    <ItemImg>
      <Img
        src={webformatURL}
        alt={tags}
        data-index={index}
        onClick={() => onClick(index)}
      />
    </ItemImg>
  );
};

export default ImageGalleryItem;
