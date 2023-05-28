import { useEffect } from "react";            
import { createPortal } from "react-dom";                   
import PropTypes from 'prop-types';
import { StyledOverlay, StyledModal } from "./styled";

const modalRoot = document.querySelector('#modal-root');


export const Modal = ({ largeImageURL, tags, onClose }) => {    

    useEffect(() => {
        const handleKeyDown = event => { 
            if(event.code === 'Escape') {  //закриття модалки кнопкою Escape
                onClose();
            }
        }
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown); // при закритті модалки (componentWillUnmount), спрацює тільки цей рядок
        }
    }, [onClose]); 
    // useEffect спрацює при 1-му рендері (на слухача підписались - відписались - підписались(?чому)) та зміні пропса onClose 

    
    const handleBackdropClick = event => {  //закриття модалки кліком на бекдроп
        if(event.currentTarget === event.target) {
            onClose();  // запустить useEffect - тільки return
        }
    }

    return createPortal(
        <StyledOverlay onClick={handleBackdropClick}>
            <StyledModal>
                <img src={largeImageURL} alt={tags} width='900'/>
            </StyledModal>
        </StyledOverlay>,
        modalRoot,
    );
}

Modal.propTypes = {
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};