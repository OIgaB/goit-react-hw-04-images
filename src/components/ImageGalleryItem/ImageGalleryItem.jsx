//Компонент елемента списку із зображенням

import { useState } from "react";                  
import { Modal } from '../Modal/Modal';
import PropTypes from 'prop-types';
import { StyledImageGalleryItem, Image } from "./styled";


export const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {    
    
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    }

    // const handleImgClick = () => {
    //     toggleModal();  // запуск модалки: showModal = true
    // }

    return (
        <>
            <StyledImageGalleryItem onClick={() => toggleModal()}>
                <Image src={webformatURL} alt={tags} loading="lazy" />
            </StyledImageGalleryItem>
            {showModal && <Modal largeImageURL={largeImageURL} tags={tags} onClose={toggleModal} />}
        </>
    );
}

ImageGalleryItem.propTypes = {
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
};