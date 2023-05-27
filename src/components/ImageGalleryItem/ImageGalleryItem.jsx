//Компонент елемента списку із зображенням

import { Component } from "react";                     // для класів
import { Modal } from '../Modal/Modal';
import PropTypes from 'prop-types';
import { StyledImageGalleryItem, Image } from "./styled";


export class ImageGalleryItem extends Component {      
    state = {
        showModal: false,
    }

    toggleModal = () => {
        this.setState(({ showModal }) => ({ 
            showModal: !showModal, 
        }));
    }

    handleImgClick = () => {
        this.toggleModal();  // запуск модалки
    }

    render() {
        const { handleImgClick, toggleModal } = this;
        const { webformatURL, largeImageURL, tags } = this.props;
        return (
            <>
                <StyledImageGalleryItem onClick={handleImgClick}>
                    <Image src={webformatURL} alt={tags} loading="lazy" />
                </StyledImageGalleryItem>
                {this.state.showModal && <Modal largeImageURL={largeImageURL} tags={tags} onClose={toggleModal} />}
            </>
        );
    }
}

ImageGalleryItem.propTypes = {
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
};