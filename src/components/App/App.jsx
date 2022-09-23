import React, { Component } from 'react';

import './styles.css';
import { getHits } from 'helpers/post';

import Loader from 'components/Loader/Loader';
import { Appdiv, NoImage } from './App.styled';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';

import Button from 'components/Button/Button';
import Popap from 'components/Modal/Modal';

export class App extends Component {
  state = {
    qwery: '',
    hits: [],
    page: 1,
    error: null,
    isLoading: false,
    modalOpen: false,
    src: '',
    tags: '',
    totalHits: 0,
  };

  componentDidUpdate(_, prevState) {
    const prewPage = prevState.page;
    const prevQwery = prevState.qwery;

    const currentPage = this.state.page;
    const currentQwery = this.state.qwery;

    const inputEmpty = !Boolean(currentQwery.trim(' '));
    //смотрю быль ли запрос новый из вне и если да вношу в стейт чем вызываю перезапус этой функции
    if (inputEmpty) {
      return;
    }

    if (prewPage !== currentPage || prevQwery !== currentQwery) {
      this.fetchPost({ page: currentPage, qwery: currentQwery });
      return;
    }
  }

  loadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  fetchPost = async ({ page, qwery }) => {
    this.setState({ isLoading: true });

    try {
      const { hitsUpdate, totalHits } = await getHits({
        qwery: qwery,
        page: page,
      });
      if (!hitsUpdate) {
        throw new Error();
      }
      this.setState(({ hits }) => {
        const newHits = [...hits, ...hitsUpdate];
        return { hits: newHits, totalHits: totalHits };
      });
    } catch (error) {
      this.setState({ error: true });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  // тут хочу открыть модалку
  onOpenModal = index => {
    const { largeImageURL, tags } = this.state.hits[index];
    this.setState(state => {
      return { modalOpen: !state.modalOpen, src: largeImageURL, tags: tags };
    });
  };

  onCloseModal = () => {
    this.setState(state => {
      return { modalOpen: !state.modalOpen, src: '', tags: '' };
    });
  };

  onSubmit = newName => {
    const { qwery } = this.state;
    if (qwery !== newName) {
      this.setState({ hits: [], page: 1, qwery: newName });
    }
  };
  getErrorText = () => {};

  render() {
    const { isLoading, hits, error, modalOpen, src, tags, qwery, totalHits } =
      this.state;
    const { loadMore, onCloseModal, onSubmit, onOpenModal } = this;
    const btnActive = hits.length >= totalHits;
    const errorMassage = error && !isLoading;
    const inputEmpty = !Boolean(qwery.trim(' '));
    const isHits = Boolean(hits.length) && !inputEmpty;
    const noImageMassege = !inputEmpty && !isHits && !error && !isLoading;
    let msg;
    if (errorMassage) msg = '..... щось пішло не так ......   ';
    if (inputEmpty) msg = `Введіть щось для пошуку....`;
    if (noImageMassege) msg = `За запитом " ${qwery} " Нічого не знайдено....`;

    return (
      <Appdiv>
        <Searchbar onSubmit={onSubmit} />
        {isLoading && <Loader />}
        {(errorMassage || inputEmpty || noImageMassege) && (
          <NoImage>{`${msg}`}</NoImage>
        )}
        {isHits && <ImageGallery hits={hits} onOpenModal={onOpenModal} />}
        {isHits && <Button disabled={btnActive} onClick={loadMore} />}
        {modalOpen && <Popap src={src} tags={tags} onClose={onCloseModal} />}
      </Appdiv>
    );
  }
}
