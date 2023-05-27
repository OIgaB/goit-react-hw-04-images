import { useEffect } from "react";                // для класів
import { createPortal } from "react-dom";                   
import PropTypes from 'prop-types';
import { StyledOverlay, StyledModal } from "./styled";

const modalRoot = document.querySelector('#modal-root');


export const Modal = ({ largeImageURL, tags, onClose }) => {    

    useEffect(() => {
        const handleKeyDown = event => {
            console.log('in useEffect - щось натисли');
            if(event.code === 'Escape') {  //закриття модалки кнопкою Escape
                onClose();
                console.log('in useEffect - натисли Escape');
            }
        }
        window.addEventListener('keydown', handleKeyDown);
        console.log('in useEffect');
        return () => {
            window.removeEventListener('keydown', handleKeyDown); // при закритті модалки (componentWillUnmount), спрацює тільки цей рядок
            console.log('in useEffect - return');
        }
    }, [onClose]); // спрацює при 1-му рендері (на слухача підписались - відписались - підписались) та зміні пропса onClose(навіть по кліку на бекдроп спрацює return)


    const handleBackdropClick = event => {  //закриття модалки кліком на бекдроп
        if(event.currentTarget === event.target) {
            onClose();
            console.log('handleBackdropClick');
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