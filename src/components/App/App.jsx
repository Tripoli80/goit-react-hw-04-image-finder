import { useEffect, useState } from 'react';

import './styles.css';
import { getHits } from 'helpers/post';

import Loader from 'components/Loader/Loader';
import { Appdiv, NoImage } from './App.styled';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';

import Button from 'components/Button/Button';
import Popap from 'components/Modal/Modal';

export const App = () => {
  const [qwery, setQwery] = useState('');
  const [hits, setHits] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [src, setSrc] = useState('');
  const [tags, setTags] = useState('');
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    const inputEmpty = !Boolean(qwery.trim(' '));
    //смотрю быль ли запрос новый из вне и если да вношу в стейт чем вызываю перезапус этой функции
    if (inputEmpty) {
      return;
    }
    console.log('sent new post');
    fetchPost({ page: page, qwery: qwery });
  }, [qwery, page]);

  const loadMore = () => {
    setPage(prevState => {
      return prevState + 1;
    });
  };

  const fetchPost = async ({ page, qwery }) => {
    setIsLoading(true);

    try {
      const { hitsUpdate, totalHits } = await getHits({
        qwery: qwery,
        page: page,
      });
      if (!hitsUpdate) {
        throw new Error();
      }
      setHits(prevHits => {
        const newHits = [...prevHits, ...hitsUpdate];
        return newHits;
      });
      setTotalHits(totalHits);
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // тут хочу открыть модалку
  const onOpenModal = index => {
    const { largeImageURL, tags } = hits[index];

    setModalOpen(prevMO => !prevMO);
    setSrc(largeImageURL);
    setTags(tags);
  };

  const onCloseModal = () => {
    setModalOpen(prevMO => !prevMO);
    setSrc('');
    setTags('');
  };

  const onSubmit = newName => {
    console.log('newName', newName, qwery);
    if (qwery !== newName) {
      setQwery(newName);
      setHits([]);
      setPage(1);
    }
  };
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
};
