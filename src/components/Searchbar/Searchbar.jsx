import { Component } from "react";  // для класів
import { Report } from 'notiflix/build/notiflix-report-aio';                   
import PropTypes from 'prop-types';
import { StyledHeader, StyledForm, StyledButton, SearchIcon, StyledBtnLabel, StyledInput } from "./styled";


export class Searchbar extends Component {       // для класів

    state = { 
        query: '',
    }

    handleChange = (event) => {
        this.setState({ query: event.target.value.toLowerCase() });  
    }

    handleFormSubmit = (event) => {
        event.preventDefault();

        if(this.state.query.trim() === '') {
            Report.failure('Enter your request.');
            return;
        }
        this.props.onSubmit(this.state.query);  //дані передаються в App
        this.setState({ query: '' });  
    }

    render() {
        const { handleFormSubmit, handleChange } = this;
        return (
            <StyledHeader>
                <StyledForm onSubmit={handleFormSubmit}>

                    <StyledButton type="submit">
                        <SearchIcon />
                        <StyledBtnLabel>Search</StyledBtnLabel>
                    </StyledButton>

                    <StyledInput
                        type="text"
                        value={this.state.query} // контрольований input (без цього reset не зробиш)
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={handleChange}
                    />
                </StyledForm>
            </StyledHeader>
        );
    }
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};