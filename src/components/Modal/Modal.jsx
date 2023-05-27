import { Component } from "react";                // для класів
import { createPortal } from "react-dom";                   
import PropTypes from 'prop-types';
import { StyledOverlay, StyledModal } from "./styled";

const modalRoot = document.querySelector('#modal-root');


export class Modal extends Component {    

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = event => {
        if(event.code === 'Escape') {
            this.props.onClose();
        }
    }

    handleBackdropClick = event => {
        if(event.currentTarget === event.target) (
            this.props.onClose()
        )
    }

    render() {
        const { largeImageURL, tags } = this.props;
        return createPortal(
            <StyledOverlay onClick={this.handleBackdropClick}>
                <StyledModal>
                    <img src={largeImageURL} alt={tags} width='900'/>
                </StyledModal>
            </StyledOverlay>,
            modalRoot,
        );
    }
}

Modal.propTypes = {
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};