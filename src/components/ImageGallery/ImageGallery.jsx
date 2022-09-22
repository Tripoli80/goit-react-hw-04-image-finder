import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import { ImageGalleryContainer, NoImage } from './ImageGallery.styled';
import { getHits } from 'helpers/post';

import Loader from 'components/Loader/Loader';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';
import Popap from 'components/Modal/Modal';

export class ImageGallery extends Component {
  state = {
    hits: [],
    qwery: '',
    page: 1,
    error: null,
    isLoading: false,
    modalOpen: false,
    src: '',
    tags: '',
  };
  // первичная загрузка

  componentDidMount() {
    this.fetchPost();
  }
  componentDidUpdate(prevProps, prevState) {
    const prewPropsQwery = prevProps.qwery;
    const prewPage = prevState.page;

    const newPropsQwery = this.props.qwery;
    const currentPage = this.state.page;

    const prevQwery = prevState.qwery;
    const currentQwery = this.state.qwery;
    //смотрю быль ли запрос новый из вне и если да вношу в стейт чем вызываю перезапус этой функции
    if (prewPropsQwery !== newPropsQwery) {
      this.setState({ hits: [], page: 1, qwery: newPropsQwery });
      return;
    }
    // если сотояние номера страници или  запроса изменилось - новый запрос
    if (prewPage !== currentPage || prevQwery !== currentQwery) {
      this.fetchPost(currentPage);
      return;
    }
  }

  loadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  fetchPost = async page => {
    this.setState({ isLoading: true });

    try {
      const hitsUpdate = await getHits({ qwery: this.state.qwery, page: page });
      if (!hitsUpdate) {
        throw new Error();
      }
      this.setState(({ hits }) => {
        const newHits = [...hits, ...hitsUpdate];
        return { hits: newHits };
      });
    } catch (error) {
      this.setState({ error: true });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  // тут хочу открыть модалку
  onOpenModal = index => {
    const src = this.state.hits[index].largeImageURL;
    const tags = this.state.hits[index].tags;
    this.setState(state => {
      return { modalOpen: !state.modalOpen, src: src, tags: tags };
    });
  };

  onCloseModal = () => {
    this.setState(state => {
      return { modalOpen: !state.modalOpen, src: '', tags: '' };
    });
  };

  prepareList = hits => {
    const list = (
      <ImageGalleryContainer>
        {hits.map((hit, index) => {
          return (
            <ImageGalleryItem
              key={nanoid()} //nanoid -использовал так как иногда при пагинации дудбировалась картинка и ругалось на ключи
              hit={hit}
              index={index}
              onClick={this.onOpenModal}
            />
          );
        })}
      </ImageGalleryContainer>
    );
    return list;
  };

  render() {
    const { isLoading, hits, error, modalOpen, src, tags, qwery } = this.state;
    const { loadMore, onCloseModal, prepareList } = this;
    const isHits = Boolean(hits.length);

    let allItems;
    if (isHits) {
      allItems = prepareList(hits);
    }
    const errorMassage = error && !isLoading;
    const noImageMassege = !isHits && !error && !isLoading;

    return (
      <>
        {isLoading && <Loader />}
        {modalOpen && <Popap src={src} tags={tags} onClose={onCloseModal} />}
        {errorMassage && <NoImage>{'..... щось не так ......   '}</NoImage>}
        {noImageMassege && (
          <NoImage>{`За запитом " ${qwery} " Нічого не знайдено....`}</NoImage>
        )}
        {isHits && allItems}
        {isHits && <Button onClick={loadMore} />}
      </>
    );
  }
}
