import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

import { Container,  StyledImage, Notification } from "./styled";

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import placeholderImg from './placeholder-image.png';
import api from '../services/pixabay-api';


export class App extends Component {

  state = {
    query: '',
    images: [],
    pageNumber: 1,
    isLoading: false,
    noMatch: false,      // на запит відсутні зображення: ні
    collectionEnd: false, 
  }


  // getSnapshotBeforeUpdate() {
  //   return {
  //       scrollY: window.scrollY,
  //   };
  // }

  async componentDidUpdate(prevProps, prevState, snapshot) {     // приходить query
    try {
        if(prevState.query !== this.state.query || prevState.pageNumber !== this.state.pageNumber ) {
            await this.getImages(this.state.query, this.state.pageNumber); // виклик ф-ції
           
        //     setTimeout(() => {
        //         window.scrollBy({
        //             top: snapshot.scrollY,
        //             behavior: 'smooth',
        //         });
        //     }, 150);
        }
    } catch(error) {
        Notify.warning(error.message); 
    }
  }


  handleFormSubmit = (query) => {  // з Searchbar приходить те, що користувач ввів в <input>
    this.setState({ 
      query,        // shorthand
      images: [],
      pageNumber: 1,
      noMatch: false,
      collectionEnd: false
    }); 
  }
  

  getImages = async (query, pageNumber) => {     // основна ф-ція запиту на бекенд
    this.setState({ isLoading: true }); 
    try {
        const { data } = await api.fetchImages(query, pageNumber);   // запит на бекенд і відповідь
        const filteredApiResponse = data.hits.map(({ id, webformatURL, largeImageURL, tags }) => ({ id, webformatURL, largeImageURL, tags })); //shorthand; усі властивості не потрібні, лише 4
        
        if(data.hits.length === 0) {    // data.hits - масив об'єктів, що прийшли з бекенду
            return this.setState({ noMatch: true });
        }

        this.setState(prevState => ({ images: [...prevState.images, ...filteredApiResponse] }));

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
            this.setState({ 
                collectionEnd: true,
            });
        }
    } catch(error) {
      Notify.warning(error.message); 
    } finally {
        this.setState({ isLoading: false }); 
    }
  }

  handleBtnClick = () => {
      this.setState((prevState) => ({
          pageNumber: prevState.pageNumber + 1
      }));   
  } 



  render() {
    const { handleFormSubmit, handleBtnClick } = this;
    const {  images, isLoading, noMatch, query, collectionEnd } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={handleFormSubmit}/>       {/* onSubmit - не подія, а назва пропса*/}
        
        {images.length !== 0 && <ImageGallery images={images} />}
        { isLoading && <Loader /> }

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
}