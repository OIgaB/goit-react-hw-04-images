//Список карток зображень

import { Component } from "react";                     // для класів
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem"; 
import { StyledGallery } from "./styled";
import PropTypes from 'prop-types';


export class ImageGallery extends Component {      

    render() {
        const { images } = this.props;
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
}

ImageGallery.propTypes = {
    images: PropTypes.array.isRequired,
};