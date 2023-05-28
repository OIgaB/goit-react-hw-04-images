import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

import { Container,  StyledImage, Notification } from "./styled";

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import placeholderImg from './placeholder-image.png';
import api from '../services/pixabay-api';


export const App = () => {

  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [noMatch, setNoMatch] = useState(false);          // на запит відсутні зображення: ні
  const [collectionEnd, setCollectionEnd] = useState(false);


  const getImages = async (query, pageNumber) => {     // основна ф-ція запиту на бекенд
    setLoading(true); 
    try {
        const { data } = await api.fetchImages(query, pageNumber);   // запит на бекенд і відповідь
        const filteredApiResponse = data.hits.map(({ id, webformatURL, largeImageURL, tags }) => ({ id, webformatURL, largeImageURL, tags })); //shorthand; усі властивості не потрібні, лише 4
        
        if(data.hits.length === 0) {    // data.hits - масив об'єктів, що прийшли з бекенду
            return setNoMatch(true);
        }

        setImages(prevState => ([...prevState, ...filteredApiResponse]));

        if(pageNumber !== 1) {
          setTimeout(() => {
            window.scrollBy({
              top: 510,
              behavior: 'smooth',
          });
          }, 150);
        }
      
        if(pageNumber >= Math.ceil(data.totalHits / 12)) {
            Notify.warning("You've reached the end of search results."); 
            setCollectionEnd(true);
        }
    } catch(error) {
      Notify.warning(error.message); 
    } finally {
        setLoading(false); 
    }
  }


  useEffect(() => {
    if(!query) {
      return;
    }    
    try {
      getImages(query, pageNumber); // виклик ф-ції
    } catch(error) {
      Notify.warning(error.message); 
    }
  }, [query, pageNumber]);


  const handleFormSubmit = query => {  // з Searchbar приходить те, що користувач ввів в <input>
    setQuery(query);
    setImages([]);
    setPageNumber(1);
    setNoMatch(false);          // на запит відсутні зображення: ні
    setCollectionEnd(false);
  }
  

  const handleBtnClick = () => {
      setPageNumber(prevState => prevState + 1);   
  } 

  return (
    <Container>
      <Searchbar onSubmit={handleFormSubmit}/>       {/* onSubmit - не подія, а назва пропса*/}
        
      {images.length !== 0 && <ImageGallery images={images} />}
      { loading && <Loader /> }

      {noMatch && // якщо на запит відсутні зображення
        <>
            <StyledImage src={placeholderImg} alt='man on the moon' />
            <Notification>No images corresponding your request '{query}' found in our Universe. Try searching for another term.</Notification>
        </>
      }

      {(images.length !== 0 && !collectionEnd) && <Button onClick={handleBtnClick}/> } {/* рендер кнопки по умові*/}
    </Container> 
  );
}