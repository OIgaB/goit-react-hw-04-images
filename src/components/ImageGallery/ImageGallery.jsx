//Список карток зображень

import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem"; 
import { StyledGallery } from "./styled";
import PropTypes from 'prop-types';


export const ImageGallery = ({ images }) => {      
    return (
        <StyledGallery>
            {
                images.map(({ id, webformatURL, largeImageURL, tags }) => (
                    <ImageGalleryItem key={id} webformatURL={webformatURL} largeImageURL={largeImageURL} tags={tags} />     // <li> 
                ))
            }
        </StyledGallery>
    );            
}

ImageGallery.propTypes = {
    images: PropTypes.array.isRequired,
};