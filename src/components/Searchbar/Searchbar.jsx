import { useState } from "react";  
import { Report } from 'notiflix/build/notiflix-report-aio';                   
import PropTypes from 'prop-types';
import { StyledHeader, StyledForm, StyledButton, SearchIcon, StyledBtnLabel, StyledInput } from "./styled";


export const Searchbar = ({ onSubmit }) => {   //отримано з App
    const [query, setQuery] = useState('');

    const handleChange = (event) => {
        setQuery(event.target.value.toLowerCase());  
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();

        if(query.trim() === '') {
            Report.failure('Enter your request.');
            return;
        }
        onSubmit(query);  // передача даних в App
        setQuery('');  
    }

        return (
            <StyledHeader>
                <StyledForm onSubmit={handleFormSubmit}>

                    <StyledButton type="submit">
                        <SearchIcon />
                        <StyledBtnLabel>Search</StyledBtnLabel>
                    </StyledButton>

                    <StyledInput
                        type="text"
                        value={query} // контрольований input (без цього reset не зробиш)
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={handleChange} //або без додаткової ф-ції: 
                        // onChange={event => setQuery(event.target.value.toLowerCase())}
                    />
                </StyledForm>
            </StyledHeader>
        );
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};