import { StyledButton } from "./styled";
import PropTypes from 'prop-types';


export const Button = ({ onClick }) => { // пропс з ImageGallery
    return (
        <StyledButton type="button" onClick={() => onClick()}>Load more</StyledButton>
    );
};

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
};